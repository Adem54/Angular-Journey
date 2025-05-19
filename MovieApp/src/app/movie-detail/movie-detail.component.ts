import { Component, Input } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {

  @Input() movie!:Movie;
  // @Input() selectedMovie: Movie; // @Input decoratoru ile parent componentten movie bilgisini aliyoruz
  //selectedMovie disardan gelecek bir deger ondan dolayi da @input decoretoru eklemiz gerekiyor selectedMovie yi parent compnnetten alabilmek icin
  constructor(){
  }
  ngOnInit(): void {
    //console.log("***********",this)
  }

  ngOnChanges() {
    console.log("movie input received:", this.movie);
    //movie input received: {id: 3, name: 'Movie 3'}
  }
    
}
