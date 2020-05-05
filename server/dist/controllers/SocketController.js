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
function on(event) {
    return function (target, propertyKey, descriptor) {
        if (!(target instanceof SocketController)) {
            throw new Error(`Invalid use of @on(${event}) decorator! Class ${target.constructor.name} should extend class SocketController!`);
        }
        const constructor = target.constructor;
        if (!constructor._event_handlers) {
            constructor._event_handlers = [];
        }
        constructor._event_handlers.push({
            event,
            handler: descriptor.value,
        });
        return descriptor;
    };
}
exports.on = on;
class SocketController {
    constructor(namespace) {
        this.namespace = namespace;
    }
    _connection(socket) {
        for (let event_handler of SocketController._event_handlers) {
            socket.on(event_handler.event, event_handler.handler.bind(this, socket));
        }
        this.connection(socket);
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return this;
        });
    }
}
exports.default = SocketController;
// noinspection JSMismatchedCollectionQueryUpdate
SocketController._event_handlers = [];
//# sourceMappingURL=SocketController.js.map