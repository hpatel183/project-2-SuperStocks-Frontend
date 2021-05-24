import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Stock } from 'src/model/Stock';
import { Message } from 'src/model/Message';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  apiURL: string = "http://ec2-54-82-79-227.compute-1.amazonaws.com:8080/SuperStocks/";

  constructor(private httpClient: HttpClient) { }

  getAllStocks(): Observable<Array<Stock>> {

    return this.httpClient.get<Array<Stock>>(`${this.apiURL}stock`, {
      withCredentials: true
    });

  }

  getExistingStock(stockSymbol: string): Observable<Stock> {

    return this.httpClient.get<Stock>(`${this.apiURL}stock/${stockSymbol}`, {
      withCredentials: true
    });

  }

  addStockToPortfolio(stock: Stock): Observable<Stock> {

    let stockTemplate = {
      name: stock.name,
      symbol: stock.symbol,
      exchange: stock.exchange,
      price: stock.price,
      type: stock.type
    }
    
    return this.httpClient.post<Stock>(`${this.apiURL}stock/`, stockTemplate, {
      withCredentials: true
    });

  }

  updatePrice(stock: Stock, price: number): Observable<Stock> {

    let stockTemplate = {
      name: stock.name,
      symbol: stock.symbol,
      exchange: stock.exchange,
      price: price,
      type: stock.type
    }
    console.log("Adding new price for stock:", stockTemplate);
    return this.httpClient.patch<Stock>(`${this.apiURL}stock/${stock.id}`, stockTemplate, {
      withCredentials: true
    });
  }

  deleteStock(id: number) {
    return this.httpClient.delete<Message>(`${this.apiURL}stock/${id}`, {
      withCredentials: true
    })
  }

}
