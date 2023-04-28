// export function AUTH_GUARD(): boolean {}

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS_AUTH_PAGES, PATH_MAINTENANCE_PAGES, PATH_MY_ACCOUNT_PAGES } from '../config/path-pages';
import { ChannelHeaderService } from '../services/local/channel-header.service';
import { DataUserService } from '../services/local/data-user.service';
import { SessionStorageService } from '../services/local/storage/storage.service';

export const AUTH_GUARD = (): boolean => {
	return _validSession();
};

const _validSession = (): boolean => {
	const dataUserService = inject(DataUserService);
	const router = inject(Router);
	const channelHeaderService = inject(ChannelHeaderService);
	const sessionStorageService = inject(SessionStorageService);

	if (dataUserService.isExpiredToken()) {
		channelHeaderService.showUser(false);
		sessionStorageService.clear();
		router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
		return false;
	}

	return true;
};

export const MAINTENANCE_GUARD = (): boolean => {
	const dataUserService = inject(DataUserService);
	const router = inject(Router);

	if (dataUserService.isAdmin() === false) {
		router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
		return false;
	}
	return true;
};

export const BUY_GUARD = (): boolean => {
	const dataUserService = inject(DataUserService);
	const router = inject(Router);

	if (dataUserService.isAdmin() === true) {
		router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
		return false;
	}
	return true;
};

export const MYACCOUNT_GUARD = (): boolean => {
	const dataUserService = inject(DataUserService);
	const router = inject(Router);

	console.log(router);
	console.log(dataUserService.isAdmin());

	if (dataUserService.isAdmin() === true) {
		router.navigateByUrl(PATH_MY_ACCOUNT_PAGES.withSlash);
		return false;
	}
	return true;
};
