const amqp = require('amqplib');

(async () => {
  const exchange = 'direct_logs';
  const args = process.argv.slice(2);
  const msg = args.slice(1).join(' ') || 'Hello World!';
  const severity = (args.length > 0) ? args[0] : 'info';

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange(exchange, 'direct', {
    durable: false
  });

  await channel.publish(exchange, severity, Buffer.from(msg));

  console.log(`[x] Sent ${severity}: '${msg}'`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
})().catch((err) => {
  console.error(err);
});
