"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_config_schema_1 = require("node-config-schema");
const path_1 = require("path");
node_config_schema_1.default.create({
    port: node_config_schema_1.TNumber,
    soundboard_dir: node_config_schema_1.TString,
}, path_1.join(__dirname, "../config"));
exports.default = node_config_schema_1.default.instance.parseConfig();
//# sourceMappingURL=Config.js.map