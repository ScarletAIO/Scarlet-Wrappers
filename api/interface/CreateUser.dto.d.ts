export default interface CreateUserDto {
    username: string;
    firstName?: string;
    email: string;
    age?: number;
    password: string;
    token?: string;
}
