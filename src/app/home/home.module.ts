import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { ModaltambahbarangComponent } from "./modaltambahbarang/modaltambahbarang.component";
import { ModaltanggalComponent } from "./modaltanggal/modaltanggal.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
    ],
    declarations: [
        HomeComponent,
        ModaltambahbarangComponent,
        ModaltanggalComponent,
    ],
    entryComponents: [
        ModaltambahbarangComponent,
        ModaltanggalComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
