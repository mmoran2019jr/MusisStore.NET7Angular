import { Routes } from '@angular/router';
import { PATH_MAINTENANCE_PAGES } from '../../commons/config/path-pages';
import { AUTH_GUARD, MAINTENANCE_GUARD } from '../../commons/guards/function.guard';
import { MaintenanceComponent } from './maintenance.component';

export const routes: Routes = [
	{
		path: '', //www.mitocode.com/maintenance
		canActivate: [MAINTENANCE_GUARD],
		canActivateChild: [AUTH_GUARD],
		component: MaintenanceComponent,
		children: [
			{
				path: PATH_MAINTENANCE_PAGES.buy.onlyPath,
				title: 'Eventos vendidos',
				loadComponent: () => import('./maintenance-buy-page/maintenance-buy-page.component')
			},
			{
				path: PATH_MAINTENANCE_PAGES.events.onlyPath,
				title: 'Eventos',
				loadComponent: () => import('./maintenance-events-page/maintenance-events-page.component')
			},
			{
				path: PATH_MAINTENANCE_PAGES.genres.onlyPath,
				title: 'Generos',
				loadComponent: () => import('./maintenance-genre-page/maintenance-genre-page.component')
			},
			{
				path: PATH_MAINTENANCE_PAGES.reports.onlyPath,
				title: 'Reporte de ventas',
				loadComponent: () => import('./maintenance-reports/maintenance-reports.component')
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: PATH_MAINTENANCE_PAGES.events.onlyPath
			}
		]
	}
];
