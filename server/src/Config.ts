import TConfig, {TNumber, TString} from "node-config-schema"
import {join} from "path"

TConfig.create({
	port:TNumber,
	soundboard_dir:TString,
},join(__dirname,"../config"))

export default <ConfigType>TConfig.instance.parseConfig();
type ConfigType={
	port: number,
	soundboard_dir: string,
};