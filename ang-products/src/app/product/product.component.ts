import { Component } from '@angular/core';
import { ProductRepostory } from '../repostory.model';
import { Product } from '../product.model';

//Component decorater araciligi ile bir componentin belli ozelliklere sahip olmasi gerekir
@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
    model:ProductRepostory = new ProductRepostory();//we can access the methods via productrepostory 
    
    product:Product = this.model.getProductsById(2);

    isActive=false;
    isInfo = false;
    disabled=true;
    getClasses(id:number):string {
      let product = this.model.getProductsById(id);
      return (product.price && product.price > 2000 ? "bg-info" : "bg-warning") + " m-5 p-2";
    }

    getClassMap(id:number):Object {
      let product = this.model.getProductsById(id);
      console.log("product: ", product);
      let result = {
                "bg-info": (product.price!) <= 1000 , 
                "bg-secondary": (product.price || 0) > 1000 , 
                "text-center text-white": (product.name) ==  "Samsung S6" , 
              };
              console.log("result: ", result);
       return result;
    }
}

/*
CONCEPTS AND TERMS...
 Dinamik daatalarimiz nasil html icinde kullaniriz..

1.Expression interpolation yontemi ile
 expression, interpolation
expression tanimlayabiliyoruz...product.component.ts icinde ornegn title = "Adem" ve bunu html dosyasinda interpolation araciligi ile kullanabiliyuourz {{ title }}
expression kisminda ister data yi tutan variabel, istersek de bir method olarak tutabilyoruz...

2.Property binding yontemi ile Oneway ...Expressionlari bind edebilyourz..componentte hazirladigmz icerigi DOM uzerinde html uzerinde gostermis oluyoruz aslinda...
[property]= "expression"

3. Event binding (event)="statement"

4. Two way binding [(ngModel)]="porperty"

Bunlari tamami componentt ile DOM ARASINDA DATA YI DINAMIK OLARAK KULLANMA YONTEMI ILE DOM U ISTDDIGMZ GIBI MANIPULE EDEBILIORUZ....ISTE MAKSADIMIZ BUDUR...

*/