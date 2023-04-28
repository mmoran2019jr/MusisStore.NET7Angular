import { Routes } from '@angular/router';
import { PATH_MY_ACCOUNT_PAGES } from '../../commons/config/path-pages';
import { AUTH_GUARD, MYACCOUNT_GUARD } from '../../commons/guards/function.guard';
import { MyAccountComponent } from './my-account.component';

export const routes: Routes = [
	{
		path: '', //www.mitocode.com/maintenance
		canActivate: [MYACCOUNT_GUARD],
		canActivateChild: [AUTH_GUARD],
		component: MyAccountComponent,
		children: [
			{
				path: PATH_MY_ACCOUNT_PAGES.myBuys.onlyPath,
				title: 'MisCompras',
				loadComponent: () => import('./account-buy-page/account-buy-page.component')
			},
			{
				path: PATH_MY_ACCOUNT_PAGES.changePassword.onlyPath,
				title: 'Cambiar Password',
				loadComponent: () => import('./account-change-password-page/account-change-password-page.component')
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: PATH_MY_ACCOUNT_PAGES.myBuys.onlyPath
			}
		]
	}
];
