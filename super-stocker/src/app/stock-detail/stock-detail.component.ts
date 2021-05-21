import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Stock } from '../../model/Stock';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  stock: Stock;

  constructor(private route: ActivatedRoute, private stockService: StockService, private location: Location) { }

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

  updatePrice() {
    // API call to update price
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
