"use strict";
// import "./App"
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("./util/Play");
new Play_1.default("/Users/andu/Music/soundboard_sounds/Momentul Oportun.mp3")
    .play().catch(err => console.error(err)).then(() => console.error("ok"));
//# sourceMappingURL=Run.js.map