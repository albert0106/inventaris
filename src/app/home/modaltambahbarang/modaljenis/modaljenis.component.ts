import { Component, OnInit } from '@angular/core';
import { get_jenis } from '~/app/controller/barang';
import * as platform from "tns-core-modules/platform/platform";
import { ModalDialogParams } from 'nativescript-angular';

@Component({
	moduleId: module.id,
	selector: 'modaljenis',
	templateUrl: './modaljenis.component.html',
	styleUrls: ['./modaljenis.component.css']
})

export class ModaljenisComponent implements OnInit {
    processing = false;
    data = []

    constructor(private params: ModalDialogParams,) { }

	ngOnInit() {
        this.req_listjenis()
    }

    async req_listjenis() {
        this.processing = true;
        var result = await get_jenis();
        if (result != false) {
            console.log(result.data);

            this.processing = false;
            this.data = result.data
        } else {
            this.processing = false;
        }
    }

    onItemTap(args) {
        this.params.closeCallback(args);
    }

    getHeight(percentage) {
        return platform.screen.mainScreen.heightDIPs * percentage / 100
    }

    getWidth(percentage) {
        return platform.screen.mainScreen.widthDIPs * percentage / 100
    }
}
