import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: {
      'X-RapidAPI-Key': 'cbd74fdc4bmshd49c6be629af31dp1651d8jsn1507edadd21b',
      'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
    },
  };

  getData() {
    return this.http.get(
      'https://mmo-games.p.rapidapi.com/games',
      this.httpOptions
    );
  }
}
