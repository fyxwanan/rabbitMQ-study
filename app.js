const querystring = require('querystring');
const dayjs = require('dayjs')
const { sendToQueue } = require('./src/rabbitMQ/producer');
const { consumeQueue } = require('./src/rabbitMQ/customer');
const { getRabbitMQCount, queueName } = require('./src/rabbitMQ/utils');

const serverHandle = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const method = req.method;

    // 生产消息
    if (method === 'GET' && req.url === '/create') {
      await sendToQueue();
      const count = await getRabbitMQCount(queueName);
      console.log(`[${dayjs().format('YYYY-MM-DD hh:mm:ss')}]：生产消息...`)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      const message = {
        code: 200,
        msg: '生产消息完成',
        count: count,
      };
      res.write(JSON.stringify(message));
      res.end();
      return;
    }

    // 消费消息
    if (method === 'GET' && req.url === '/customer') {
      await consumeQueue()
      const count = await getRabbitMQCount(queueName);
      console.log(`[${dayjs().format('YYYY-MM-DD hh:mm:ss')}]：消费消息...`)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      const message = {
        code: 200,
        msg: '消费消息完成',
        count: count,
      };
      res.write(JSON.stringify(message));
      res.end();
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found! Please call xiaoreya');
    res.end();
}

module.exports = serverHandle;