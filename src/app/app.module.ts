import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AlertDialogService } from "./controller/alertdialog.service";
import { DetailComponent } from "./home/detail/detail.component";
import { LoginComponent } from "./login/login.component";
import { ModalGudang } from "./login/modal-gudang/modal-gudang.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptFormsModule,
        NativeScriptModule,
        AppRoutingModule
    ],
    entryComponents: [
        ModalGudang
    ],
    declarations: [
        ModalGudang,
        AppComponent,
        LoginComponent,
        DetailComponent,
    ],
    providers: [
        AlertDialogService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
