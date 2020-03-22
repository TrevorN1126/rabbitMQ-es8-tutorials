const amqp = require('amqplib');

(async () => {
  const exchange = 'logs';
  const msg = process.argv.slice(2).join(' ') || 'Hello World!';

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange(exchange, 'fanout', {
    durable: false
  });

  await channel.publish(exchange, '', Buffer.from(msg));

  console.log(' [x] Sent %s', msg);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
})().catch((err) => {
  console.error(err);
});
