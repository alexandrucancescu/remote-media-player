import Play from "./Play";

interface PromiseCallbacks<T>{
	resolve:(t:T)=>void;
	reject:(err:Error|any)=>void;
}

interface PlayQueueEntry{
	playInstance:Play;
	promise:PromiseCallbacks<void>;
}

export default class PlayQueue{
	queue:PlayQueueEntry[]=[];
	isLoopRunning:boolean;

	public async queuePlay(play:Play):Promise<void>{
		return new Promise<void>((resolve,reject)=>{
			this.queue.push({
				playInstance:play,
				promise:{resolve,reject}
			});
			if(!this.isLoopRunning){
				this.loopQueue();
			}
		})
	}

	private async loopQueue(){
		this.isLoopRunning=true;
		while(this.queue.length>0){
			const currentPlay=this.queue.shift();
			try{
				await currentPlay.playInstance.play();
				currentPlay.promise.resolve();
			}catch (err) {
				currentPlay.promise.reject(err);
			}
		}
	}


}