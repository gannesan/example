export class SceneContent{
public  imageMap= new Map<string,{x:number,y:number,width:number,height:number,src:string}>();
public removeContent(name:string){
this.imageMap.delete(name);
}
public modifyContent(name:string,x:number,y:number,width:number,height:number,src:string){
    this.imageMap.set(name,{x,y,width,height,src});
}
public addContent(x:number,y:number,width:number,height:number,src:string){
    var key = "IMAGE" + this.imageMap.size;
    this.imageMap.set(key,{x,y,width,height,src});
    return key;
}
public getContent(name:string){
    return this.imageMap.get(name);
}
}