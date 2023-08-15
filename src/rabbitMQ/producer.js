const { getRabbitMQChannel, queueName } = require('./utils');

// 定义要发送的消息
const message = 'Hello, RabbitMQ!';

// RabbitMQ服务器连接信息
const rabbitMQUrl = 'amqp://localhost'; // 或者根据你的配置修改为正确的连接信息

// 创建连接和信道，并发送消息
async function sendToQueue() {
  try {
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await getRabbitMQChannel();
    await channel.assertQueue(queueName, { durable: false }); // 声明队列

    channel.sendToQueue(queueName, Buffer.from(message)); // 发送消息

    console.log(`[x] Sent '${message}' to ${queueName}`);

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500); // 等待一段时间后关闭连接
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  sendToQueue
}
