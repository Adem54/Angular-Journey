export class Model 
{
    user: string;
    items : Array<{id:number, description:string, completed:boolean}>;

    constructor() 
    {
        this.user = "Zehra";
        this.items = 
        [
            new TodoItem(1, 'Braekfast', true),
            new TodoItem(5, 'Dessert', false),
            new TodoItem(6, 'Exercise', false),
            new TodoItem(7, 'Study', false),
            new TodoItem(8, 'Shopping', false),
            new TodoItem(9, 'Cleaning', false),
            new TodoItem(10, 'Cooking', false),
            new TodoItem(11, 'Reading', false),
           
        ];
    }
} 

export class TodoItem 
{
    id;
    description;
    completed;

    constructor(id:number, description:string, completed:boolean) 
    {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
} 