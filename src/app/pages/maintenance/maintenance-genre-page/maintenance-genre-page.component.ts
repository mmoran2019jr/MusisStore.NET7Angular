import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { map, Observable } from 'rxjs';
// import { IResponseConcert } from '../../../commons/services/api/concerts/concert-api-model.interface';
// import { ConcertApiService } from '../../../commons/services/api/concerts/concert-api.service';
import { IResponseGenre } from '../../../commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from '../../../commons/services/api/genre/genre-api.service';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { CRUD_METHOD } from '../../../commons/util/enums';
import { MaintenanceGenrePageService } from './maintenance-genre-page.service';

@Component({
	standalone: true,
	selector: 'app-maintenance-genre-page',
	templateUrl: './maintenance-genre-page.component.html',
	styleUrls: ['./maintenance-genre-page.component.scss'],
	imports: [RouterModule, MatTableModule, MatTabsModule, MatMenuModule, MatPaginatorModule, SharedFormCompleteModule],
	providers: [MaintenanceGenrePageService, DatePipe]
})
export default class MaintenanceGenrePageComponent implements OnInit, AfterViewInit {
	@ViewChild('paginator') paginator: MatPaginator | undefined;

	@ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

	indexTabSaveEvent = 0;

	// variables para la tabla
	displayedColumns: string[] = ['name', 'status', 'action'];

	dataSource = new MatTableDataSource<IResponseGenre>();

	// pageSizeOptions: number[] = [2, 4, 6];
	// private _rowsPageBack = 4;
	// private _numberPageBack = 1;
	private _crudMethod = CRUD_METHOD.SAVE;

	//Inyeccion de dependencias
	private _maintenanceGenresPageService = inject(MaintenanceGenrePageService);
	private _eventApiService = inject(GenreApiService);
	private _confirmBoxEvokeService = inject(ConfirmBoxEvokeService);

	//#region getters Form
	idField = this._maintenanceGenresPageService.idField;
	nameField = this._maintenanceGenresPageService.nameField;
	statusField = this._maintenanceGenresPageService.statusField;

	formGroup = this._maintenanceGenresPageService.formGroup;

	canDeactivate(): Observable<boolean> | boolean {
		const values = this.formGroup.getRawValue();

		const isThereDataEntered = Object.values(values).find((item) => item);
		if (!isThereDataEntered) {
			return true;
		}

		return this._confirmBoxEvokeService
			.warning('Advertencia', 'Los datos ingresados se perderán, ¿Esta seguro que desea salir?', 'Si', 'Cancelar')
			.pipe(map((response) => response.success));
	}

	ngOnInit(): void {
		this._loadGenres();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator!;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickSaveGenre(): void {
		console.log(this._crudMethod);
		console.log(this.formGroup.valid);
		if (this.formGroup.valid) {
			this._maintenanceGenresPageService.saveGenre(this._crudMethod).subscribe((response) => {
				if (response) {
					this.formRef.resetForm();
					this._loadGenres();
					console.log(response);
				}
			});
		}
	}

	clickClear(): void {
		this._crudMethod = CRUD_METHOD.SAVE;
		this.formRef.resetForm();
	}

	clickUpdate(idGenre: number): void {
		this._maintenanceGenresPageService.updateForm(idGenre).subscribe((response) => {
			if (response.success) {
				this.indexTabSaveEvent = 0;
				this._crudMethod = CRUD_METHOD.UPDATE;
			}
		});
	}

	clickDelete(idGenre: number): void {
		this._maintenanceGenresPageService.deleteGenre(idGenre).subscribe((response) => {
			if (response) {
				this.dataSource.data = this.dataSource.data.filter((item) => item.id !== idGenre);
			}
		});
	}

	private _loadGenres(): void {
		this._eventApiService.getGenres().subscribe((response) => {
			if (response.success) {
				if (response.data.length > 0) {
					this.dataSource.data = this._maintenanceGenresPageService.getDataGenres(
						[...this.dataSource.data],
						response.data
					);
					console.log(response);
				} else {
					// this._numberPageBack--;
					console.log('No hay datos');
				}
			}
		});
	}
}
