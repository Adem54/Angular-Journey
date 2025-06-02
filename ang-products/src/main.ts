import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

//projemiz i AppModule den baslat diyoruz
platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
