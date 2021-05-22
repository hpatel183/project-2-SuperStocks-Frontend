import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Message } from 'src/model/Message';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  proxyUrl: string = "http://ec2-3-140-201-86.us-east-2.compute.amazonaws.com:8081/";

  constructor(private httpClient: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:8080/SuperStocks/current`, {
      withCredentials: true
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`http://localhost:8080/SuperStocks/user`, {
      withCredentials: true
    });
  }

  loginUser(username: string, password: string): Observable<Message> {

    let loginInfo = {
      username: username,
      password: password
    }

    console.log(loginInfo);

    return this.httpClient.post<Message>(`http://localhost:8080/SuperStocks/login`, loginInfo, {
      withCredentials: true
    });

  }

  registerUser(username: string, password: string, email: string, firstName: string, lastName: string, role: string): Observable<Message> {

    let registerInfo = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      role: role
    }

    return this.httpClient.post<Message>(`http://localhost:8080/SuperStocks/register`, registerInfo, {
      withCredentials: true
    });
  }

  updateUserInfo(id: number, username: string, password: string, email: string, firstName: string, lastName: string): Observable<Message> {

    let updateInfo = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName
    }

    console.log("UserInfo", updateInfo);

    return this.httpClient.put<Message>(`http://localhost:8080/SuperStocks/user/${id}`, updateInfo, {
      withCredentials: true
    });

  }

  logoutUser(): Observable<Message> {
    return this.httpClient.post<Message>(`http://localhost:8080/SuperStocks/logout`, {}, {
      withCredentials: true
    });
  }

}
