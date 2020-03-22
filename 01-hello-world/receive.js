const amqp = require('amqplib');

(async () => {
  const queue = 'hello';

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, {
    durable: false
  });

  console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

  channel.consume(queue, (msg) => {
    console.log(` [x] Received ${msg.content.toString()}`);
  }, {
    noAck: true
  });
})().catch((err) => {
  console.error(err);
});
