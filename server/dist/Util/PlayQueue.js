"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class PlayQueue {
    constructor() {
        this.queue = [];
    }
    queuePlay(play) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.queue.push({
                    playInstance: play,
                    promise: { resolve, reject }
                });
                if (!this.isLoopRunning) {
                    this.loopQueue();
                }
            });
        });
    }
    loopQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoopRunning = true;
            while (this.queue.length > 0) {
                const currentPlay = this.queue.shift();
                try {
                    yield currentPlay.playInstance.play();
                    currentPlay.promise.resolve();
                }
                catch (err) {
                    currentPlay.promise.reject(err);
                }
            }
        });
    }
}
exports.default = PlayQueue;
//# sourceMappingURL=PlayQueue.js.map