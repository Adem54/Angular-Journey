import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root1',//index.html(<app-root></app-root>)(AppComponent)
  /*Wherever Angular sees the tag <app-root> in your HTML, it will:
Instantiate the AppComponent
Replace that tag with the component’s HTML (templateUrl)
Attach its logic, data, and styling */
  imports: [RouterOutlet],  // Add other components/modules here
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-angular-app';
}
