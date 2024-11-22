import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Category {
  id: number;
  name: string;
}

interface Order {
  id: number;
  date: string;
  customer: string;
  total: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface Supplier {
  id: number;
  name: string;
  contact: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  categories: Category[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Food' }
  ];

  orders: Order[] = [
    { id: 1, date: '2024-11-10', customer: 'John Doe', total: 99.99 },
    { id: 2, date: '2024-11-11', customer: 'Jane Smith', total: 49.99 }
  ];

  products: Product[] = [
    { id: 1, name: 'Laptop', price: 799.99, stock: 10, category: 'Electronics' },
    { id: 2, name: 'T-Shirt', price: 19.99, stock: 100, category: 'Clothing' }
  ];

  suppliers: Supplier[] = [
    { id: 1, name: 'Tech Supplies Inc.', contact: 'tech@supplies.com' },
    { id: 2, name: 'Fashion Factory', contact: 'fashion@factory.com' }
  ];

  users: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
    { id: 2, name: 'Regular User', email: 'user@example.com', role: 'User' }
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
