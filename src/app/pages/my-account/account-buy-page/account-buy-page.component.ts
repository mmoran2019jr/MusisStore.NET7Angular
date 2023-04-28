import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SaleApiService } from '../../../commons/services/api/sale/sale-api.service';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { IResponseSale } from 'src/app/commons/services/api/sale/sale-api-model.interface';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { AccountBuyPageService } from './account-buy-page.service';

@Component({
	standalone: true,
	selector: 'app-account-buy-page',
	templateUrl: './account-buy-page.component.html',
	styleUrls: ['./account-buy-page.component.scss'],
	imports: [RouterModule, MatTableModule, MatTabsModule, MatMenuModule, MatPaginatorModule, SharedFormCompleteModule],
	providers: [SaleApiService]
})
export default class AccountBuyPageComponent implements OnInit, AfterViewInit {
	@ViewChild('paginator') paginator: MatPaginator | undefined;

	// variables para la tabla
	displayedColumns: string[] = ['title', 'genre', 'dateEvent', 'timeEvent'];

	dataSource = new MatTableDataSource<IResponseSale>();
	pageSizeOptions: number[] = [2, 4, 6];
	private _rowsPageBack = 4;
	private _numberPageBack = 1;

	private _saleApiService = inject(SaleApiService);
	private _confirmBoxEvokeService = inject(ConfirmBoxEvokeService);
	private _accountByService = inject(AccountBuyPageService);

	ngOnInit(): void {
		this._loadSales();
		console.log('Entrando a componente de cambiar contrasenia');
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator!;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	getPaginatorData(): void {
		if (!this.paginator?.hasNextPage()) {
			this._numberPageBack++;
			this._loadSales();
		}
	}

	_loadSales(): void {
		this._saleApiService.getSalesUser('', this._numberPageBack, this._rowsPageBack).subscribe((response) => {
			if (response.success) {
				if (response.data.length > 0) {
					this.dataSource.data = this._accountByService.getDataSales([...this.dataSource.data], response.data);
					console.log(this.dataSource.data);
				} else {
					this._numberPageBack--;
				}
			}
		});
	}
}
