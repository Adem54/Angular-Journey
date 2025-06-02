import { Component } from '@angular/core';
import { ProductRepostory } from '../repostory.model';

//Component decorater araciligi ile bir componentin belli ozelliklere sahip olmasi gerekir
@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
    model:ProductRepostory = new ProductRepostory();//we can access the methods via productrepostory 
}
