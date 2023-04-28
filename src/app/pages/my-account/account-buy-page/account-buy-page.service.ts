import { DatePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap, EMPTY, Observable, tap } from 'rxjs';
import { IResponse } from '../../../commons/services/api/api-models-base.interface';
import { IResponseSale } from '../../../commons/services/api/sale/sale-api-model.interface';
import { SaleApiService } from '../../../commons/services/api/sale/sale-api.service';

@Injectable()
export class AccountBuyPageService {
	private _confirmBoxEvokeService = inject(ConfirmBoxEvokeService);
	private _toastEvokeService = inject(ToastEvokeService);
	private _eventApiService = inject(SaleApiService);
	private _datePipe = inject(DatePipe);
	private _formBuilder = inject(FormBuilder);

	getDataSales(existingData: IResponseSale[], responseSales: IResponseSale[]): IResponseSale[] {
		if (existingData && existingData.length > 0) {
			/**
			 * Buscamos si los item de la respuesta existen en la data actual de la tabla, si existieran entonces nos quedamos con esos nuevos item para tener los datos actualizados
			 */
			let newArray = responseSales.filter((salesResponse) => {
				return existingData.some((event) => event.saleId === salesResponse.saleId);
			});

			/**
			 * Si no existiera alguna coincidencias entonces los items de la respuesta son nuevos asi que lo agregamos a la data existente.
			 *
			 * Si existiera coincidencias entonces solo queda filtrar los item que son distintos entre ambas listas, una vez obtenido esa diferencia la concatenamos con los datos actualizados de los registros existentes
			 */
			if (newArray.length === 0) {
				newArray = existingData.concat(responseSales);
			} else {
				newArray = existingData
					.filter((event) => {
						return !responseSales.some((eventResponse) => eventResponse.saleId === event.saleId);
					})
					.concat(newArray);
			}
			// si quisieran ordenar los eventos de manera decendente por id, podemos usar la función sort
			// newArray = newArray.sort((a, b) => b.id - a.id);
			return newArray;
		}

		return responseSales;
	}
}
