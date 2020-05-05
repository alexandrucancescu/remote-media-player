
export type ResponseCallback=(resp:Response)=>void;

export interface Response{
	ok:boolean;
	err?:string;
	payload?:any;
}