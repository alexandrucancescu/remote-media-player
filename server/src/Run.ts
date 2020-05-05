// import "./App"

import Play from "./util/Play"

new Play("/Users/andu/Music/soundboard_sounds/Momentul Oportun.mp3")
.play().catch(err=>console.error(err)).then(()=>console.error("ok"))