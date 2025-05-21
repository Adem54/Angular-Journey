import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService
 {
   createDb(){
    const movies =[
  { id: 1, name: 'The Great Escape', description: 'An action-packed prison break story.', imageUrl: '1.jpeg' },
  { id: 2, name: 'Love in Paris', description: 'A romantic journey through the streets of Paris.', imageUrl: '2.jpeg' },
  { id: 3, name: 'Mystery Island', description: 'A group of strangers stranded on a strange island.', imageUrl: '3.jpeg' },
  { id: 4, name: 'Space Odyssey', description: 'An epic adventure through the galaxy.', imageUrl: '4.jpeg' },
  { id: 5, name: 'The Lost Treasure', description: 'A treasure hunt full of danger and mystery.', imageUrl: '5.jpeg' },
  { id: 6, name: 'Silent Shadows', description: 'A suspenseful thriller with unexpected twists.', imageUrl: '6.jpeg' },
  { id: 7, name: 'City Lights', description: 'A drama about life and struggle in a busy city.', imageUrl: '7.jpeg' },
  { id: 8, name: 'Future World', description: 'A science fiction tale set in a dystopian future.', imageUrl: '8.jpeg' },
  { id: 9, name: 'The Final Match', description: 'A sports drama about rivalry and redemption.', imageUrl: '9.jpeg' },
  { id: 10, name: 'Echoes of War', description: 'A historical war story of courage and sacrifice.', imageUrl: '10.jpeg' }
]
;
    return { movies};    
  }
  constructor() { }
}
