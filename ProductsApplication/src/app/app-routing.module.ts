import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { AddproductcategoriesComponent } from './components/addproductcategories/addproductcategories.component';
import { GetallproductsComponent } from './components/getallproducts/getallproducts.component';

const routes: Routes = [
  { path:'register', component: RegisterComponent, data:{ title:'Sign Up' } },
  { path: 'login', component: LoginComponent, data:{ title:'Sign In' } },
  { path: 'addProducts', component: AddproductsComponent, data:{ title:'Add Product' } },
  { path: 'addProductCategories', component: AddproductcategoriesComponent, data:{ title: 'Add Product Category'}},
  { path: 'getallproducts', component: GetallproductsComponent, data: { title: 'Get All Products'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

