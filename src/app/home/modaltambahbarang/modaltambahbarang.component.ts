import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import * as platform from "tns-core-modules/platform/platform";
import { Page } from "tns-core-modules/ui/page";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular";
import { ModaltanggalComponent } from './modaltanggal/modaltanggal.component';
import { TextField } from 'tns-core-modules';
import { ModaljenisComponent } from './modaljenis/modaljenis.component';
import { tambah_barang } from '~/app/controller/barang';


@Component({
	moduleId: module.id,
	selector: 'modaltambahbarang',
	templateUrl: './modaltambahbarang.component.html',
	styleUrls: ['./modaltambahbarang.component.css']
})

export class ModaltambahbarangComponent implements OnInit {
    id_gudang;
    processing = false;
    model: any;
    button = true;

	constructor(private params: ModalDialogParams, private page: Page,
		private _modalService: ModalDialogService,private _vcRef : ViewContainerRef) {
			this.page.actionBarHidden = true;
            this.id_gudang = params.context.id_gudang
            this.model = {
                nama_barang: "",
                stok: "",
                tanggal: "",
                jenis:"",
                price:"",
                id_jenis:0,
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

    onTapJenis(): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: {},
            fullscreen: false
        };
        this._modalService.showModal(ModaljenisComponent, options).then((res: any) => {
            if (res != null) {
                console.log(res);
                this.model.jenis = res.name
                this.model.id_jenis = res.id
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
                if (this.model.nama_barang == "" || this.model.nama_barang == null || this.model.jenis == "" || this.model.jenis == null
                    || this.model.stok == "" || this.model.stok == null || this.model.tanggal == "" || this.model.tanggal == null
                    || this.model.price == "" || this.model.price == null) {
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
                name: this.model.nama_barang,
                id_gudang: this.id_gudang,
                stock: this.model.stok,
                price: this.model.price,
                id_jenis_barang: this.model.id_jenis,
                expired_date : this.model.tanggal,
            }

            var barang = await tambah_barang(data)

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
