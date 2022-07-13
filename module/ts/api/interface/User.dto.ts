export default interface UserDto {
    username?: string;
    email?: string;
    password: string | null;
    id: string | null;
    token?: string;
}