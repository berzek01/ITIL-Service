import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItilService {

  urlMatrix4 = 'assets/json/matrix4x4.json';
  urlRelationship = 'assets/json/matrixGeneral.json';

  constructor(private http: HttpClient) { }

  readLocal(name){
    return JSON.parse(localStorage.getItem(name));
  }
  writeLocal(name,item){
    localStorage.setItem(name,JSON.stringify(item));
  }
  getMatrix4x4() {
    return this.http.get(this.urlMatrix4);
  }
  getMatrixGeneral() {
    return this.http.get(this.urlRelationship);
  }
  
}
