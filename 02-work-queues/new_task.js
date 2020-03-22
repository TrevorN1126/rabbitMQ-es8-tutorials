const amqp = require('amqplib');

(async () => {
  const queue = 'task_queue';
  const msg = process.argv.slice(2).join(' ') || 'Hello World!';

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });
  await channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });

  console.log(`[X] Sent ${msg}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
})().catch((err) => {
  console.error(err);
});
