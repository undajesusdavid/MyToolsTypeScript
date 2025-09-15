export class UserController {
    private username : string;
    private password: number;

    constructor(username:string, password: number){
        this.username = username;
        this.password = password;
    }

    save(){
        return "Usuario registrado";
    }

    getUsername() : string{
        return this.username;
    }

    getPassword(): number{
      return this.password;  
    }

}