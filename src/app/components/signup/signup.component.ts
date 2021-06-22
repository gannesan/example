import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }
  test : Date = new Date();
  focus : any;
  focus1: any;

  ngOnInit(): void {
  }

}
