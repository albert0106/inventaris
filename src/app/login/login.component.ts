import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { req_login } from '../controller/login';
import { User } from '../model/user';

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
    @ViewChild("confirmPassword", { static: false }) confirmPassword: ElementRef;

    constructor(private page: Page, private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
        this.user = new User();
        this.user.user = "";
        this.user.password = "";
    }

    ngOnInit() {
    }

    submit() {
        // if (!this.user.user || !this.user.password) {
        //     this.alert("Isi data terlebih dahulu!");
        //     return;
        // }

        this.processing = true;
        this.login();
    }

    async login() {
        // var result = await req_login(this.user);

        // if (result != false) {
        //     console.log(result);

            this.processing = false;
            this.routerExtensions.navigate(['/home'],{clearHistory:true});
        // } else {
        //     this.processing = false;
        //     this.alert("Akun anda tidak ditemukan.");
        // }
        // .then(() => {
        //     this.processing = false;
        //     this.routerExtensions.navigate(["/item"], { clearHistory: true });
        // })
        // .catch(() => {
        //     this.processing = false;
        //     this.alert("Akun anda tidak ditemukan.");
        // });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }

    alert(message: string) {
        return alert({
            title: "INVENTARIS",
            okButtonText: "OK",
            message: message
        });
    }
}
