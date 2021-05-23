import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

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

  lineChartData: ChartDataSets[] = [
    { data: [], label: "No interval selected"}
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private stockService: StockService, private twelveDataService: TwelveDataService, private route: ActivatedRoute, private location: Location,
    private router: Router) { }

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
    if (stock.price >= 0) {
      this.twelveDataService.updateStockPrice(stock.symbol).subscribe((response) => {
        console.log('Got new price, sending value to DB...');
        // call to backend API to update DB
        if (response["price"] >= 0) {
          this.stockService.updatePrice(stock, response["price"]).subscribe((response) => {
            console.log("Stock updated:", response);
            this.stock.price = response.price;
          }, (err) => {
            console.log("API update request failed...", err);
          });
        } else {
          alert("Too many requests. Try again in a minute.");
        }
      })
    } else {
      alert("Something went wrong with that stock. Try removing it and adding it back again.");
    }
  }

  deleteStock(id: number): void {
    this.stockService.deleteStock(id).subscribe((response) => {
      this.router.navigate(["/dashboard"]);
    });
  }

  getTimeSeries(symbol: string, interval: string, size: number): void {
    this.twelveDataService.getTimeSeriesData(symbol, interval, size).subscribe((response) => {
      if (response["code"] !== 429) {
        console.log("Time Series", response);
        this.generateChartData(response, symbol, size);
      } else {
        alert("Too many requests. Try again in a minute");
      }
    });
  }

  generateChartData(data: Object, interval: string, size: number) {
    let actualData = data["values"];
    let chartData: ChartDataSets[] = [];
    let chartLabels: Label[] = [];
    
    let closingDataSet: ChartDataSets = {};
    let closingValues: number[] = [];
    let closingDataLabel: string = "Closing price";

    for (let idx in actualData) {
      chartLabels.push(actualData[idx].datetime);
      closingValues.push(actualData[idx].close);
    }
    closingDataSet.data = closingValues;
    closingDataSet.label = closingDataLabel;

    chartData.push(closingDataSet);

    this.lineChartData = chartData.reverse();
    this.lineChartLabels = chartLabels.reverse();
    
  }

}
