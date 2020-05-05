import * as express from "express";
import config from "./Config"
import {createServer} from "http";
import SocketApp from "./SocketApp";
import {join} from "path";

const express_app=express();

express_app.use(express.static(join(__dirname,"../static")));

const http_server=createServer(express_app).listen(config.port,()=>{
	console.log("Listening on port",config.port);
})

SocketApp.setup(http_server).catch(e=>console.error(e));