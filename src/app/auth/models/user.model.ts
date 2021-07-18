export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    token: string;

    clear(): void {
        this.id = null;
        this.name = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.password_confirmation = '';
        this.token = '';
    }
}