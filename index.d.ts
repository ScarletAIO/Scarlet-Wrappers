import CreateUserDto from "./api/interface/CreateUser.dto";
import UserDto from './api/interface/User.dto';
declare const _default: {
    /**
     * @description Send a POST Request to create a new user
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; }} user
     */
    createUser(user: CreateUserDto): Promise<void | {
        message: string;
        user: UserDto;
    }>;
    /**
     * @description Get the user by ID
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; id: string; }} user
     */
    getUser(user: UserDto): Promise<void | {
        message: string;
        user: UserDto;
    }>;
    /**
     * @description Send a PUT Request to update a user
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; id: string; }} user
     */
    updateUser(user: UserDto): Promise<void | UserDto>;
    /**
     * @description Send a DELETE Request to delete a user
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; id: string; }} user
     */
    deleteUser(user: UserDto): Promise<string | void>;
    /**
     * @description Send a request to retrieve a new token
     * @param {{ username?: string; firstName?:string, age:number; email?: string; password: string | null; id: string; }} user
     * @returns
     */
    refreshToken(user: UserDto): Promise<void>;
    /**
     * @automated True
     * @description Analyze the content to detect for phishing or harassment
     * @param {string} content - The content to analyse
     * @deprecated
     * @returns
     */
    analyzer(content: string): Promise<void>;
};
export default _default;
