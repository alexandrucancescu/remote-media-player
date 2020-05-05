import {Socket,Namespace} from "socket.io"

export function on(event:String){
	return function(target:any, propertyKey: string, descriptor: PropertyDescriptor){
		if(!(target instanceof SocketController)){
			throw new Error(`Invalid use of @on(${event}) decorator! Class ${target.constructor.name} should extend class SocketController!`);
		}
		const constructor=<any>target.constructor;
		if(!constructor._event_handlers){
			constructor._event_handlers=<IEventHandler[]>[];
		}

		constructor._event_handlers.push(<IEventHandler>{
			event,
			handler:descriptor.value,
		});
		return descriptor;
	}
}

interface IEventHandler{
	event:string;
	handler:Function;
}

export default abstract class SocketController{
	// noinspection JSMismatchedCollectionQueryUpdate
	private static _event_handlers:IEventHandler[]=[];
	protected namespace:Namespace;

	constructor(namespace: Namespace) {
		this.namespace=namespace;
	}

	public _connection(socket:Socket){
		for(let event_handler of SocketController._event_handlers){
			socket.on(event_handler.event,event_handler.handler.bind(this,socket));
		}
		this.connection(socket);
	}

	public async _init():Promise<this>{
		await this.init();
		return this;
	}

	protected abstract init():Promise<any>|any;
	abstract connection(socket: Socket);
	abstract disconnect(socket: Socket);
}