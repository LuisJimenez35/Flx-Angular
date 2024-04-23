export interface AuthUserInterface {
    id: string;
    email: string;
    username: string;
}

export interface UserInfoInterface {
    email: string;
    rol: string;
    username: string;
}

export interface UserInterface extends AuthUserInterface, UserInfoInterface{}
