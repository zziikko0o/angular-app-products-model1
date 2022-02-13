import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsComponent} from "./components/products/products.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ProductAddComponent} from "./components/product-add/product-add.component";
import {ProductEditComponent} from "./components/product-edit/product-edit.component";


const routes: Routes = [
  { path:"products", component:ProductsComponent},
  { path:"newProduct", component:ProductAddComponent},
  { path:"editProduct/:id", component:ProductEditComponent},
  { path:"", component:HomeComponent},


]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
