import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogOptions, ModalDialogParams, ModalDialogService } from "nativescript-angular/modal-dialog";
import { Page } from "tns-core-modules/ui/page";
import * as platform from "tns-core-modules/platform/platform";
import { ModaltanggalComponent } from '../../modaltambahbarang/modaltanggal/modaltanggal.component';
import { TextField } from 'tns-core-modules';
import { tambah_stok } from '~/app/controller/barang';

@Component({
	moduleId: module.id,
	selector: 'modaltambahstock',
	templateUrl: './modaltambahstock.component.html',
	styleUrls: ['./modaltambahstock.component.css']
})

export class ModaltambahstockComponent implements OnInit {
    id_gudang;
    id_barang;
    processing = false;
    model: any;
    button = true;

    constructor(private params: ModalDialogParams, private page: Page,
        private _modalService: ModalDialogService, private _vcRef: ViewContainerRef) {
        this.id_gudang = params.context.id_gudang
        this.id_barang = params.context.id_barang
        this.model = {
            stok: "",
            tanggal: "",
        }
    }

	ngOnInit() { }

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
                if (this.model.stok == "" || this.model.stok == null || this.model.tanggal == "" || this.model.tanggal == null) {
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

            let data = {
                id_gudang: this.id_gudang,
                id_barang: this.id_barang,
                stock: this.model.stok,
                expired_date: this.model.tanggal,
            }

            var barang = await tambah_stok(data)

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
