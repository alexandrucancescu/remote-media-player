"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Config_1 = require("./Config");
const http_1 = require("http");
const SocketApp_1 = require("./SocketApp");
const path_1 = require("path");
const express_app = express();
express_app.use(express.static(path_1.join(__dirname, "../static")));
const http_server = http_1.createServer(express_app).listen(Config_1.default.port, () => {
    console.log("Listening on port", Config_1.default.port);
});
SocketApp_1.default.setup(http_server).catch(e => console.error(e));
//# sourceMappingURL=App.js.map