import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone:false
})

export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://graph.microsoft.com/v1.0/me').subscribe((profile) => {
      this.profile = profile;
    });
  }
}
