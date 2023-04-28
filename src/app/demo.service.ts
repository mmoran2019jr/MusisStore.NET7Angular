import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DemoService {
	private contador = 0;
	constructor() {
		console.log('constructor ---- DemoService');
	}

	saludo(): void {
		console.log('HELLO');
	}

	contar(): void {
		this.contador++;
	}

	getContador(): number {
		return this.contador;
	}
}
