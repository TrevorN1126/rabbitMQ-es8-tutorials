const amqp = require('amqplib');

function generateUuid() {
  return Math.random().toString()
         + Math.random().toString()
         + Math.random().toString();
}

(async () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: rpc_client.js num');
    process.exit(1);
  }
  const correlationId = generateUuid();
  const num = parseInt(args[0], 10);

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const q = await channel.assertQueue('', { exclusive: true });

  console.log(` [x] Requesting fib(${num})`);

  channel.consume(q.queue, (msg) => {
    if (msg.properties.correlationId === correlationId) {
      console.log(` [.] Got ${msg.content.toString()}`);
      setTimeout(() => {
        connection.close();
        process.exit(0);
      }, 500);
    }
  }, {
    noAck: true
  });

  await channel.sendToQueue('rpc_queue',
    Buffer.from(num.toString()), {
      correlationId,
      replyTo: q.queue
    });
})().catch((err) => {
  console.error(err);
});
