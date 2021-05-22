import { Component, OnInit } from '@angular/core';

import { Stock } from 'src/model/Stock';
import { StockService } from '../services/stock.service';
import { TwelveDataService } from '../services/twelve-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stockService: StockService;
  twelveDataService: TwelveDataService;

  stocks: Stock[] = [];
  stockInput: string;

  constructor(stockService: StockService, twelveDataService: TwelveDataService) {
    this.stockService = stockService;
    this.twelveDataService = twelveDataService;
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
      console.log('Stock already exists in db, adding to user portfolio...', response);
      this.addStockToPortfolio(response);
    }, (err) => {
      console.log("Stock doesn't exist in db, checking API for stock...", err);
      // TwelveData API call with 'err' as stock symbol to find
      this.twelveDataService.getStockBySymbol(err).subscribe((response) => {
        console.log("Found stock from API, retrieving data...",response);
        let newStock = this.filterStocksByUnitedStates(response);
        if (newStock.name != '') {
          this.stocks.push();
          this.addStockToPortfolio(newStock);
        } else {
          alert("Stock not found by API");
        }
      });
    });
  }

  addStockToPortfolio(stockToAdd: Stock) {
    this.stockService.addStockToPortfolio(stockToAdd).subscribe((stock) => {
      this.stocks.push(stock);
    });
  }

  filterStocksByUnitedStates(stocks: Object[]): Stock {
    let obj = {
      id: 0,
      name: '',
      symbol: '',
      exchange: '',
      price: 0,
      type: ''
    };
    stocks["data"].forEach((stock) => {
      if (stock.country == "United States") {
          obj.id = 0,
          obj.name = stock.name,
          obj.symbol = stock.symbol,
          obj.exchange = stock.exchange,
          obj.type = stock.type,
          obj.price = 0
      }
    });
    return obj;
  }

}
