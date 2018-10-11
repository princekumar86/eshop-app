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

  constructor(private http: HttpClient) { }

  ngOnInit(): void { // adding the lifecycle hook ngOnInit
    this.http.get('/assets/demodata.json').subscribe(data => {
      console.log(data); // using the HttpClient instance, http to call the API then subscribe to the data and display to console
      this.products =data["products"];
      console.log(this.products);
    });
  }

  addtocart(event, id) {
    console.log("product added to cart "+ id);
    this.items_in_cart = this.items_in_cart + 1;
  }

}