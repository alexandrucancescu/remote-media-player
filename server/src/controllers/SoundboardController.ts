import {Socket} from "socket.io"
import SocketController,{on} from "./SocketController";
import SoundboardService from "../services/SoundboardService";


export default class SoundboardController extends SocketController{
	private soundBoardService:SoundboardService;

	public async init(){
		this.soundBoardService=new SoundboardService();
		await this.soundBoardService.init();
	}

	public connection(socket: Socket) {}

	public disconnect(socket: Socket) {}

	@on("play_sound")
	public playSound(socket:Socket,sound:string){
		console.log("play_sound",sound);
	}



}