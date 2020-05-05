import config from "../Config"
import {EventEmitter} from "events"
import {readdir,watch} from "fs-extra"
import {join} from "path"

interface ISoundboardSound{
	file:string,
	name:string,
}

export default class SoundboardService extends EventEmitter{
	private sounds:ISoundboardSound[];


	public async init(){
		await this.loadSounds()
		watch(config.soundboard_dir,{persistent:false},this.filesChanged.bind(this));
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

	public hasSound(sound_name:string):boolean{
		return this.sounds.findIndex(sound=>sound.name===sound_name)>-1;
	}

	private async filesChanged(){
		await this.loadSounds();
	}

	public get Sounds():ISoundboardSound[]{
		return this.sounds;
	}
}