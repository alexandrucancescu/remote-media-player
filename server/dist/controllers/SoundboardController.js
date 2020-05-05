"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const SocketController_1 = require("./SocketController");
const SoundboardService_1 = require("../services/SoundboardService");
class SoundboardController extends SocketController_1.default {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.soundBoardService = new SoundboardService_1.default();
            yield this.soundBoardService.init();
            this.soundBoardService.on("sounds-changed", this.onSoundsChanged.bind(this));
        });
    }
    connection(socket) { }
    disconnect(socket) { }
    onSoundsChanged(sounds) {
        this.namespace.emit("sounds-changed", sounds);
    }
    playSound(socket, sound, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("play_sound", sound);
            if (!this.soundBoardService.hasSound(sound)) {
                return response({ ok: false, err: "Sound does not exist" });
            }
            try {
                yield this.soundBoardService.playSound(sound);
                response({ ok: true });
            }
            catch (err) {
                response({ ok: false, err });
            }
        });
    }
    getSounds(socket, ignored_payload, response) {
        return __awaiter(this, void 0, void 0, function* () {
            response({
                ok: true,
                payload: this.soundBoardService.soundNames
            });
        });
    }
}
__decorate([
    SocketController_1.on("soundboard/play_sound"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Function]),
    __metadata("design:returntype", Promise)
], SoundboardController.prototype, "playSound", null);
__decorate([
    SocketController_1.on("soundboard/play_sound"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], SoundboardController.prototype, "getSounds", null);
exports.default = SoundboardController;
//# sourceMappingURL=SoundboardController.js.map