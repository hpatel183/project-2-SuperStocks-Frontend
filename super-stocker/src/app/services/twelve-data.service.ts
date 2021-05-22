import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwelveDataService {


  proxyURL: string = "http://ec2-3-140-201-86.us-east-2.compute.amazonaws.com:8081/";

  key: string = "d256da9eb6394a3f9372bfcb29b6c51d";

  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append("Access-Control-Allow-Origin", "*");
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

}
