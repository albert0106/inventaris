import { TestBed, inject } from '@angular/core/testing';

import { ModaleditComponent } from './modaledit.component';

describe('a modaledit component', () => {
	let component: ModaleditComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ModaleditComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ModaleditComponent], (ModaleditComponent) => {
		component = ModaleditComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});