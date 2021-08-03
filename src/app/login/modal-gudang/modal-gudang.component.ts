import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';

@Component({
	moduleId: module.id,
	templateUrl: './modal-gudang.component.html',
	styleUrls: ['./modal-gudang.component.css']
})

export class ModalGudang implements OnInit {
    data = [];
    constructor(private params: ModalDialogParams,) {
        this.data = params.context.data;
        console.log(this.data);

    }

	ngOnInit() { }

    onItemTap(args) {
        this.params.closeCallback(this.data[args.index]);
    }

    close() {
        this.params.closeCallback();
    }
}
