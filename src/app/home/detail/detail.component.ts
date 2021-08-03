import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular';
import { Page } from 'tns-core-modules/ui/page';
import { AlertDialogService } from '~/app/controller/alertdialog.service';
import { req_barang } from '~/app/controller/barang';

@Component({
	moduleId: module.id,
	selector: 'detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
    id_gudang;
    data = []
    data_detail = [];

    constructor(private page: Page, private routerExtensions: RouterExtensions,
        private route: ActivatedRoute, private alertDialogService: AlertDialogService) {
            this.page.actionBarHidden = true;
            this.route.queryParams.subscribe(params => {
                console.log(params);
                this.id_gudang = params["id_gudang"]
            })
        }

	async ngOnInit() {
        var result = await req_barang(this.id_gudang)
        if (result != false && result.message != "Barang not Listed") {
            var temp = result.data
            var i = 0;
            temp.map((obj => {
                obj['list_id'] = i
                i++
            }))

            console.log(temp);

            this.data = temp
        } else {
            this.alertDialogService.alert("Barang", "Data barang tidak ditemukan.");
        }
    }
}
