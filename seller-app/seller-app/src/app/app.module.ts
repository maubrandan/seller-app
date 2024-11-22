import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { CartComponent } from './cart/cart.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminOrderListComponent } from './admin/admin-order-list/admin-order-list.component';
import { AdminOrderDetailComponent } from './admin/admin-order-detail/admin-order-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MenuComponent } from './shared/components/menu/menu.component';

import { AuthService } from './core/services/auth.service';
import { ProductService } from './products/services/product.service';
import { OrderService } from './orders/services/order.service';
import { CartService } from './cart/services/cart.service';
import { AuthGuard } from './core/guards/auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    OrderDetailComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent,
    CartComponent,
    AdminDashboardComponent,
    AdminOrderListComponent,
    AdminOrderDetailComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [AuthService, ProductService, OrderService, CartService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
