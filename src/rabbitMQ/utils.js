const amqp = require('amqplib');

// RabbitMQ服务器连接信息
const rabbitMQUrl = 'amqp://localhost'; // 或者根据你的配置修改为正确的连接信息

const queueName = 'xiaoreya-queue'; // 队列名称，与发送消息的队列一致

async function getRabbitMQConnection() {
  const connection = await amqp.connect(rabbitMQUrl);
  return connection;
}

async function getRabbitMQChannel() {
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();
  return channel;
}


async function getRabbitMQCount(queueName) {
  const channel = await getRabbitMQChannel();
  const queue = await channel.checkQueue(queueName);
  return queue.messageCount;
}

module.exports = {
  getRabbitMQChannel,
  getRabbitMQCount,
  getRabbitMQConnection,
  queueName,
  rabbitMQUrl,
}