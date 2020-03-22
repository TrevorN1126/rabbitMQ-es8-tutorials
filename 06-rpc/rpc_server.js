const amqp = require('amqplib');

function fibonacci(n) {
  if (n === 0 || n === 1) { return n; }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

(async () => {
  const queue = 'rpc_queue';

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, {
    durable: false
  });
  await channel.prefetch(1);

  console.log(' [x] Awaiting RPC requests');

  channel.consume(queue, async (msg) => {
    const n = parseInt(msg.content.toString(), 10);

    console.log(` [.] fib(${n})`);

    const r = fibonacci(n);

    await channel.sendToQueue(msg.properties.replyTo,
      Buffer.from(r.toString()), {
        correlationId: msg.properties.correlationId
      });

    await channel.ack(msg);
  });
})().catch((err) => {
  console.error(err);
});
