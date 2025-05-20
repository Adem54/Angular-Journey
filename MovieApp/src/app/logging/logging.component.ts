import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'logging',
  standalone: false,
  templateUrl: './logging.component.html',
  styleUrl: './logging.component.css'
})
export class LoggingComponent {

  //Dikkat edelim..biz loggingService yi logging.component.html de kullanmak istiyoruz yani sadece, constructor icerisinde logging.component.ts de degil, ayni zamanda logging.component.html de de kullanmak istiyoruz...O zaman, consturctora loggingService yi dep-injection yaparken public ile yapariz...ama html kisminda detgil sadece .ts in constructor kisminda kullanacak olsa idik o zaman privte olmassi yeterli olurdu
  constructor(public loggingService:LoggingService){}
}
