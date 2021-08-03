import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { ModalDialogParams,ModalDialogService } from "nativescript-angular/modal-dialog";
import * as platform from "tns-core-modules/platform/platform";
import { DatePicker } from 'tns-core-modules/ui/date-picker';

@Component({
	moduleId: module.id,
	selector: 'modaltanggal',
	templateUrl: './modaltanggal.component.html',
	styleUrls: ['./modaltanggal.component.css']
})

export class ModaltanggalComponent {
    date = new Date()
    model: any;
    type: any;

    constructor(private modal: ModalDialogService, private vcRef: ViewContainerRef,private params: ModalDialogParams){
        this.model = {
            year: "",
            month: "",
            day: "",
        }
    }

    onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;

        datePicker.year = this.date.getFullYear();
        datePicker.month = this.date.getMonth() + 1;
        datePicker.day = this.date.getDate();

        datePicker.year = args.value
        datePicker.month = args.value
        datePicker.day = args.value
        datePicker.minDate = new Date(1945, 0, 29);
        datePicker.maxDate = new Date(2045, 0, 29);
    }

    pilih(){
        this.params.closeCallback(this.model);
	}

    onDateChanged(args) {
        // console.log("Date New value: " + args.value);
        // console.log("Date value: " + args.oldValue);
    }

    onDayChanged(args) {
        if (args.value == null) {
            this.model.day = args.oldValue
        }
        else {
            this.model.day = args.value;
        }
    }

    onMonthChanged(args) {
        if (args.value == null) {
            this.model.month = args.oldValue
        }
        else {
            this.model.month = args.value;
        }
    }

    onYearChanged(args) {
        if (args.value == null) {
            this.model.year = args.oldValue
        }
        else {
            this.model.year = args.value;
        }
    }
	getHeight(percentage) {
        return platform.screen.mainScreen.heightDIPs * percentage / 100
    }

    getWidth(percentage) {
        return platform.screen.mainScreen.widthDIPs * percentage / 100
    }
}
