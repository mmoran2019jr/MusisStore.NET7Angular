import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../../demo.service';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
	constructor(private _demoService: DemoService) {}

	ngOnInit(): void {
		console.log('ngOnInit ContainerComponent');
		console.log('***MOSTRANDO EL VALOR DEL CONTADOR= ', this._demoService.getContador());
	}
}
