import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { delay, map } from 'rxjs/operators';
import { ShoppingItem } from './store/models/shopping-item.model';
import {} from '../../db.json'
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private url = "http://localhost:3000/shopping"

  constructor(private http: HttpClient) { }

  getShoppingItem() {
    // return this.http
    //   .get<Array<ShoppingItem>>(this.url)
    //   .pipe(
    //     delay(500)
    //   )

       return this.http.get<Array<ShoppingItem>>('assets/db.json').pipe(
         map(data =>{
           return data['shopping']
         }),
       );
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    // return this.http
    //   .post(this.url, shoppingItem)
    //   .pipe(
    //     delay(500)
    //   )

     return this.http.get<Array<ShoppingItem>>('assets/db.json').pipe(
         map(data =>{
           data['shopping'].push(shoppingItem)
           return data['shopping']
         }),
       );
  }

  deleteShoppingItem(id: string) {
    // return this.http
    //   .delete(this.url + '/' + id)
    //   .pipe(
    //     delay(500)
    //   )
        return this.http.get<Array<ShoppingItem>>('assets/db.json').pipe(
         map(data =>{
           let index=data['shopping'].findIndex(item=>item.id==id);
           data['shopping'].splice(index,1)
           return data['shopping']
         }),
       );
  }


}
