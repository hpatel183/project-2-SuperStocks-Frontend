import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

  addExistingStock(stockSymbol: string): Observable<Stock> {

    return this.httpClient.get<Stock>(`http://localhost:8080/SuperStocks/stock/${stockSymbol}`, {
      withCredentials: true
    }).pipe(catchError(this.handleError));

  }

  addStockToPortfolio(stock: Stock): Observable<Stock> {

    let stockTemplate = {
      name: stock.name,
      symbol: stock.symbol,
      exchange: stock.exchange,
      price: stock.price,
      type: stock.type
    }
    
    return this.httpClient.post<Stock>(`http://localhost:8080/SuperStocks/stock`, stockTemplate, {
      withCredentials: true
    });

  }

  updatePrice(stock: Stock) {

  }

  deleteStock(id: number) {
    return this.httpClient.delete<Message>(`http://localhost:8080/SuperStocks/stock/${id}`, {
      withCredentials: true
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log("Client-side error", error.error);
    } else {
      if (error.error == "Stock does not exist." && error.status === 400) {
        console.log("TwelveDataAPI call for stock data");
        // if good response, call addStock with stock data
        // if bad response, alert user to bad input
      }
    }
    return throwError("Error in Stock API calls");
  }
}
