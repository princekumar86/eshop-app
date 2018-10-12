import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  data;
  dataSource;
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity'];

  constructor() { }

  ngOnInit() {
    var existingitems = localStorage.getItem('cartitems');
    console.log('reading from local storage');
    console.log(existingitems);
    this.data = JSON.parse(existingitems);

    this.dataSource = this.data.items;
    console.log(this.dataSource);
  }

}
