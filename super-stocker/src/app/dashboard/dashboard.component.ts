import { Component, OnInit } from '@angular/core';

import { Stock } from 'src/model/Stock';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stockService: StockService;

  stocks: Stock[] = [];
  stockInput: string;

  constructor(stockService: StockService) {
    this.stockService = stockService;
  }

  ngOnInit(): void {

    this.getAllStocks();

  }

  getAllStocks(): void {
    this.stockService.getAllStocks().subscribe((response) => {
      this.stocks = [];
      response.forEach((stock) => {
        this.stocks.push(stock);
      });
    });
  }

  addStock(): void {
    this.stockService.getExistingStock(this.stockInput).subscribe((response) => {
      this.stockService.addStockToPortfolio(response).subscribe((stock) => {
        this.stocks.push(stock);
        this.stockInput == "";
      });
    });
  }

}