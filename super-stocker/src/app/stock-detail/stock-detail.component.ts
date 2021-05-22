import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Stock } from '../../model/Stock';
import { StockService } from '../services/stock.service';
import { TwelveDataService } from '../services/twelve-data.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  stock: Stock;

  constructor(private stockService: StockService, private twelveDataService: TwelveDataService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getStock();
  }

  getStock(): void {
    const stockSymbol = this.route.snapshot.paramMap.get("symbol");
    console.log("symbol", stockSymbol);
    this.stockService.getExistingStock(stockSymbol).subscribe((response) => {
      this.stock = response;
    });
  }

  updatePrice(stock: Stock) {
    this.twelveDataService.updateStockPrice(stock.symbol).subscribe((response) => {
      console.log('Got new price, sending value to DB...');
      // call to backend API to update DB
      this.stockService.updatePrice(stock, response["price"]).subscribe((response) => {
        console.log("Stock updated:", response);
        this.stock.price = response.price;
      });
    })
  }

  deleteStock(id: number): void {
    this.stockService.deleteStock(id).subscribe((response) => {
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

}
