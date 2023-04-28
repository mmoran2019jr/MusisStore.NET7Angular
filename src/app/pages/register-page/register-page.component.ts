import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../../commons/config/path-pages';
import { IRequestRegister } from '../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from '../../commons/services/api/user/user-api.service';
import { SharedFormBasicModule } from '../../commons/shared/shared-form-basic.module';
import { customPasswordValidator } from '../../commons/validators/forms.validator';
import {
	crossPasswordMatchingValidatior as crossPasswordMatchingValidator,
	PasswordStateMatcher
} from './register-custom-validators';

@Component({
	standalone: true,
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
	imports: [RouterModule, MatSelectModule, SharedFormBasicModule]
})
export default class RegisterPageComponent implements OnInit {
	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;
	private _router = inject(Router);
	private _formBuilder = inject(FormBuilder);
	private _userApiService = inject(UserApiService);

	passwordStateMatcher = new PasswordStateMatcher();
	disabledButton = false;

	formGroup = this._formBuilder.nonNullable.group(
		{
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			typeDocument: ['1'], //2
			documentNumber: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [customPasswordValidator, Validators.required]],
			confirmPassword: ['', [Validators.required]],
			age: this._formBuilder.control<number | null>(null)
		},
		{
			validators: crossPasswordMatchingValidator
		}
	);

	ngOnInit(): void {
		this.formGroup.controls.firstName.valueChanges.subscribe((value) => {
			// console.log(value);
		});
	}

	clickRegister(): void {
		if (this.formGroup.valid) {
			this._userApiService.register(this._getRequest()).subscribe({
				next: (response) => {
					if (response.success) {
						void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
					} else {
						this.disabledButton = false;
					}
				},
				error: () => (this.disabledButton = false)
			});
		}
	}

	private _getRequest(): IRequestRegister {
		// return this.formGroup.getRawValue() as IRequestRegister;
		return {
			firstName: this.firtsField.value,
			lastName: this.lastNameField.value,
			documentType: this.typeDocumentField.value!,
			documentNumber: this.documentNumberField.value,
			email: this.emailField.value,
			password: this.passwordField.value,
			confirmPassword: this.confirmPasswordField.value,
			age: this.ageField.value ? this.ageField.value : undefined,
			role: 'Customer'
		};
	}

	get firtsField(): FormControl<string> {
		return this.formGroup.controls.firstName;
	}

	get lastNameField(): FormControl<string> {
		return this.formGroup.controls.lastName;
	}

	get typeDocumentField(): FormControl<string | null> {
		return this.formGroup.controls.typeDocument;
	}

	get documentNumberField(): FormControl<string> {
		return this.formGroup.controls.documentNumber;
	}

	get emailField(): FormControl<string> {
		return this.formGroup.controls.email;
	}

	get passwordField(): FormControl<string> {
		return this.formGroup.controls.password;
	}

	get confirmPasswordField(): FormControl<string> {
		return this.formGroup.controls.confirmPassword;
	}

	get ageField(): FormControl<number | null> {
		return this.formGroup.controls.age;
	}
}
