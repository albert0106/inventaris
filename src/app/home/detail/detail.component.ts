import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from 'nativescript-angular';
import { Page } from 'tns-core-modules/ui/page';
import { AlertDialogService } from '~/app/controller/alertdialog.service';
import { hapus, req_barang, req_detail_barang } from '~/app/controller/barang';
import * as platform from "tns-core-modules/platform/platform";
import { Menu } from "nativescript-menu";
import { ModaltambahstockComponent } from './modaltambahstock/modaltambahstock.component';
@Component({
	moduleId: module.id,
	selector: 'detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
    id_gudang;
    data;
    data_detail = [];

    constructor(private page: Page, private routerExtensions: RouterExtensions,
        private route: ActivatedRoute, private alertDialogService: AlertDialogService,
        private _modalService: ModalDialogService, private _vcRef: ViewContainerRef) {
            this.page.actionBarHidden = true;
            this.route.queryParams.subscribe(params => {
                console.log(params);
                this.id_gudang = params["id_gudang"]
                this.data = JSON.parse(params['data'])
            })
        }

	async ngOnInit() {
        var result = await req_detail_barang(this.id_gudang,this.data.id)
        if (result != false && result.message != "Barang not Listed") {
            var temp = result.data

            for (const i in temp) {
                var d = new Date(temp[i].created_at * 1000)
                var date;
                var time;
                date = d.toJSON().substring(0, 10).replace(/[-]/g, "/")
                time = d.toTimeString().substring(0, 9)
                temp[i]['date'] = date
                temp[i]['time'] = time
            }
            var j = 0;
            temp.map((obj => {
                obj['list_id'] = j
                j++
            }))
            console.log(temp);
            this.data_detail = temp

        } else {
            this.alertDialogService.alert("Barang", "Data barang tidak ditemukan.");
        }
    }

    onTap(): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: { id_gudang: this.id_gudang, id_barang: this.data.id },
            fullscreen: true
        };

        this._modalService.showModal(ModaltambahstockComponent, options)
            .then((result: any) => {
                console.log(result);
                if (result == true) {
                    this.ngOnInit()
                }
            });
    }

    openPopupMenu(item) {
        let id = item.list_id
        let label = "btn" + id
        console.log(label)
        Menu.popup({
            view: this.page.getViewById(label),
            actions: ["Hapus", "Edit"]
        })
            .then(async value => {
                if (value.title == "Hapus") {
                    var result = await hapus(this.data.id,item.id)
                    if(result != false){
                        this.alertDialogService.alert("HAPUS", "Data sudah terhapus");
                        this.ngOnInit()
                    }
                }
            })
    }

    getHeight(percentage) {
        return platform.screen.mainScreen.heightDIPs * percentage / 100
    }

    getWidth(percentage) {
        return platform.screen.mainScreen.widthDIPs * percentage / 100
    }
}
