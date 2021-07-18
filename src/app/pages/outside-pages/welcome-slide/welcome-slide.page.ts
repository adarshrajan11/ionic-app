import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-slide',
  templateUrl: './welcome-slide.page.html',
  styleUrls: ['./welcome-slide.page.scss'],
})
export class WelcomeSlidePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor() {}

  ngOnInit() {
  }

}
