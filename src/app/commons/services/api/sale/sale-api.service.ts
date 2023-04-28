import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { IResponse } from './../api-models-base.interface';
import { IRequestCreateSale, IRequestListSalesByGenre, IResponseSale } from './sale-api-model.interface';

const URL_SALE = environment.host + '/Sales';
const URL_SALE_GET = URL_SALE + '/Get';
const URL_CREATE_SALE = URL_SALE;
const URL_LIST_SALE = URL_SALE + '/ListSales';
const URL_LIST_SALE_BY_DATE = URL_SALE + '/ListSalesByDate';

@Injectable({
	providedIn: 'root'
})
export class SaleApiService {
	constructor(private _httpClient: HttpClient) {}

	createSale(sale: IRequestCreateSale): Observable<IResponse<number>> {
		return this._httpClient.post<IResponse<number>>(URL_CREATE_SALE, sale);
	}

	getSale(idSale: number): Observable<IResponse<IResponseSale>> {
		return this._httpClient.get<IResponse<IResponseSale>>(`${URL_SALE_GET}/${idSale}`);
	}

	getSalesUser(filter: string, page?: number, rows?: number): Observable<IResponse<IResponseSale[]>> {
		return this._httpClient.get<IResponse<IResponseSale[]>>(URL_LIST_SALE);
	}

	getListSales(request: IRequestListSalesByGenre): Observable<IResponse<IResponseSale[]>> {
		let params = new HttpParams().set('dateStart', request.dateStart).set('dateEnd', request.dateEnd);
		if (request.page) {
			params = params.set('page', request.page);
		}
		if (request.rows) {
			params = params.set('rows', request.rows);
		}

		return this._httpClient.get<IResponse<IResponseSale[]>>(URL_LIST_SALE_BY_DATE, { params });
	}
}
