//#region CREATE SALE
export interface IRequestCreateSale {
	concertId: number;
	ticketsQuantity: number;
}

//#endregion

//#region ListSalesByGenre
export interface IRequestListSalesByGenre {
	dateStart: string;
	dateEnd: string;
	page?: number;
	rows?: number;
}
//#endregion

//#region get sale
export interface IResponseSale {
	saleId: number;
	dateEvent: string;
	timeEvent: string;
	genre: string;
	imageUrl: string;
	title: string;
	operationNumber: string;
	fullName: string;
	quantity: number;
	saleDate: string;
	total: number;
}
//#endregion
