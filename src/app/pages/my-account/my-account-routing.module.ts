import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATH_MY_ACCOUNT_PAGES } from './../../commons/config/path-pages';
import { MyAccountComponent } from './my-account.component';

export const routes: Routes = [
	{
		path: '',
		component: MyAccountComponent,
		children: [
			{
				path: PATH_MY_ACCOUNT_PAGES.myBuys.onlyPath,
				title: 'MIS COMPRAS',
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
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MyAccountRoutingModule {}
