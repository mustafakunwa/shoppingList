import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { delay } from 'rxjs/operators';
import { ShoppingItem } from './store/models/shopping-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private url = "http://localhost:3000/shopping"

  constructor(private http: HttpClient) { }

  getShoppingItem() {
    return this.http
      .get<Array<ShoppingItem>>(this.url)
      .pipe(
        delay(500)
      )
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    return this.http
      .post(this.url, shoppingItem)
      .pipe(
        delay(500)
      )
  }

  deleteShoppingItem(id: string) {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(
        delay(500)
      )
  }


}
