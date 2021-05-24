import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwelveDataService {

  key: string = "d256da9eb6394a3f9372bfcb29b6c51d";
  key2: string = "352427c6c009470dbdf810898b026801";

  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getStockBySymbol(symbol: string): Observable<Object[]> {
    let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin", "*");

    return this.httpClient.get<Object[]>(`https://api.twelvedata.com/stocks?symbol=${symbol.toUpperCase()}`, {
      headers: headers
    });
  }

  updateStockPrice(symbol: string): Observable<Object> {
    let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin", "*");

    return this.httpClient.get<Object>(`https://api.twelvedata.com/price?symbol=${symbol.toUpperCase()}&apikey=${this.key}`, {
      headers: headers
    });
  }

  getTimeSeriesData(symbol: string, interval: string, size: number): Observable<Object> {
    let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin", "*");

    return this.httpClient.get<Object>(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=${size}&apikey=${this.key2}`, {
      headers: headers
    });
  }

}
