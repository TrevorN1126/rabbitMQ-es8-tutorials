const amqp = require('amqplib');

(async () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: receive_logs_topic.js <facility>.<severity>');
    process.exit(1);
  }
  const exchange = 'topic_logs';

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange(exchange, 'topic', {
    durable: false
  });

  const q = await channel.assertQueue('', { exclusive: true });

  console.log(' [*] Waiting for logs. To exit press CTRL+C');

  args.forEach(async (key) => {
    await channel.bindQueue(q.queue, exchange, key);
  });

  channel.consume(q.queue, (msg) => {
    console.log(` [x] ${msg.fields.routingKey}: '${msg.content.toString()}'`);
  }, {
    noAck: true
  });
})().catch((err) => {
  console.error(err);
});
