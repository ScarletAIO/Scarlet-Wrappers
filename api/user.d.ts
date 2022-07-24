import CreateUserDto from "./interface/CreateUser.dto";
import UserDto from "./interface/User.dto";
declare const _default: {
    getUser(id: UserDto["id"]): Promise<{
        message: string;
        user: UserDto;
    }>;
    createUser(user: CreateUserDto): Promise<{
        message: string;
        user: UserDto;
    }>;
    updateUser(id: UserDto["id"], user: UserDto): Promise<UserDto>;
    /**
     *
     * @param {string} id User id
     * @param {string} password User password
     * @returns Promise<{ message: string }>
     */
    deleteUser(id: UserDto["id"], password: UserDto["password"]): Promise<{
        message: string;
    }>;
    resetPassword(id: UserDto["id"], password: UserDto["password"]): Promise<UserDto>;
};
export default _default;
