import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { ModalDialogParams,ModalDialogService } from "nativescript-angular/modal-dialog";
import * as platform from "tns-core-modules/platform/platform";

@Component({
	moduleId: module.id,
	selector: 'modaltanggal',
	templateUrl: './modaltanggal.component.html',
	styleUrls: ['./modaltanggal.component.css']
})

export class ModaltanggalComponent {
	result=""
    constructor(private modal: ModalDialogService, private vcRef: ViewContainerRef,private params: ModalDialogParams){
    }

    onDateChanged($args){
        var date:Date=$args.value
        this.result=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    }

    close(){
        this.params.closeCallback(this.result);
	}
	// constructor(private params: ModalDialogParams) { }

	
	
	getHeight(percentage) {
        return platform.screen.mainScreen.heightDIPs * percentage / 100
    }

    getWidth(percentage) {
        return platform.screen.mainScreen.widthDIPs * percentage / 100
    }
}