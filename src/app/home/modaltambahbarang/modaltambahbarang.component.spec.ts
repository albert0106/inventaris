import { TestBed, inject } from '@angular/core/testing';

import { ModaltambahbarangComponent } from './modaltambahbarang.component';

describe('a modaltambahbarang component', () => {
	let component: ModaltambahbarangComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ModaltambahbarangComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ModaltambahbarangComponent], (ModaltambahbarangComponent) => {
		component = ModaltambahbarangComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});