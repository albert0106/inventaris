import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { DetailComponent } from "./detail/detail.component";

import { HomeComponent } from "./home.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    // { path: "detail", component: DetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
