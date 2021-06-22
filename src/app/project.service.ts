import { Injectable } from '@angular/core';
import { projectModel } from 'src/models/projectModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }
  properties:boolean = true;
  project?:projectModel;
  getProjects(): projectModel[] {
    let projects: projectModel[]=[];
    var characters       = ['ABC','DEF','GHI','JKL','MNO','PQR','STU','VWX','YZa'];
    for(let i: number = 0 ; i<characters.length;i++) {
      let pro:projectModel = new projectModel(characters[i],Date.now())
      projects.push(pro);
    }
    return projects;
  }
  setProjects(project:projectModel | undefined){
    this.project = project;
  }
  getProject(){
    return this.project;
  }
}
