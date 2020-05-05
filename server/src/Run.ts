// import "./App"

import PlayQueue from "./util/PlayQueue";
import Play from "./util/Play"

let queue=new PlayQueue();

setTimeout(()=>{
	queue.queuePlay(new Play("/Users/andu/Music/soundboard_sounds/Momentul Oportun.mp3"))
		.then(_=>console.log("timeout"))
},300);

queue.queuePlay(new Play("/Users/andu/Music/soundboard_sounds/Momentul Oportun.mp3"))
	.then(_=>console.log("main"))

// new Play("/Users/andu/Music/soundboard_sounds/Momentul Oportun.mp3")
// .play().catch(err=>console.error(err)).then(()=>console.error("ok"))

