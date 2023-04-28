import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardMenusComponent } from '../../commons/components/card-menus/card-menus.component';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { PATH_MY_ACCOUNT_PAGES } from '../../commons/config/path-pages';
import { ICardMenu } from '../../commons/models/components.interface';

@Component({
	standalone: true,
	selector: 'app-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.scss'],
	imports: [CardMenusComponent, RouterModule]
})
export class MyAccountComponent {
	readonly menuUser: ICardMenu[] = [
		{
			title: 'MISCOMPRAS',
			nameImage: 'buys.png',
			active: true,
			path: PATH_MY_ACCOUNT_PAGES.myBuys.withSlash
		},
		{
			title: 'CHANGEPASSWORD',
			nameImage: 'change-password.png',
			active: false,
			path: PATH_MY_ACCOUNT_PAGES.changePassword.withSlash
		}
	];
}
