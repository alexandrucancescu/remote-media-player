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
const Config_1 = require("../Config");
const events_1 = require("events");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
class SoundboardService extends events_1.EventEmitter {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSounds();
            fs_extra_1.watch(Config_1.default.soundboard_dir, { persistent: false }, this.filesChanged.bind(this));
        });
    }
    loadSounds() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fs_extra_1.readdir(Config_1.default.soundboard_dir);
            this.sounds = files.map(file => {
                return {
                    file: path_1.join(Config_1.default.soundboard_dir, file),
                    name: file.replace(/(\.(mp3|wav|ogg|aac))/, "")
                };
            });
            console.log(this.sounds);
        });
    }
    hasSound(sound_name) {
        return this.sounds.findIndex(sound => sound.name === sound_name) > -1;
    }
    filesChanged() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSounds();
        });
    }
    get Sounds() {
        return this.sounds;
    }
}
exports.default = SoundboardService;
//# sourceMappingURL=SoundboardService.js.map