"use strict";
// import "./App"
Object.defineProperty(exports, "__esModule", { value: true });
const PlayQueue_1 = require("./util/PlayQueue");
const Play_1 = require("./util/Play");
let queue = new PlayQueue_1.default();
setTimeout(() => {
    queue.queuePlay(new Play_1.default("/Users/andu/Music/soundboard_sounds/Momentul Oportun.mp3"))
        .then(_ => console.log("timeout"));
}, 300);
queue.queuePlay(new Play_1.default("/Users/andu/Music/soundboard_sounds/Momentul Oportun.mp3"))
    .then(_ => console.log("main"));
// new Play("/Users/andu/Music/soundboard_sounds/Momentul Oportun.mp3")
// .play().catch(err=>console.error(err)).then(()=>console.error("ok"))
//# sourceMappingURL=Run.js.map