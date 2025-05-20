export class Movie {
    id:number= 0;
    name:string ="";
    description?:string="";
    imageUrl?:string="";

    constructor(id:number, name:string){
        this.id = id;
        this.name = name;
        
    }

}