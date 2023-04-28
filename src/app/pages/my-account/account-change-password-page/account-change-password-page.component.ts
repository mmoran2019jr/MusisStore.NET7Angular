import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { UserApiService } from 'src/app/commons/services/api/user/user-api.service';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import {
	IRequestChangePassword,
	IRequestResetPassword,
	IRequestResetPasswordUser
} from 'src/app/commons/services/api/user/user-api-model.interface';
// import { AccountChangePasswordService } from './account-change-password-page.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
	standalone: true,
	selector: 'app-account-change-password-page',
	templateUrl: './account-change-password-page.component.html',
	styleUrls: ['./account-change-password-page.component.scss'],
	imports: [RouterModule, SharedFormCompleteModule],
	providers: [UserApiService]
})
export default class AccountChangePasswordPageComponent implements OnInit {
	private _myAccountPageService = inject(UserApiService);
	private _confirmBoxEvokeService = inject(ConfirmBoxEvokeService);
	private _formBuilder = inject(FormBuilder);
	// private _changePasswordService = inject(AccountChangePasswordService);

	correo: any = '';
	data: [] | undefined;
	token: string = '';

	formGroup = this._formBuilder.nonNullable.group({
		oldPassword: ['', Validators.required],
		newPassword: ['', Validators.required]
	});

	ngOnInit(): void {
		this.correo = localStorage.getItem('email');

		this.getTokenUser(localStorage.getItem('email'));
		console.log('Entrando a componente de cambiar contrasenia');
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	//Generar token para cambiar contrasenia del usuario
	getTokenUser(email: string | null): void {
		this._myAccountPageService.sendTokenToResetPassword(email).subscribe((response) => {
			if (response) {
				console.log('Este es el token ' + JSON.stringify(response['token']));
				//Asignacion de token en variable
				this.token = JSON.stringify(response['token']);
			}
		});
	}

	//Cambiar la contrasena a partir del email del usuario
	changePasswordUser(): void {
		if (this.formGroup.valid) {
			const request: IRequestChangePassword = {
				email: localStorage.getItem('email'),
				oldPassword: this.oldPasswordField.value,
				newPassword: this.newPasswordField.value
			};

			this._myAccountPageService.changePassword(request).subscribe({
				next: (response) => {
					Swal.fire({
						icon: 'success',
						title: 'Exitoso',
						position: 'center',
						text: 'Se modifico la contraseña correctamente'
					});
					console.log(response);
				},
				error: (e) => {
					Swal.fire({
						icon: 'error',
						title: 'Error',
						position: 'center',
						text: 'Hubo un error en el proceso'
					});
					console.log('Error');
				}
			});
		}
	}

	get oldPasswordField(): FormControl<string> {
		return this.formGroup.controls.oldPassword;
	}
	get newPasswordField(): FormControl<string> {
		return this.formGroup.controls.newPassword;
	}

	// clickChangePassword(request: IRequestChangePassword): void {
	// 	// this._myAccountPageService.changePassword()
	// }
}
