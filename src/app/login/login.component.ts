import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { AlertDialogService } from '../controller/alertdialog.service';
import { cek_gudang, req_login } from '../controller/login';
import { User } from '../model/user';
import { ModalGudang } from './modal-gudang/modal-gudang.component';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    isLoggingIn = true;
    user: User;
    processing = false;
    @ViewChild("password", { static: false }) password: ElementRef;

    constructor(private page: Page, private routerExtensions: RouterExtensions,
        private modal: ModalDialogService, private viewContainerRef: ViewContainerRef,
        private alertDialogService: AlertDialogService) {
        this.page.actionBarHidden = true;
        this.user = new User();
        this.user.username = "unang";
        this.user.password = "simple";
    }

    ngOnInit() {
    }

    submit() {
        if (!this.user.username || !this.user.password) {
            this.alertDialogService.alert("", "Isi data terlebih dahulu.");
            return;
        }

        this.processing = true;
        this.login();
    }

    async login() {
        var result = await req_login(this.user);

        if (result != false) {
            if (result.message == "User Detect.") {
                var gudang = await cek_gudang(this.user);
                if (gudang != false){
                    this.processing = false;
                    let options: ModalDialogOptions = {
                        context: { data: gudang.data },
                        fullscreen: false,
                        viewContainerRef: this.viewContainerRef
                    };
                    this.modal.showModal(ModalGudang, options).then((res: any) => {
                        if (res != null) {
                            setTimeout(() => {
                                this.routerExtensions.navigate(['/home'], {
                                    queryParams: {
                                        "gudang": JSON.stringify(res)
                                    },
                                    clearHistory: true
                                });
                            }, 10);
                        }
                    });
                }
                // this.routerExtensions.navigate(['/home'], { clearHistory: true });
            } else {
                this.processing = false;
                this.alertDialogService.alert("Akun", "Akun anda tidak ditemukan.");
            }
        } else {
            this.processing = false;
            this.alertDialogService.alert("Akun", "Akun anda tidak ditemukan.");
        }
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
}
