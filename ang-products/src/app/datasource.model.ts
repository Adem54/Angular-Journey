import { Product } from "./product.model";

export class SimpleDataSource 
{
    private products:Product[];
    constructor()
    {
        this.products = new Array<Product>(
            new Product(1, "Samsun S5", "well phone", "1.jpeg", 1000),
            new Product(2, "Samsun S6", "well phone", "2.jpeg", 2000),
            new Product(3, "Samsun S7", "well phone", "3.jpeg",  3000),
            new Product(4, "Samsun S8", "well phone", "4.jpeg", 4000),
            new Product(5, "Samsun S9", "well phone", "5.jpeg", 5000),
            new Product(6, "Samsun S10", "well phone", "6.jpeg", 6000),
        );
        
    }

    getProducts = ():Array<Product>  => 
    {
        return this.products;
    }
}