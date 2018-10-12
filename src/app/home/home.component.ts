import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
  items_in_cart = 0;
  products;
  tempcartitems;
  data = {items: []};
  tempcount = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { // adding the lifecycle hook ngOnInit
    this.http.get('/assets/demodata.json').subscribe(data => {
      console.log(data); // using the HttpClient instance, http to call the API then subscribe to the data and display to console
      this.products =data["products"];
      console.log(this.products);
    });

    // count any existing items in cart in local storage
    
    if (localStorage.getItem("cartitems") === null) {
      this.tempcartitems = JSON.stringify(this.data);
      localStorage.setItem('cartitems', this.tempcartitems );
    } else {
      var existingitems = localStorage.getItem('cartitems');
      this.data = JSON.parse(existingitems);
      this.items_in_cart = this.data.items.length;
      for(var i = 0; i < this.data.items.length; i++) {
        this.tempcount += this.data.items[i].quantity;
        this.items_in_cart = this.tempcount;
      }
    }

  }

  addtocart(event, p) {
    console.log("product added to cart "+ p.id);

    var existingitems = localStorage.getItem('cartitems');
    //console.log(existingitems);
      //if(existingitems==null) {
      if (localStorage.getItem("cartitems") === null) {
        console.log("no previous items in cart");
        //create new item
        this.data.items.push(
          {id: p.id, name: p.name, price: p.price, quantity: 1}
        );
    } else {
        console.log("already exsting item in cart");
        // already exsting item in cart, so add/append items in cart
        this.data.items.push(
          {id: p.id, name: p.name, price: p.price, quantity: 1}
        );

    };
    this.tempcartitems = JSON.stringify(this.data);
    localStorage.setItem('cartitems', this.tempcartitems );

    this.items_in_cart = this.items_in_cart + 1;
  }

}