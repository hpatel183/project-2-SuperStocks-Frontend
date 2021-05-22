import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Stock } from 'src/model/Stock';
import { Message } from 'src/model/Message';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  proxyUrl: string = "http://ec2-3-140-201-86.us-east-2.compute.amazonaws.com:8081/";

  constructor(private httpClient: HttpClient) { }

  getAllStocks(): Observable<Array<Stock>> {

    return this.httpClient.get<Array<Stock>>(`http://localhost:8080/SuperStocks/stock`, {
      withCredentials: true
    });

  }

  getExistingStock(stockSymbol: string): Observable<Stock> {

    return this.httpClient.get<Stock>(`http://localhost:8080/SuperStocks/stock/${stockSymbol}`, {
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
    
    return this.httpClient.post<Stock>(`http://localhost:8080/SuperStocks/stock/`, stockTemplate, {
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
    return this.httpClient.patch<Stock>(`http://localhost:8080/SuperStocks/stock/${stock.id}`, stockTemplate, {
      withCredentials: true
    });
  }

  deleteStock(id: number) {
    return this.httpClient.delete<Message>(`http://localhost:8080/SuperStocks/stock/${id}`, {
      withCredentials: true
    })
  }

}
