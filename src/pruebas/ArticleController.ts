export class ArticleController{

    private name : string;
    private price : number;

    constructor(name:string, price:number){
        this.name = name;
        this.price = price;
    }

    save(){
        return "Articulo registrado";
    }

    getName(){
        return this.name;
    }

    getPrice(){
        return this.price;
    }
}