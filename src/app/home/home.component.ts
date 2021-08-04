import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as platform from "tns-core-modules/platform/platform";
import { Page } from "tns-core-modules/ui/page";
import { AlertDialogService } from "../controller/alertdialog.service";
import { kirim_konter, req_barang } from "../controller/barang";
import { Barang } from "../model/barang";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular";
import { ModaltambahbarangComponent } from "./modaltambahbarang/modaltambahbarang.component";
import { confirm } from "tns-core-modules/ui/dialogs";
import { ScrollEventData } from "tns-core-modules";

@Component({
    selector: "Home",
    providers:[ModalDialogService],
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    isKirim = false;
    order = true;
    temp;
    data = []
    dataOrder = []
    data_kirim= []
    direction;
    scrollY;
    processing = false;

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
        this.processing = true;
        var result = await req_barang(this.temp)
        if (result != false && result.message != "Barang not Listed") {
            this.processing = false
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
            this.processing = false
            this.alertDialogService.alert("Barang","Data barang tidak ditemukan.");
        }
        // Init your component properties here.
    }

    onScroll(args: ScrollEventData) {
        this.scrollY = args.scrollY;
    }

    onSwipe(args) {
        this.direction = args.direction;
        console.log("=======Swipe Direction=======" + this.direction);
        console.log("=======scrollY=======" + this.scrollY);
        if (this.scrollY == undefined && this.direction == 8) {
            this.processing = true
            this.ngOnInit();
        } else if (this.scrollY == 0 && this.direction == 8){
            this.processing = true
            this.ngOnInit();
        }

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
    }

    incdec(category, id, stock) {
        if (category == 0) {
            if (this.data[id].qty > 0) {
                this.data[id].qty -= 1
                this.updateOrder(id, this.data[id].qty)
            }
        }
        else {
            if (this.data[id].qty >= stock) {
                this.alertDialogService.alert(this.data[id].name, "Sudah melebihi limit Stock.");
                this.data[id].qty = stock;
            }else{
                this.data[id].qty += 1
                this.updateOrder(id, this.data[id].qty)
            }
        }
    }

    kirim(){
        if(this.isKirim == false){
            this.order = false;
            this.isKirim = true;
        }else{
            this.alert2("KIRIM","Apakah anda yakin akan mengirim stok ini?")
        }
    }

    batal(){
        this.isKirim=false;
        this.order=true;
    }

    updateOrder(list_id, qty) {
        var isExists = false
        for (let index = 0; index < this.dataOrder.length; index++) {
            console.log("this.dataOrder[index].id => " + this.dataOrder[index].id)
            console.log("id => " + list_id)
            console.log("data => " + JSON.stringify(this.dataOrder))
            if (this.dataOrder[index].list_id == list_id) {
                console.log("masuk");
                isExists = true
                if (qty > 0) {
                    this.dataOrder[index].qty = qty
                    this.data_kirim[index].qty = qty
                    this.dataOrder[index].price = this.data[list_id].price * qty
                }
                else {
                    this.dataOrder.splice(index, 1);
                    this.data_kirim.splice(index, 1);
                }
                break
            }
        }

        if (!isExists) {
            this.dataOrder.push({
                qty: qty,
                name: this.data[list_id].name,
                price: this.data[list_id].price,
                id_barang: this.data[list_id].id,
                list_id: list_id,
                stock: this.data[list_id].stock
            })
            this.data_kirim.push({
                qty: qty,
                id_barang: this.data[list_id].id,
                stock: this.data[list_id].stock
            })

            console.log("data !isExist => " + JSON.stringify(this.dataOrder))
        }
    }

    getHeight(percentage) {
        return platform.screen.mainScreen.heightDIPs * percentage / 100
    }

    getWidth(percentage) {
        return platform.screen.mainScreen.widthDIPs * percentage / 100
    }

    public alert2(txtTitle, txtMessage) {
        let options = {
            title: txtTitle,
            message: txtMessage,
            okButtonText: "YAKIN?",
            neutralButtonText: "BELUM",
            cancelable: false
        };

        confirm(options).then(async (result) => {
            if (result == true) {
                var kirim = await kirim_konter(this.data_kirim)
                if (kirim != false) {
                    var res = kirim.data
                    // if (res == true) {
                        this.alertDialogService.alert("KIRIM", "Barang sudah dikirim ke konter")
                    // }
                } else {
                    this.alertDialogService.alert("KIRIM", "Barang gagal dikirim ke konter")
                }
            } else {
                console.log("belum transfer!");
            }
        });
    }
}
