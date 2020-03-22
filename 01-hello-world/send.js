const amqp = require('amqplib');

(async () => {
  const queue = 'hello';
  const msg = 'Hello World!';

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, {
    durable: false
  });

  await channel.sendToQueue(queue, Buffer.from(msg));
  console.log(` [x] Sent ${msg}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
})().catch((err) => {
  console.error(err);
});
