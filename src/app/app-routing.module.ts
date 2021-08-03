import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { DetailComponent } from "./home/detail/detail.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    // { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "detail", component: DetailComponent },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
