import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isVisible: string = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleVisibility() {
    if (this.isVisible === '') {
      this.isVisible = 'visible';
    }
    else {
      this.isVisible = '';
    }
  }

  signOut() {
    this.authService.signOut();
  }
}
