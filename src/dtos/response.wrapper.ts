import {Response} from "express"
export class ResponseWrapper {
    constructor(private res: Response) {
    }

    send(status:number, data){
        this.res.send({
            status,
            body: data
        })
    }
}