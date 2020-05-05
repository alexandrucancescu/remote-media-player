import config from "../Config"
import {EventEmitter} from "events"
import {readdir,watch} from "fs-extra"
import {join} from "path"
import Play from "../util/Play";
import PlayQueue from "../util/PlayQueue";

export interface ISoundboardSound{
	file:string,
	name:string,
}

export default class SoundboardService extends EventEmitter{
	private sounds:ISoundboardSound[];
	private playQueue:PlayQueue=new PlayQueue();


	public async init(){
		await this.loadSounds()
		watch(config.soundboard_dir,{persistent:false},this.filesChanged.bind(this));
	}

	public hasSound(sound_name:string):boolean{
		return this.sounds.findIndex(sound=>sound.name===sound_name)>-1;
	}

	public async playSound(name:string){
		const file=this.sounds.find(sound=>sound.name===name)?.file;
		if(!file){
			throw new Error(`Could not find sound "${name}"`);
		}
		try{
			await this.playQueue.queuePlay(new Play(file));
		}catch (e) {
			console.log(e);
			throw new Error(`Could not play sound "${name}"`);
		}
	}

	private async filesChanged(){
		await this.loadSounds();
		this.emit("sounds-changed");
	}

	private async loadSounds(){
		const files=await readdir(config.soundboard_dir);

		this.sounds=files.map(file=>{
			return {
				file:join(config.soundboard_dir,file),
				name: file.replace(/(\.(mp3|wav|ogg|aac))/,"")
			}
		})

		console.log(this.sounds);
	}

	public get soundNames():string[]{
		return this.sounds.map(sound=>sound.name);
	}
}