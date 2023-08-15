// 服务器核心文件
const http = require('http');

const serverHandle = require('../app');

// 业务分成
const server = http.createServer(serverHandle);

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`server is runing... PORT: ${PORT}`)
})