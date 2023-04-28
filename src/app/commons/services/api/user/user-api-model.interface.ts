//#region  LOGIN
export interface IRequestLogin {
	userName: string;
	password: string;
}

export interface IResponseLogin {
	token: string;
	fullName: string;
	roles: string[];
	success: boolean;
	errorMessage: string[];
	email: string;
}
//#endregion

//#region  REGISTER
export interface IRequestRegister {
	firstName: string;
	lastName: string;
	documentType: string;
	documentNumber: string;
	email: string;
	password: string;
	confirmPassword: string;
	age?: number;
	role?: string;
}
//#endregion

//#region  RESET PASWWORD
export interface IRequestResetPassword {
	email: string;
	token: string;
	newPassword: string;
}
//#endregion

//#region  CHANGE PASWWORD
export interface IRequestChangePassword {
	email: string | null;
	oldPassword: string;
	newPassword: string;
}
//#endregion

//#region  EMAIL
export interface IRequestEmail {
	email: string;
}

export interface IRequestResetPasswordUser {
	email: string | null;
	oldPassword: string;
	newPassword: string;
}
//#endregion
