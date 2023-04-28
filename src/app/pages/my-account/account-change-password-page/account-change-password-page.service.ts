// /* eslint-disable prettier/prettier */
// import { DatePipe } from '@angular/common';
// import { inject, Injectable } from '@angular/core';
// import { FormBuilder, FormControl, Validators } from '@angular/forms';
// import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
// import { concatMap, EMPTY, Observable, tap } from 'rxjs';
// import { IResponse } from '../../../commons/services/api/api-models-base.interface';
// import { CRUD_METHOD, STATUS_CRUD } from '../../../commons/util/enums';
// import { IRequestChangePassword, IRequestResetPasswordUser } from 'src/app/commons/services/api/user/user-api-model.interface';
// import { UserApiService } from './../../../commons/services/api/user/user-api.service';

// @Injectable()
// export class AccountChangePasswordService {
// 	private _confirmBoxEvokeService = inject(ConfirmBoxEvokeService);
// 	private _toastEvokeService = inject(ToastEvokeService);
// 	private _userApiService = inject(UserApiService);
// 	private _datePipe = inject(DatePipe);
// 	private _formBuilder = inject(FormBuilder);

//   formGroup = this._getFormGroup();

//     changePassword(method: CRUD_METHOD): Observable<boolean> {
// 		return this._confirmBoxEvokeService
// 			.warning('Genero', '¿Esta seguro de guardar la información?', 'Si', 'Cancelar')
// 			.pipe(
// 				concatMap((responseQuestion) =>
// 					responseQuestion.success ? this._getMethod(method, this._getRequest(method)) : EMPTY
// 				),
// 				concatMap((response) => {
// 					if (response.success) {
// 						this._toastEvokeService.success('Exito', 'La información ha sido guardada.');
// 						return this._succes(true);
// 					}

// 					console.log(response);
// 					return this._succes(false);
// 				})
// 			);
// 	}

// 	/**
// 	 * En esta función vamos a retornar el evento que deseamos guardar o modificar; en el caso de las imagenes puede que al momento de seleccionar el evento para poder modificarlo solo modifiquen atributos de texto o número por lo tanto el valor de la imagen es solo una URL asi que no se debería de enviar, recuerden que el API necesita un base64 para crear una imagen.
// 	 * @param method
// 	 * @returns
// 	 */

// 	private _getRequest(method: CRUD_METHOD): IRequestResetPassword {
// 		const request: IRequestResetPassword = <IRequestResetPassword>{
// 			email: localStorage.getItem('email'),
// 			oldPassword: this.oldPasswordField.value,
// 			newPassword: this.newPasswordField.value
// 		};
// 		return request;
// 	}

// 	private _getMethod(method: CRUD_METHOD, request: IRequestResetPassword): Observable<IResponse<number>> {

// 		return method === CRUD_METHOD.SAVE
// 			? this._userApiService.resetPassword(request)
// 			: this._userApiService.resetPassword(request);
// 	}

// 	private _succes(isSucces: boolean): Observable<boolean> {
// 		return new Observable<boolean>((subscriber) => {
// 			subscriber.next(isSucces);
// 			subscriber.complete();
// 		});
// 	}


// 	//#region  load Form and getters y setters
// 	//Formulario Reactivo
// 	private _getFormGroup(){
// 		return this._formBuilder.nonNullable.group({
// 			oldPassword: ['', Validators.required],
// 			newPassword: ['', Validators.required]
// 		});
// 	}

// 	get oldPasswordField(): FormControl<string> {
// 		return this.formGroup.controls.oldPassword;
// 	}
// 	get newPasswordField(): FormControl<string> {
// 		return this.formGroup.controls.newPassword;
// 	}
// 	//#endregion`


// }