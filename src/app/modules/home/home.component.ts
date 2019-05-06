import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLog = false;
  currentUser;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    if(this.currentUser) {
      this.isLog = true;
    }
  }
}
