import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../project.service'
import{projectModel} from 'src/models/projectModel'
import { Router } from '@angular/router';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  constructor(private projectService:ProjectService, private router:Router) {
   }
  experience : projectModel[] =[];
  currentProject?: projectModel ;
  ngOnInit(): void {
    this.experience=this.projectService.getProjects();
    this.currentProject = this.experience[0];
  }
  public onProjectClick(item : projectModel){
    this.currentProject = item;
  }
  public dashBoardNavigate(){
    this.projectService.setProjects(this.currentProject);
    this.router.navigateByUrl("/dashboard");
  }
}
