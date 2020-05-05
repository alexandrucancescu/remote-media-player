import {Server as HttpServer} from "http";
import * as SocketIO from "socket.io"
import SoundboardController from "./controllers/SoundboardController";
import ISocketController from "./controllers/SocketController";
import SocketController from "./controllers/SocketController";

export default class SocketApp{
	public static controller_classes:(new()=>ISocketController)[]=[
		SoundboardController
	]
	public static controllers:ISocketController[]=[];

	private static io_server:SocketIO.Server;

	private static async initControllers(){
		const controller_promises:Promise<void>[]=this.controller_classes.map(async s_class=>{
			this.controllers.push(await new s_class()._init());
		})
		return Promise.all([controller_promises]);
	}

	public static async setup(server:HttpServer){
		this.io_server=SocketIO(server);

		await this.initControllers();

		this.io_server.on("connection",socket=>{
			this.controllers.forEach(service=>{
				try{
					service._connection(socket);
				}catch (e) {
					console.error(e);
				}
			})
		});

		this.io_server.on("disconnect",socket=>{
			this.controllers.forEach(service=>{
				try{
					service.disconnect(socket);
				}catch (e) {
					console.error(e);
				}
			})
		})
	}
}