import UserDto from "./interface/User.dto";
interface AuthData {
    password: UserDto["password"];
    id?: UserDto["id"];
}
declare const _default: {
    login(user: UserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(user: AuthData | {
        id?: string | null | undefined;
        password: UserDto["password"];
    }, password?: string | null | undefined): Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
    }>;
    checkIfTokenExpired(user: UserDto): Promise<boolean | undefined>;
};
export default _default;
