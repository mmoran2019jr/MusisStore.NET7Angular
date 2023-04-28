import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS_AUTH_PAGES, PATH_MAINTENANCE_PAGES, PATH_MY_ACCOUNT_PAGES } from '../../commons/config/path-pages';
import { IDataUser } from '../../commons/models/data-user';
import { IResponseLogin } from '../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from '../../commons/services/api/user/user-api.service';
import { ChannelHeaderService } from '../../commons/services/local/channel-header.service';
import { SessionStorageService } from '../../commons/services/local/storage/storage.service';
import { KEYS_WEB_STORAGE } from '../../commons/util/enums';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
	readonly pathRecovery = PATHS_AUTH_PAGES.recoverPasswordPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;
	readonly title = 'inicio de sesión';

	disabledButton = false;
	showButton = false;

	private _router = inject(Router);
	private _channelHeaderService = inject(ChannelHeaderService);
	private _formBuilder = inject(FormBuilder);
	private _userApiService = inject(UserApiService);
	private _sessionStorageService = inject(SessionStorageService);

	// constructor(private _router: Router, private _channelHeaderService: ChannelHeaderService) {}

	formGroup = this._formBuilder.nonNullable.group({
		email: ['Orlando.erick@gmail.com', [Validators.required, Validators.email]],
		password: ['miclavesecreta', Validators.required]
	});

	clickLogin(): void {
		console.log(this.formGroup.get('email')?.value);
		console.log(this.formGroup.controls.email.value);

		// console.log(this.formGroup.value);
		// console.log(this.formGroup.getRawValue());
		// console.log(this.formGroup.valid);
		if (this.formGroup.valid) {
			const { email, password } = this.formGroup.getRawValue();
			this.disabledButton = true;

			this._userApiService.login({ userName: email, password }).subscribe({
				next: (response) => {
					this._saveDataUserAndRedirect(response);
				},
				error: () => {
					this.disabledButton = false;
				}
			});
		}
	}

	private _saveDataUserAndRedirect(response: IResponseLogin): void {
		const dataUser: IDataUser = {
			token: response.token,
			fullName: response.fullName,
			isAdmin: response.roles[0] === 'Administrador',
			email: response.email
		};

		console.log(response);

		this._sessionStorageService.setItem(KEYS_WEB_STORAGE.DATA_USER, dataUser);
		localStorage.setItem('email', response.email);
		this._redirectUser(dataUser.isAdmin);
	}

	private _redirectUser(isAdmin: boolean): void {
		const url = isAdmin ? PATH_MAINTENANCE_PAGES.withSlash : PATH_MY_ACCOUNT_PAGES.withSlash;
		this._router.navigateByUrl(url);
		this._channelHeaderService.showUser(true);
	}
}
