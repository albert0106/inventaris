import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptFormsModule,
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
