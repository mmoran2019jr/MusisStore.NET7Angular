import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DemoService } from './demo.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
	saludo?: string;
	constructor(private _demoService: DemoService) {
		this.saludo = 'Hello AppComponent';
		console.log(this.saludo);
	}

	ngAfterViewInit(): void {
		console.log('ngAfterViewInit AppComponent');
	}

	ngOnInit(): void {
		console.log('ngOnInit AppComponent');
		console.log('***LLAMANDO AL CONTADOR');
		this._demoService.contar();
		console.log('***MOSTRANDO EL VALOR DEL CONTADOR= ', this._demoService.getContador());
	}
}
