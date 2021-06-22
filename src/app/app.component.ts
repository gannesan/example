import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'igold';
  constructor(public location: Location){}
  public  checkNav() :boolean {
  var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(titlee === 'experience' || titlee === 'dashboard' || titlee === '/paint'){
            return false;
        }
        else {
            return true;
        }
      }
}
