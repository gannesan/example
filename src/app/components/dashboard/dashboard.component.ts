import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ProjectService } from 'src/app/project.service';
import { projectModel } from 'src/models/projectModel';
import { SceneContent } from 'src/models/sceneContent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private projectService: ProjectService) { }
  @ViewChild("canvas") canvas?: ElementRef;
  resizeBool = false;
  drawResize = false;
  resizeobj: any;
  hotSpotEnable: boolean = false;
  canvasEl?: HTMLCanvasElement;
  isPropertyScreen: boolean = true;
  imgDrag: any;
  dragBool: boolean = false;
  imag: string = '';
  context?: CanvasRenderingContext2D | null;
  image :string ="";
  currentModel?: projectModel;
  resizedir:string ="";
  ngOnInit(): void {
    this.currentModel = this.projectService.getProject();
  }

  hotSpotDropCLick() {
    this.hotSpotEnable = true;
  }

  regularClick() {
    this.hotSpotEnable = false;
  }

  ngOnChanges(){
    this.currentModel = this.projectService.getProject();
  }
  public ngAfterViewInit() {


    this.canvasEl = this.canvas?.nativeElement;
    (this.canvasEl as HTMLCanvasElement).width = (this.canvasEl as HTMLCanvasElement).offsetWidth;
    (this.canvasEl as HTMLCanvasElement).height = (this.canvasEl as HTMLCanvasElement).offsetHeight;
    this.context = (this.canvasEl as HTMLCanvasElement).getContext('2d');
    (this.context as CanvasRenderingContext2D).lineCap = 'round';
    var imageSrc = document.createElement('img');
    document.body.appendChild(imageSrc);
    imageSrc.setAttribute('style','display:none');
    imageSrc.setAttribute('alt','script div');
    imageSrc.setAttribute("src", "../../assets/igold_logo.png");

    var imgCanvas = document.createElement("canvas"); 
    let imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    imgCanvas.width = imageSrc.width;
    imgCanvas.height = imageSrc.height;

    // Draw image into canvas element
    (imgContext as CanvasRenderingContext2D).drawImage(imageSrc, 0, 0, imageSrc.width, imageSrc.height);
    // Save image as a data URL
    this.image = imgCanvas.toDataURL("image/png");
    document.body.removeChild(imageSrc);

    // window.localStorage.removeItem('app');

    fromEvent((this.canvasEl as HTMLCanvasElement), "mousemove").subscribe((e) => {
      this.drawthis((e as MouseEvent).clientX, (e as MouseEvent).clientY);
    })
    fromEvent((this.canvasEl as HTMLCanvasElement), "mouseup").subscribe(() => {
      this.imgDrag = undefined;
      this.dragBool = false;
      this.resizeBool = false;
      this.imag = '';
    });
    fromEvent((this.canvasEl as HTMLCanvasElement), "mousedown").subscribe(e => this.checkImg((e as MouseEvent).clientX, (e as MouseEvent).clientY));
  
  }
  checkImg(clientX: number, clientY: number) {
    var width = (this.canvasEl as HTMLCanvasElement).offsetLeft;
    var height = (this.canvasEl as HTMLCanvasElement).offsetTop;
    if (this.hotSpotEnable) {
      this.drawResize = true;
      (this.context as CanvasRenderingContext2D).clearRect(0, 0, (this.canvasEl as HTMLCanvasElement).offsetWidth, (this.canvasEl as HTMLCanvasElement).offsetHeight);
      this.imag = (this.currentModel?.sceneContent as SceneContent)?.addContent(clientX - width, clientY - height, 100, 100,this.image);
      this.drawImgs();
      return;
    }
    this.currentModel?.sceneContent?.imageMap.forEach((value: any, key: string) => {
      if (((value.x + width) <= clientX) && ((value.x + width + value.width) >= clientX) &&
        ((value.y + height) <= clientX) && ((value.y + height + value.height) >= clientY)) {
        this.imgDrag = value;
        this.dragBool = true;
        this.resizeBool = false;
        this.imag = key;
        return;
      }
      if (((value.x + width - 5) <= clientX) && ((value.x + width) >= clientX) &&
        ((value.y - 5 + height) <= clientX) && ((value.y + height) >= clientY)) {
        this.imgDrag = value;
        this.resizeBool = true;
        this.imag = key;
        console.log("tl");
        this.resizedir="tl"
        return;
      }
      if (((value.x + value.width + width) <= clientX) && ((value.x + value.width + width +5) >= clientX) &&
        ((value.y - 5 + height) <= clientX) && ((value.y + height) >= clientY)) {
        this.imgDrag = value;
        this.resizeBool = true;
        this.imag = key;
        this.resizedir="tr"
        console.log("tr");
        return;
      }
      if (((value.x + width - 5) <= clientX) && ((value.x + width) >= clientX) &&
        ((value.y + value.height + height) <= clientX) && ((value.y + 5 + value.height + height) >= clientY)) {
        this.imgDrag = value;
        this.resizeBool = true;
        console.log("bl");
        this.resizedir="bl"
        this.imag = key;
        return;
      }
      if (((value.x + value.width + width) <= clientX) && ((value.x + width + value.width + 5) >= clientX) &&
        ((value.y + value.height + height) <= clientX) && ((value.y + 5 + value.height + height) >= clientY)) {
        this.imgDrag = value;
        this.resizeBool = true;
        console.log("bl");
        this.resizedir="bl"
        this.imag = key;
        return;
      }
    });
  }
  drawthis(clientX: number, clientY: number) {
    var x = clientX - (this.canvasEl as HTMLCanvasElement).offsetLeft;
    var y = clientY - (this.canvasEl as HTMLCanvasElement).offsetTop
    if (this.dragBool) {
      this.context?.clearRect(this.imgDrag.x, this.imgDrag.y, this.imgDrag.width, this.imgDrag.height);
      this.imgDrag.x = x;
      this.imgDrag.y = y;
      (this.context as CanvasRenderingContext2D).clearRect(0, 0, (this.canvasEl as HTMLCanvasElement).offsetWidth, (this.canvasEl as HTMLCanvasElement).offsetHeight);
      (this.currentModel?.sceneContent as SceneContent)?.modifyContent(this.imag, x, y, 100, 100,this.imgDrag.src);
      this.drawImgs();
    }
    else if (this.resizeBool) {
      var img: any = (this.currentModel?.sceneContent as SceneContent)?.getContent(this.imag);
      (this.currentModel?.sceneContent as SceneContent)?.modifyContent(this.imag, x, y,
        img.width + (x - img.x), img.height + (y - img.y),img.src);
      this.context?.clearRect(img.x, img.y, img.width, img.height);
      this.drawImgs();
    }
    // this.context?.rect(this.imgDrag.x,this.imgDrag.y,this.imgDrag.width,this.imgDrag.height)
  }
  createScene() {
    this.drawResize = true;
    this.imag = (this.currentModel?.sceneContent as SceneContent)?.addContent(20, 20, 100, 100,this.image);
    this.drawImgs();
  }
  drawImgs(param?:boolean) {
    ((this.currentModel?.sceneContent as SceneContent)?.imageMap).forEach((e, key) => {
      if (this.drawResize && this.imag == key) {
        (this.context as CanvasRenderingContext2D).setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
        (this.context as CanvasRenderingContext2D).beginPath();
        (this.context as CanvasRenderingContext2D).moveTo(e.x, e.y);
        (this.context as CanvasRenderingContext2D).lineTo(e.x + e.width, e.y);
        (this.context as CanvasRenderingContext2D).lineTo(e.x + e.width, e.y + e.height);
        (this.context as CanvasRenderingContext2D).lineTo(e.x, e.y + e.height);
        (this.context as CanvasRenderingContext2D).lineTo(e.x, e.y);
        (this.context as CanvasRenderingContext2D).fillRect(e.x + e.width, e.y - 5, 5, 5);
        (this.context as CanvasRenderingContext2D).fillRect(e.x + e.width, e.y + e.height, 5, 5);
        (this.context as CanvasRenderingContext2D).fillRect(e.x - 5, e.y + e.height, 5, 5);
        (this.context as CanvasRenderingContext2D).fillRect(e.x - 5, e.y - 5, 5, 5);
        (this.context as CanvasRenderingContext2D).stroke();
        this.resizeobj = e;
        this.drawResize = false;
      }
      window.indexedDB.open
      var src = new Image(100,100);
      src.src = e.src;
      if(!this.dragBool){
        setTimeout(()=>(this.context as CanvasRenderingContext2D).drawImage(src, e.x, e.y, e.width, e.height),100);
      }
      else
      (this.context as CanvasRenderingContext2D).drawImage(src, e.x, e.y, e.width, e.height);
    });
  }
  convert(){
    window.localStorage.setItem('app', JSON.stringify(Array.from((this.currentModel?.sceneContent as SceneContent)?.imageMap.entries())));
  }
  loadData(){
    console.log(localStorage.getItem('app'))
    let a = new Map<string,{x:number,y:number,width:number,height:number,src:string}>(JSON.parse(localStorage.getItem('app') as any));
    console.log(a);
    if((this.currentModel?.sceneContent as SceneContent))
    (this.currentModel?.sceneContent as SceneContent).imageMap = a;
    this.drawImgs();
  }
}
