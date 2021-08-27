import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItilService {

  constructor() { }

  readLocal(name){
    return JSON.parse(localStorage.getItem(name));
  }
  writeLocal(name,item){
    localStorage.setItem(name,JSON.stringify(item));
  }
  
}
