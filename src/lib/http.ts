interface FetchOptions extends RequestInit {
  // number of retries before returning the error
  retries?: number;

  // timeout in milliseconds to not exceed to receive a response from server
  timeout?: number;
}

/**
 * Execute fetch with additional options, inlcuding retries and timeout
 *
 * @param url: URL to call
 * @param o FetchOptions: options to pass to fetch, including retries and timeout
 *
 * @todo:
 * - implement retries flow: when the request fails, the retry flow is executed.
 *    When attempts are exhausted, the entire process should result into failure
 *    by keeping the original error
 * - timeout flow: when the response is not received within the timeout,
 *    the request is aborted, and the retry flow is executed
 *
 * You can find an example of usage at `src/app/fetch/pages.tsx`
 * It makes an API call to /api/mayfail, which may fail over calls and duration varies from 0 to 2 seconds
 *
 * So for better testing, you can change the `retries` and `timeout` values to have a value under 2 seconds
 *
 * @param url
 * @param o
 * @returns
 */
export default async function fetchEnhanced(url: string, o: FetchOptions): Promise<Response> {
  const { retries = 0, timeout = 0, ...options } = o || {};
  console.log('additional options', { retries, timeout });

  let attempts: number = 1;
  let controller: AbortController | null;

  const fetchWithRetries = async (): Promise<Response> => {
    console.log(`Number of left retries : ${retries - attempts}`);
    attempts++;

    try {
      controller = new AbortController();

      // Timeout flow: when the response is not received within the timeout, the request is aborted.
      setTimeout(() => {
        controller?.abort();
        controller = null;
      }, timeout);

      const response = await fetch(url, { ...options, signal: controller?.signal });

      if (response.ok) {
        return response;
      }

      // When attempts are exhausted, the entire process should result into failure
      if (attempts > retries) {
        return response; // by keeping the original error (already a faillure)
      }

      // When the request fails, the retry flow is executed
      return fetchWithRetries();
    } catch (error: any) {
      // When attempts are exhausted, the entire process should result into failure.
      if (attempts > retries) {
        if (error.name === 'AbortError') {
          return new Response('Request timeout', { status: 408, statusText: 'The user aborted a request' });
        }

        return new Response('Internal Error', { status: 500, statusText: `Internal Error: ${error}` });
      }

      // When the request fails, the retry flow is executed
      return fetchWithRetries();
    }
  };

  return fetchWithRetries();
}
