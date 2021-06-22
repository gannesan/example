import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  responsive:boolean = false;
  menus :string[] = ["News","Contact","About","Home"];
  constructor() { }
  public changeClass(){
    this.responsive = !this.responsive;
  }
  ngOnInit(): void {
  }
}
