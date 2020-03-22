# Node.js code for RabbitMQ tutorials

Here you can find JavaScript (Node) code examples from [RabbitMQ
tutorials](https://www.rabbitmq.com/getstarted.html) using Async/ Await patterns.

All examples are wrapped in an IIAFE and use await instead of callbacks.

To successfully use the examples you will need a running RabbitMQ server.

## Requirements

### Node.js

You need [Node.js](https://nodejs.org/en/download/) to run these tutorials.

### Client Library

[amqp.node](https://github.com/squaremo/amqp.node) is listed as a local dependency in package.json

Run:
```sh
yarn
```
to install dependency.

## Code

### [Tutorial one: "Hello World!"](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html):

```sh
node 01-hello-world/receive.js
```
or
```sh
yarn 01-receive
```
and from a separate terminal
```sh
node 01-hello-world/send.js
```
or
```sh
yarn 01-send
```

### [Tutorial two: Work Queues](https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html):

```sh
node 02-work-queues/worker.js
```
or
```sh
yarn 02-worker
```
and from a separate terminal
```sh
node 02-work-queues/new_task.js "A very hard task which takes two seconds.."
```
or
```sh
yarn 02-new-task "Any string you type with dots after.."
```

### [Tutorial three: Publish/Subscribe](https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html)

```sh
node 03-pub-sub/receive_logs.js
```
or
```sh
yarn 03-receive
```
and from a separate terminal
```sh
node 03-pub-sub/emit_log.js "info: This is the log message"
```
or
```sh
yarn 03-emit "info: This is the log message"
```

#### Pipe to log file:
Windows PowerShell:
```sh
node 03-pub-sub/receive_logs.js | Out-File -FilePath 03-pub-sub/logs_from_rabbit.log
```

Linux:
```sh
node ./receive_logs.js > ./logs_from_rabbit.log
```

### [Tutorial four: Routing](https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html):

```sh
node 04-routing/receive_logs_direct.js info
```
or
```sh
yarn 04-receive info
```
and from a separate terminal
```sh
node 04-routing/emit_log_direct.js info "The message"
```
or
```sh
yarn 04-emit info "The Message"
```

### [Tutorial five: Topics](https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html):

```sh
node 05-topics/receive_logs_topic.js "*.rabbit"
```
or
```sh
yarn 05-receive "*.rabbit"
```
and from a separate terminal
```sh
node 05-topics/emit_log_topic.js red.rabbit Hello
```
or
```sh
yarn 05-emit red.rabbit Hello
```

### [Tutorial six: RPC](https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html):

```sh
node 06-rpc/rpc_server.js
```
or
```sh
yarn 06-rpc_server
```
and from a separate terminal
```sh
node 06-rpc/rpc_client.js 30
```
or
```sh
yarn 06-rpc_server 30
```
