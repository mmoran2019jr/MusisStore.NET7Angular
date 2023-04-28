import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { mergeMap } from 'rxjs';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { PATHS_AUTH_PAGES } from '../../commons/config/path-pages';
import { ICardEvent } from '../../commons/models/components.interface';
import { IRequestCreateSale, IResponseSale } from '../../commons/services/api/sale/sale-api-model.interface';
import { SaleApiService } from '../../commons/services/api/sale/sale-api.service';
import { DataUserService } from '../../commons/services/local/data-user.service';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';
import { CustomCurrencyPipe } from './../../commons/pipes/custom-currency.pipe';

type StatusBuy = 'INFO' | 'BUY' | 'VOUCHER';

@Component({
	standalone: true,
	selector: 'app-buy-page',
	templateUrl: './buy-page.component.html',
	styleUrls: ['./buy-page.component.scss'],
	imports: [RouterModule, SharedFormCompleteModule, CardEventComponent, CustomCurrencyPipe]
})
export default class BuyPageComponent {
	statusBuy: StatusBuy = 'INFO';
	dateDemo = new Date();
	cardEvent?: ICardEvent;
	voucher?: IResponseSale;

	numberEntries = 0;
	total = 0;

	private _router = inject(Router);
	private _saleApiService = inject(SaleApiService);
	private _toastEvokeService = inject(ToastEvokeService);
	private _dataUserService = inject(DataUserService);

	constructor() {
		this._captureData();
	}

	clickBuy(statusBuy: StatusBuy): void {
		if (this._dataUserService.isExpiredToken()) {
			this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			return;
		}

		if (statusBuy === 'VOUCHER') {
			this._saveBuy();
			return;
		}

		this.statusBuy = statusBuy;
	}

	private _saveBuy(): void {
		const sendBuy: IRequestCreateSale = {
			concertId: this.cardEvent!.idEvent,
			ticketsQuantity: this.numberEntries
		};

		this._saleApiService
			.createSale(sendBuy)
			.pipe(
				mergeMap((response) => {
					return this._saleApiService.getSale(response.data);
				})
			)
			.subscribe((voucher) => {
				if (voucher && voucher.success) {
					this.voucher = voucher.data;
					this.statusBuy = 'VOUCHER';
					this._toastEvokeService.success('Compra', 'Su compra se ha realizado con exito, gracias.');
				}
			});
	}

	inputCalculate(): void {
		this.total = this.numberEntries * this.cardEvent!.price;
	}

	private _captureData(): void {
		const navigation = this._router.getCurrentNavigation();

		if (navigation?.extras && navigation.extras.state && navigation.extras.state['event']) {
			this.cardEvent = navigation.extras.state['event'] as ICardEvent;
		}

		if (!this.cardEvent) {
			void this._router.navigateByUrl('/');
		}
	}
}
