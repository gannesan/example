import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './components/signup/signup.component'
import{ContentComponent} from './components/content/content.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExperienceComponent } from './components/experience/experience.component';

const routes: Routes = [{path:"signup", component:SignupComponent},
{path:"", component:ContentComponent},
{path:"dashboard", component:DashboardComponent},
{path:"experience", component:ExperienceComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
