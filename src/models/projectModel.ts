import { SceneContent } from "./sceneContent";
export class projectModel {
    name:string;
    lastEdited:Date;
    created:Date;
    sceneContent:any =  new SceneContent();
    constructor(name:string, date:number){
        this.name = name;
        this.created = new Date(date);
        this.lastEdited = this.created;
    }
}