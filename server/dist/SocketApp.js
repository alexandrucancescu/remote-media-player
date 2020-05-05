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
const SocketIO = require("socket.io");
const SoundboardController_1 = require("./controllers/SoundboardController");
class SocketApp {
    static initControllers() {
        return __awaiter(this, void 0, void 0, function* () {
            const controller_promises = this.controller_classes.map((s_class) => __awaiter(this, void 0, void 0, function* () {
                this.controllers.push(yield new s_class()._init());
            }));
            return Promise.all([controller_promises]);
        });
    }
    static setup(server) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io_server = SocketIO(server);
            yield this.initControllers();
            this.io_server.on("connection", socket => {
                this.controllers.forEach(service => {
                    try {
                        service._connection(socket);
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
            });
            this.io_server.on("disconnect", socket => {
                this.controllers.forEach(service => {
                    try {
                        service.disconnect(socket);
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
            });
        });
    }
}
exports.default = SocketApp;
SocketApp.controller_classes = [
    SoundboardController_1.default
];
SocketApp.controllers = [];
//# sourceMappingURL=SocketApp.js.map