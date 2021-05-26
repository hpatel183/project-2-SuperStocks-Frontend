import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Message } from 'src/model/Message';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL: string = "http://ec2-54-82-79-227.compute-1.amazonaws.com:8080/SuperStocks/";

  constructor(private httpClient: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiURL}current`, {
      withCredentials: true
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiURL}user`, {
      withCredentials: true
    });
  }

  loginUser(username: string, password: string): Observable<Message> {

    let loginInfo = {
      username: username,
      password: password
    }

    return this.httpClient.post<Message>(`${this.apiURL}login`, loginInfo, {
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

    return this.httpClient.post<Message>(`${this.apiURL}register`, registerInfo, {
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

    return this.httpClient.put<Message>(`${this.apiURL}user/${id}`, updateInfo, {
      withCredentials: true
    });

  }

  updateUserInfoByAdmin(id: number, username: string, password: string, email: string, firstName: string, lastName: string): Observable<Message> {

    let updateInfo = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName
    }

    return this.httpClient.put<Message>(`${this.apiURL}admin/user/${id}`, updateInfo, {
      withCredentials: true
    });

  }

  logoutUser(): Observable<Message> {
    return this.httpClient.post<Message>(`${this.apiURL}logout`, {}, {
      withCredentials: true
    });
  }

}
