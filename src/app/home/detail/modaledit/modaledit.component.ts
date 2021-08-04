import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogOptions, ModalDialogParams, ModalDialogService } from 'nativescript-angular';
import { Page, TextField } from 'tns-core-modules';
import { ModaltanggalComponent } from '../../modaltambahbarang/modaltanggal/modaltanggal.component';
import * as platform from "tns-core-modules/platform/platform";
import { edit_stok } from '~/app/controller/barang';

@Component({
	moduleId: module.id,
	selector: 'modaledit',
	templateUrl: './modaledit.component.html',
	styleUrls: ['./modaledit.component.css']
})

export class ModaleditComponent {
    id_detil;
    id_barang;
    processing = false;
    model: any;
    button = true;

    constructor(private params: ModalDialogParams, private page: Page,
        private _modalService: ModalDialogService, private _vcRef: ViewContainerRef) {
            this.id_detil = params.context.id_detil
            this.id_barang = params.context.id_barang
            this.model = {
                tanggal: "",
            }
        }

    onTap(): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: {},
            fullscreen: false
        };
        this._modalService.showModal(ModaltanggalComponent, options).then((res: any) => {
            if (res != null) {
                console.log(res);
                this.model.tanggal = res.year + "-" + res.month + "-" + res.day;
            }
        });
    }

    public onTextChange(args) {
        let textField = <TextField>args.object;
        console.log("onTextChange : " + textField.text.toString());
        let result = textField.text.toString();

        switch (result) {
            case "":
                this.button = false;
                break;

            case null:
                this.button = false;
                break;

            default:
                if (this.model.tanggal == "" || this.model.tanggal == null) {
                    this.button = false;
                } else {
                    this.button = true;
                }
                break;
        }
    }

    async save() {
        if (this.button == true) {
            this.processing = true

            var barang = await edit_stok(this.id_detil, this.id_barang, this.model.tanggal)

            if (barang != false) {
                this.processing = false;
                this.params.closeCallback(barang.data)
            } else {
                this.processing = false;
                // this.alertDialogService.modal_error(CONTROL_FUNCTION.getErrorStripped3(getError()));
            }
        }
    }

    getHeight(percentage) {
        return platform.screen.mainScreen.heightDIPs * percentage / 100
    }

    getWidth(percentage) {
        return platform.screen.mainScreen.widthDIPs * percentage / 100
    }
}
