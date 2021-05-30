export class User {
    password!: string;
    name!: string;
    email!: string;
    songs!: string;

    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public get Name(): string {
        return this.name;
    }
    public set Name(n: string) {
        this.name = n;
    }

    public get Email(): string {
        return this.email;
    }
    public set Email(n: string) {
        this.email = n;
    }

    public get Password(): string {
        return this.password;
    }
    public set Password(n: string) {
        this.password = n;
    }
}
