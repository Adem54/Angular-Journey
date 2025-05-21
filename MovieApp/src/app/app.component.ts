import { Component } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MovieApp';

  users:any;
  constructor(private movieService:MovieService){}

  getUsers():void
  {
    this.movieService.getUsers().subscribe(users=>{
      console.log("users: ", users);
      this.users=users;
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers();
  }
}
