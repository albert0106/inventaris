import { Injectable, ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular";
import { confirm } from "tns-core-modules/ui/dialogs";

Injectable()
export class AlertDialogService {

    vcRef: ViewContainerRef;

    constructor(private modal: ModalDialogService,) {
    }
    /**
     * Method for showing alert dialog, to close application
     * */
    public alert(txtTitle, txtMessage) {
        let options = {
            title: txtTitle,
            message: txtMessage,
            okButtonText: "OK",
            cancelable: false
        };

        confirm(options).then(() => {
            console.log("Dialog closed!");
        });
    }

    public alert2(txtTitle, txtMessage) {
        let options = {
            title: txtTitle,
            message: txtMessage,
            okButtonText: "YAKIN?",
            neutralButtonText: "BELUM",
            cancelable: false
        };

        confirm(options).then((result) => {
            if (result == true) {
            } else {
                console.log("belum transfer!");
            }
        });
    }

}
