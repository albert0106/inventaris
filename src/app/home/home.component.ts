import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as platform from "tns-core-modules/platform/platform";
import { Page } from "tns-core-modules/ui/page";
import { AlertDialogService } from "../controller/alertdialog.service";
import { req_barang } from "../controller/barang";
import { Barang } from "../model/barang";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular";
import { ModaltambahbarangComponent } from "./modaltambahbarang/modaltambahbarang.component";

@Component({
    selector: "Home",
    providers:[ModalDialogService],
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    kirim = true;
    temp;
    data = []

    constructor(private page: Page, private routerExtensions: RouterExtensions,
        private route: ActivatedRoute, private alertDialogService: AlertDialogService,
        private _modalService: ModalDialogService, private _vcRef: ViewContainerRef) {
        this.page.actionBarHidden = true;
        this.route.queryParams.subscribe(params => {
            console.log(params);
            this.temp = JSON.parse(params["gudang"])
        })
        // Use the component constructor to inject providers.
    }

    async ngOnInit() {
        var result = await req_barang(this.temp)
        if (result != false && result.message != "Barang not Listed") {
            var temp = result.data
            var i = 0;
            temp.map((obj => {
                obj['qty'] = 0
                obj['list_id'] = i
                i++
            }))

            console.log(temp);

            this.data = temp
        } else {
            this.alertDialogService.alert("Barang","Data barang tidak ditemukan.");
        }
        // Init your component properties here.
    }

    onTap(): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: { id_gudang : this.temp.id },
            fullscreen: true
        };

        this._modalService.showModal(ModaltambahbarangComponent, options)
            .then((result: any) => {
                console.log(result);
                if (result == true) {
                    this.ngOnInit()
                }
            });
    }

    toDetail(id) {
        console.log(id);

        var dataDetail = this.data[id]
        this.routerExtensions.navigate(['/detail'], {
            queryParams: {
                "id_gudang": this.temp.id,
                "data": JSON.stringify(dataDetail)
            }
        });
        // for (let index = 0; index < this.dataOrder.length; index++) {
        //     if (this.dataOrder[index].id == dataDetail.id) {
        //         dataDetail.qty = this.dataOrder[index].qty
        //     }
        // }

        // let options = {
        //     context: { data: JSON.stringify(dataDetail) },
        //     fullscreen: true,
        //     viewContainerRef: this.vcRef
        // };
        // this.modal.showModal(ModalK24Detail, options).then((res: string) => {
        //     if (res) {
        //         var result = JSON.parse(res)
        //         this.updateOrder(result.id, result.qty)
        //         this.data[id].qty = result.qty
        //     }
        // });
    }

    incdec(category, id, stock) {
        if (category == 0) {
            if (this.data[id].qty > 0) {
                this.data[id].qty -= 1
                // this.updateOrder(id, this.data[id].qty)
            }
        }
        else {
            if (this.data[id].qty >= stock) {
                this.alertDialogService.alert(this.data[id].name, "Sudah melebihi limit Stock.");
                this.data[id].qty = stock;
            }else{
                this.data[id].qty += 1
            }
            // this.updateOrder(id, this.data[id].qty)
        }
    }

    // updateOrder(id, qty) {
    //     var isExists = false
    //     for (let index = 0; index < this.dataOrder.length; index++) {
    //         console.log("this.dataOrder[index].id => " + this.dataOrder[index].id)
    //         console.log("id => " + id)
    //         if (this.dataOrder[index].id == id) {
    //             isExists = true
    //             if (qty > 0) {
    //                 this.dataOrder[index].qty = qty
    //                 this.dataOrder[index].price = this.data[id].price * qty
    //             }
    //             else {
    //                 this.dataOrder.splice(index, 1);
    //             }
    //             break
    //         }
    //     }

    //     if (!isExists) {
    //         this.dataOrder.push({
    //             qty: qty,
    //             name: this.data[id].name,
    //             price: this.data[id].price,
    //             id: id
    //         })
    //     }
    // }

    getHeight(percentage) {
        return platform.screen.mainScreen.heightDIPs * percentage / 100
    }

    getWidth(percentage) {
        return platform.screen.mainScreen.widthDIPs * percentage / 100
    }
}
