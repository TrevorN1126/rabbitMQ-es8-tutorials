const amqp = require('amqplib');

(async () => {
  const exchange = 'logs';

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const q = await channel.assertQueue('', { exclusive: true });

  console.log(` [*] Waiting for messages in ${q.queue}. To exit press CTRL+C`);

  await channel.bindQueue(q.queue, exchange, '');

  channel.consume(q.queue, (msg) => {
    if (msg.content) {
      console.log(` [x] ${msg.content.toString()}`);
    }
  }, {
    noAck: true
  });
})().catch((err) => {
  console.error(err);
});
