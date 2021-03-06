import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  data;
  dataSource;
  tempcartitems;
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'remove'];

  @ViewChild(MatTable) table: MatTable<any>;

  constructor() { }

  ngOnInit() {
    var existingitems = localStorage.getItem('cartitems');
    console.log('reading from local storage');
    console.log(existingitems);
    this.data = JSON.parse(existingitems);

    this.dataSource = this.data.items;
    console.log(this.dataSource);
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    //return this.dataSource.map(t => t.price).reduce((acc, value) => acc + value, 0);
    let sum: number = 0;
    if (this.dataSource)
      for (let row of this.dataSource) {
        if (row.id != 0) sum += row.quantity*row.price;
      }
    return sum;
  }

  removeAll() {
    this.dataSource.data.length = 0;
    //this.table.renderRows();
  }

  removeAt(index: number) {
    console.log(this.data.items);
    this.data.items.splice(index, 1);
    console.log(this.data.items);
    this.tempcartitems = JSON.stringify(this.data);
    localStorage.setItem('cartitems', this.tempcartitems ); // deleted from local storage by update it
    this.dataSource = this.data.items; // deleted and updated dataSource for table
    this.table.renderRows();
  }

  itemQuantityIncrease(index: number, row) {
    console.log(this.data.items[index].quantity);
    this.data.items[index].quantity += 1;
    console.log(this.data.items[index].quantity);
    this.tempcartitems = JSON.stringify(this.data);
    localStorage.setItem('cartitems', this.tempcartitems ); // deleted from local storage by update it
    this.dataSource = this.data.items; // deleted and updated dataSource for table
    this.table.renderRows();
  }

  itemQuantityDecrease(index: number, row) {
    if(this.data.items[index].quantity <= 1) {
      // if quantity if already 1 remove item
      this.removeAt(index);
    } else {
      // else decrease item quantity
      this.data.items[index].quantity -= 1;
      this.tempcartitems = JSON.stringify(this.data);
      localStorage.setItem('cartitems', this.tempcartitems ); // deleted from local storage by update it
      this.dataSource = this.data.items; // deleted and updated dataSource for table
      this.table.renderRows();
    }
    
  }

}
