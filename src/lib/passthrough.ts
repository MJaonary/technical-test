import { createReadStream } from 'fs';
import { ServerResponse } from 'http';
import stream from 'stream';

export default function passthrough(filepath: string, res: ServerResponse): ServerResponse {
  // @todo:
  // 1. implement this function, use `PassThrough` stream to pipe the file content to the response explain what `PassThrough` stream is and why it is used here, could you tell another way to do this?
  // 2. add headers:
  //   - Cache-Control: max-age=3600, public
  //   - X-Metadata: technical-test
  // to see result, check `http://localhost:3000/api/storages/working.json`

  res.setHeader('Cache-Control', 'max-age=3600, public');
  res.setHeader('X-Metadata', 'technical-test');

  // The PassThrough stream is a simple implementation of the Transform stream in Node.js.
  // It is readable and writable, but unlike Transform that can modify the read and write,
  // PassThrough simply pass data without modifications. It can help writing code that is
  // easy to understand and maintain when we use it as an intermediate step, for example :
  // When we have to inspect or log data, or when we need to stop, pause or resume a flow.
  const pass = new stream.PassThrough();

  return createReadStream(filepath).pipe(pass).pipe(res);

  // Of course we can just pipe data directly, then the quality of code will be different.
  // return createReadStream(filepath).pipe(res);

  // return res.end(`// @todo: implement this function, use \`PassThrough\` stream to show content of ${filepath}, then set additional headers`);
}
