const { getRabbitMQChannel, queueName } = require('./utils');

// 定义处理消息的函数
async function processMessage(message) {
  console.log(`Received message: ${message.content.toString()}`);
}

// 创建连接和信道，并消费消息
async function consumeQueue() {
  try {
    const channel = await getRabbitMQChannel();
    
    // 声明队列，如果队列已存在，则不会创建新的队列
    await channel.assertQueue(queueName, { durable: false }); // 声明队列

    console.log('Waiting for messages. To exit press CTRL+C');

    // 消费消息
    channel.consume(queueName, (message) => {
      if (message !== null) {
        processMessage(message); // 处理消息
        channel.ack(message); // 确认消息已处理
      }
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  consumeQueue,
}
