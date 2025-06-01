import { Component } from '@angular/core';
import { AzureAdDemoService } from '../azure-ad-demo.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isUserLoggedIn:boolean=false;

  constructor(private azureAdDemoService:AzureAdDemoService)
  {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.azureAdDemoService.isUserLoggedIn.subscribe(
      x=>{
        this.isUserLoggedIn=x;
      }
    )
  }
}
