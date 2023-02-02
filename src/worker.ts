import wait from './lib/wait';

import * as amqp from 'amqplib';

// @ts-ignore
// new Promise((r) => {
//   console.log('Worker running...');
//   console.log('@todo: This worker is supposed to consume messages from a rabbitMQ broker and respond to them via an RPC reply');
// })
//   .then(console.dir)
//   .catch(console.error);

// This is the TIME CONSUMING operation that we have to offload.
const transformation = async (payload: string): Promise<string> => {
  await wait(Math.floor(Math.random() * 2000)); // wait : 0s -> 2s.
  return payload.toUpperCase();
};

// Close omited here : Automaticaly disconnection on (SIGINT) : Verified.
const myWorker = async () => {
  console.log('Worker running...');

  const exchange = 'input.rpc';
  const routingKey = 'Mjaonary';
  const queue = 'my.queue.Mjaonary';

  const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
  const channel = await connection.createChannel();

  try {
    // Exchange and Queue must exist otherwise an exception will arise.
    await channel.assertExchange(exchange, 'direct', { durable: false });
    await channel.assertQueue(queue, { exclusive: true });
    await channel.bindQueue(queue, exchange, routingKey); // Binding Here.

    // We are telling the broker here that we can do just only one task.
    await channel.prefetch(1);

    console.log(' [x] Awaiting RPC requests... To exit press CTRL+C');

    // STEP 1 : We are waiting for message comming from our bounded queue.
    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        // STEP 2 : After receiving a message, we process it and return it back.
        const message = msg.content.toString();
        console.log(' [.] toUppercase(%s)...', message);

        const result = await transformation(message);
        console.log(' [x] toUppercase(%s) : %s \n', message, result);

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(result), {
          correlationId: msg.properties.correlationId,
        });

        channel.ack(msg); // Tell RabbitMQ Broker that everything went well.
      }
    });
  } catch (error) {
    console.error('[src][worker.ts][Error]', error);
  }
};

myWorker();
