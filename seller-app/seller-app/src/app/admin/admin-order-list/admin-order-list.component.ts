import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Order {
  id: number;
  customer: string;
  date: string;
  total: number;
  status: string;
}

@Component({
  selector: 'admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'customer', 'date', 'total', 'status', 'actions'];
  dataSource = new MatTableDataSource<Order>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  orders: Order[] = [
    { id: 1, customer: 'John Doe', date: '2024-11-10', total: 99.99, status: 'Completed' },
    { id: 2, customer: 'Jane Smith', date: '2024-11-11', total: 49.99, status: 'Pending' },
    // Añade más órdenes según sea necesario
  ];

  ngOnInit() {
    this.dataSource.data = this.orders;
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
