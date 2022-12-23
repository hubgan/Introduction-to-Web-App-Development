import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isVisible: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleVisibility() {
    if (this.isVisible === '') {
      this.isVisible = 'visibile';
    }
    else {
      this.isVisible = '';
    }
  }
}
