import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FakeAuthService } from '../fake-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: FakeAuthService) { }

  ngOnInit() {
  }

  onLoadServers(id: number){
    this.router.navigate(
      ['/servers', id, 'edit'],
      {queryParams: {allowEdit:'1'}, fragment: 'loading'});
  }

  onLogin(){
    this.authService.login();
  }

  onLogout(){
    this.authService.logout();
  }

}
