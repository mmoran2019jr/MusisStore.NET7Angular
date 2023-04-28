/* eslint-disable prettier/prettier */
import { GenreApiService } from './../../../commons/services/api/genre/genre-api.service';
import { DatePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap, EMPTY, Observable, tap } from 'rxjs';
import { 
	IResponseGenre, IRequestCreateUpdateGenre 
} from '../../../commons/services/api/genre/genre-api-model.interface';
import { IResponse } from '../../../commons/services/api/api-models-base.interface';
import { CRUD_METHOD, STATUS_CRUD } from '../../../commons/util/enums';

@Injectable()
export class MaintenanceGenrePageService {
	private _confirmBoxEvokeService = inject(ConfirmBoxEvokeService);
	private _toastEvokeService = inject(ToastEvokeService);
	private _genreApiService = inject(GenreApiService);
	private _datePipe = inject(DatePipe);
	private _formBuilder = inject(FormBuilder);

  formGroup = this._getFormGroup();


  	deleteGenre(idGenre: number): Observable<boolean> {
		return this._confirmBoxEvokeService.warning('Genero', '¿Esta seguro de eliminar el Genero?', 'Si', 'Cancelar').pipe(
			concatMap((responseQuestion) =>
				responseQuestion.success ? this._genreApiService.deleteGenre(idGenre) : EMPTY
			),
			concatMap((response) => {
				if (response.success) {
					this._toastEvokeService.success('Exito', 'El genero a sido eliminado');
					return this._succes(true);
				}
				return this._succes(false);
			})
		);
	}

	updateForm(idGenre: number): Observable<IResponse<IResponseGenre>> {
		return this._genreApiService.getGenre(idGenre).pipe(
			tap((response) => {
				if (response.success) {
					const genreResponse = response.data;

					this.idField.setValue(genreResponse.id);
					this.nameField.setValue(genreResponse.name);
					this.statusField.setValue(genreResponse.status);
				}
			})
		);
	}

	getDataGenres(existingData: IResponseGenre[], responseGenres: IResponseGenre[]): IResponseGenre[] {
		if (existingData && existingData.length > 0) {
			/**
			 * Buscamos si los item de la respuesta existen en la data actual de la tabla, si existieran entonces nos quedamos con esos nuevos item para tener los datos actualizados
			 */
			let newArray = responseGenres.filter((genreResponse) => {
				return existingData.some((genre) => genre.id === genreResponse.id);
			});

			/**
			 * Si no existiera alguna coincidencias entonces los items de la respuesta son nuevos asi que lo agregamos a la data existente.
			 *
			 * Si existiera coincidencias entonces solo queda filtrar los item que son distintos entre ambas listas, una vez obtenido esa diferencia la concatenamos con los datos actualizados de los registros existentes
			 */
			if (newArray.length === 0) {
				newArray = existingData.concat(responseGenres);
			} else {
				newArray = existingData
					.filter((genre) => {
						return !responseGenres.some((genreResponse) => genreResponse.id === genre.id);
					})
					.concat(newArray);
			}
			// si quisieran ordenar los eventos de manera decendente por id, podemos usar la función sort
			// newArray = newArray.sort((a, b) => b.id - a.id);
			return newArray;
		}

		return responseGenres;
	}

	saveGenre(method: CRUD_METHOD): Observable<boolean> {
		console.log(method);
		console.log(this._getRequest(method));
		return this._confirmBoxEvokeService
			.warning('Genero', '¿Esta seguro de guardar la información?', 'Si', 'Cancelar')
			.pipe(
				concatMap((responseQuestion) =>
					responseQuestion.success ? this._getMethod(method, this._getRequest(method)) : EMPTY
				),
				concatMap((response) => {
					if (response.success) {
						this._toastEvokeService.success('Exito', 'La información ha sido guardada.');
						return this._succes(true);
					}
					
					console.log(response);
					return this._succes(false);
				})
			);
	}


	/**
	 * En esta función vamos a retornar el evento que deseamos guardar o modificar; en el caso de las imagenes puede que al momento de seleccionar el evento para poder modificarlo solo modifiquen atributos de texto o número por lo tanto el valor de la imagen es solo una URL asi que no se debería de enviar, recuerden que el API necesita un base64 para crear una imagen.
	 * @param method
	 * @returns
	 */

	private _getRequest(method: CRUD_METHOD): IRequestCreateUpdateGenre {
		const request: IRequestCreateUpdateGenre = <IRequestCreateUpdateGenre>{
			name: this.nameField.value,
			status: this.statusField.value
		};

		// const existHttpMitocode = this.imageField.value.search('https://mitocode.blob.core.windows.net');

		// if (method === CRUD_METHOD.SAVE || (method == CRUD_METHOD.UPDATE && existHttpMitocode === -1)) {
		// 	const base64 = this.imageField.value.split(',')[1];
		// 	request.base64Image = base64;
		// 	request.fileName = this.fileNameField.value!;
		// }

		return request;
	}

	private _getMethod(method: CRUD_METHOD, request: IRequestCreateUpdateGenre): Observable<IResponse<number>> {
		const idGenre = this.idField.value as number;

		return method === CRUD_METHOD.SAVE
			? this._genreApiService.createGenre(request)
			: this._genreApiService.updateGenre(idGenre, request);
	}

	private _succes(isSucces: boolean): Observable<boolean> {
		return new Observable<boolean>((subscriber) => {
			subscriber.next(isSucces);
			subscriber.complete();
		});
	}


	//#region  load Form and getters y setters
	//Formulario Reactivo
	private _getFormGroup(){
		return this._formBuilder.nonNullable.group({
			id: [0, Validators.required],
			name: ['', Validators.required],
			status: [true, Validators.required]
		});
	}

	get idField(): FormControl<number | null> {
		return this.formGroup.controls.id;
	}
	get nameField(): FormControl<string> {
		return this.formGroup.controls.name;
	}
	get statusField(): FormControl<boolean> {
		return this.formGroup.controls.status;
	}
	//#endregion`




}