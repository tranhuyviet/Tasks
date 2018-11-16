const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();


http.createServer(function (req, res) {
    res.writeHead(200, {
        "content-type": "text/html; charset=utf-8"
    });
    fs.ReadStream("./task_b.html").pipe(res); //su dung ham nay de doc file html, do vao res va gui cho nguoi dung
    //res.write("<h1>Server da ket noi thanh cong. Day la ket qua tra ve tu server</h1>");
    //res.end();
}).listen(3001);