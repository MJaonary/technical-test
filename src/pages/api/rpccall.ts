import type { NextApiRequest, NextApiResponse } from 'next';

import * as amqp from 'amqplib';

type Data = {
  result: string;
};

// Utility function that help us to generate random uuid string.
function generateUuid(): string {
  return Math.random().toString() + Math.random().toString() + Math.random().toString();
}

/**
 * Process a payload
 *
 * @todo:
 * - send the payload into rabbitmq, through `input.rpc` exchange
 * - make sure to send it with a binding key of `<your-name>`
 * - configure your publisher to wait for a response from the consumer
 * - all that flow shoudl be handled with a async process
 *
 * @param payload
 * @returns
 */
const processPayload = async (payload: string): Promise<string> => {
  let response = '';

  const exchange = 'input.rpc';
  const routingKey = 'Mjaonary';

  const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
  const channel = await connection.createChannel();

  try {
    // STEP 1 : Request creation i.e reply_to (queue) & correlation_id.
    // We will let the broker choose a queue name for our use => queue.
    const queue = await channel.assertQueue('', { exclusive: true });
    const correlation_id = generateUuid();

    // STEP 2 : Pass the created Message with reply_to and correlation_id
    // to the exchange. it will transfer it to my.queue.Mjaonary (bound).
    // Exchange "input.rpc" must exist otherwise an exception will arise.
    await channel.assertExchange(exchange, 'direct', { durable: false });
    channel.publish(exchange, routingKey, Buffer.from(payload), {
      replyTo: queue.queue,
      correlationId: correlation_id,
    });

    console.log(' [.] Requesting toUppercase from worker.ts : %s.', payload);

    // STEP 3 : Wait for the response to arrive, after that we can close.
    response = await new Promise((resolve, reject) => {
      channel.consume(queue.queue, (msg) => {
        if (msg !== null) {
          if (msg?.properties.correlationId === correlation_id) {
            response = msg.content.toString();
            console.log(' [x] Got %s \n', response);
            resolve(response);
          }
        }
      });
    });
  } catch (error) {
    response = ''; // Default return value set to '' if it run into an error.
    console.error('[rpccall][processPayload][Error]', error); // An Error Occured.

    // Closing Function this way helps preventing leaks in the broker...
  } finally {
    await new Promise((resolve) => {
      setTimeout(async () => {
        await channel.close();
        await connection.close();
        resolve(true);
      }, 500);
    });
  }

  return response;
};

// Payload can be customized with a GET ?param=string or a POST -d { payload: string }.
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  let payload: string = 'hello wau i/o';

  if (req.method === 'GET' && req.query.param) {
    payload = req.query.param as string;
  } else if (req.method === 'POST' && req.body.payload) {
    payload = req.body.payload;
  }

  const result = await processPayload(payload); // We should not wait : Testing only.

  // res.status(200).json({ result: '@todo: This result should be something responded by ./src/worker.ts via RPC flow over a rabbitMQ broker' });
  res.status(200).json({ result: result });
}
