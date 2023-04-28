import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ICardMenu } from '../../models/components.interface';

@Component({
	standalone: true,
	selector: 'app-card-menus',
	templateUrl: './card-menus.component.html',
	styleUrls: ['./card-menus.component.scss'],
	imports: [CommonModule, RouterModule]
})
export class CardMenusComponent implements OnInit, OnDestroy {
	@Input() menus: ICardMenu[] = [];
	private _currentRoute = '';
	private _subscription!: Subscription;

	constructor(private _router: Router) {
		this._selecteMenuFromRouter();
	}

	ngOnInit(): void {
		this._selectMenu();
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}

	private _selectMenu(): void {
		const menu = this.menus.find((item) => item.path === this._currentRoute);
		if (menu) {
			this.menus.forEach((item) => (item.active = false));
			menu.active = true;
		}
	}

	private _selecteMenuFromRouter() {
		this._subscription = this._router.events
			.pipe(filter((value) => value instanceof NavigationEnd))
			.subscribe((event) => {
				const navigation = event as NavigationEnd;
				this._currentRoute = navigation.url;
				this._selectMenu();
			});
	}
}
