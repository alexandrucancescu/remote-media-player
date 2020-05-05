import {Socket} from "socket.io"
import SocketController,{on} from "./SocketController";
import SoundboardService, {ISoundboardSound} from "../services/SoundboardService";
import {ResponseCallback} from "../services/types/Response";


export default class SoundboardController extends SocketController{
	private soundBoardService:SoundboardService;

	public async init(){
		this.soundBoardService=new SoundboardService();
		await this.soundBoardService.init();
		this.soundBoardService.on("sounds-changed",this.onSoundsChanged.bind(this));
	}

	public connection(socket: Socket) {}

	public disconnect(socket: Socket) {}

	private onSoundsChanged(sounds:ISoundboardSound){
		this.namespace.emit("sounds-changed",sounds);
	}

	@on("soundboard/play_sound")
	public async playSound(socket:Socket,sound:string,response:ResponseCallback){
		console.log("play_sound",sound);
		if(!this.soundBoardService.hasSound(sound)){
			return response({ok:false,err:"Sound does not exist"});
		}
		try{
			await this.soundBoardService.playSound(sound);
			response({ok:true});
		}catch (err) {
			response({ok:false,err});
		}
	}

	@on("soundboard/play_sound")
	public async getSounds(socket:Socket,ignored_payload:any,response:ResponseCallback){
		response({
			ok:true,
			payload:this.soundBoardService.soundNames
		});
	}



}