import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import * as platform from "tns-core-modules/platform/platform";
import { Page } from "tns-core-modules/ui/page";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular";
import { ModaltanggalComponent } from '../modaltanggal/modaltanggal.component';


@Component({
	moduleId: module.id,
	providers:[ModalDialogService],
	selector: 'modaltambahbarang',
	templateUrl: './modaltambahbarang.component.html',
	styleUrls: ['./modaltambahbarang.component.css']
})

export class ModaltambahbarangComponent implements OnInit {

	constructor(private params: ModalDialogParams, private page: Page,
		private _modalService: ModalDialogService,private _vcRef : ViewContainerRef) { 
			this.page.actionBarHidden = true;
		}

	ngOnInit() { }

	onTap(): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: {},
            fullscreen: false
        };

        this._modalService.showModal(ModaltanggalComponent, options)
            .then((result: string) => {
                console.log(result);
            });
    }

	getHeight(percentage) {
        return platform.screen.mainScreen.heightDIPs * percentage / 100
    }

    getWidth(percentage) {
        return platform.screen.mainScreen.widthDIPs * percentage / 100
    }
}