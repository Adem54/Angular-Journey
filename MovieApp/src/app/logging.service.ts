import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//servisin ulasilablirlgini root comonenti belirledigimz icin bizim root componentimz app componenti oldugu icin app componenti icinde buluan tum componentlerde bu servisi kullanabilriz...
export class LoggingService {

  messages:string[] = [];

  add(message:string)
  {
    this.messages.push(message);
  }

  clear(){
    this.messages = [];
  }
  constructor() { }
}
//Burda biz log lari gosterme uygulamasi yapiyoruz ve kendi ram imizde tututgmuz data uzeerinde simule edecegiz ondan dolayi observable kullanmiyoruz ama normalde data uzak apiden gelecek ve o zaman observable kullanmamiz gerekyor