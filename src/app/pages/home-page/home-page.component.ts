import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { PATH_BUY_PAGES } from '../../commons/config/path-pages';
import { ICardEvent } from '../../commons/models/components.interface';
import { DemoCorsService } from '../../commons/services/api/demo-cors/demo-cors.service';
import { IHomeGenres } from '../../commons/services/api/home/home-api.interface';
import { HomeApiService } from '../../commons/services/api/home/home-api.service';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';

@Component({
	standalone: true,
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	imports: [SharedFormCompleteModule, CardEventComponent]
})
export class HomePageComponent implements OnInit {
	@ViewChild('cardDummy') cardDummy?: CardEventComponent;

	private _homeApiService = inject(HomeApiService);
	private _router = inject(Router);
	private _demoCorsService = inject(DemoCorsService);

	listConcerts: ICardEvent[] = [];
	listGenres: IHomeGenres[] = [];

	cardEventDummy: ICardEvent = {
		date: '20/03/2023',
		description: 'xxxx',
		genre: 'ROCK',
		place: 'ccccc',
		hour: '22:00',
		idEvent: 1,
		price: 200,
		title: 'ESTO ES UN DEMO',
		urlImage: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
	};

	ngOnInit(): void {
		this._loadHome();

		this._demoCorsService.getGreeting().subscribe();
	}

	clickCard(event: ICardEvent): void {
		this._router.navigate([PATH_BUY_PAGES.buyPage.withSlash], { state: { event } });
	}

	private _loadHome() {
		this._homeApiService.getHome().subscribe((response) => {
			this.listGenres = response.genres;
			this.listConcerts = response.getDataCardEvent();
		});
	}
}
