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
const Play_1 = require("../util/Play");
const PlayQueue_1 = require("../util/PlayQueue");
class SoundboardService extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.playQueue = new PlayQueue_1.default();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSounds();
            fs_extra_1.watch(Config_1.default.soundboard_dir, { persistent: false }, this.filesChanged.bind(this));
        });
    }
    hasSound(sound_name) {
        return this.sounds.findIndex(sound => sound.name === sound_name) > -1;
    }
    playSound(name) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const file = (_a = this.sounds.find(sound => sound.name === name)) === null || _a === void 0 ? void 0 : _a.file;
            if (!file) {
                throw new Error(`Could not find sound "${name}"`);
            }
            try {
                yield this.playQueue.queuePlay(new Play_1.default(file));
            }
            catch (e) {
                console.log(e);
                throw new Error(`Could not play sound "${name}"`);
            }
        });
    }
    filesChanged() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSounds();
            this.emit("sounds-changed");
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
    get soundNames() {
        return this.sounds.map(sound => sound.name);
    }
}
exports.default = SoundboardService;
//# sourceMappingURL=SoundboardService.js.map