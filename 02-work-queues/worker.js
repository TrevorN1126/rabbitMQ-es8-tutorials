const amqp = require('amqplib');

(async () => {
  const queue = 'task_queue';

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });
  await channel.prefetch(1);

  console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

  channel.consume(queue, (msg) => {
    const secs = msg.content.toString().split('.').length - 1;
    console.log(` [x] Received ${msg.content.toString()}`);
    setTimeout(() => {
      console.log(' [x] Done');
      channel.ack(msg);
    }, secs * 1000);
  }, {
    noAck: false
  });
})().catch((err) => {
  console.error(err);
});
