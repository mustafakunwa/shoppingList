import { Component, OnInit } from '@angular/core';
import { AppState } from './store/models/app-state.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { ShoppingItem } from './store/models/shopping-item.model';
import { AddItemAction, DeleteItemAction } from './store/actions/shopping.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  shoppinfItems$: Observable<Array<ShoppingItem>>
  newShoppingItem: ShoppingItem = { id: '', name: '' }


  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.shoppinfItems$ = this.store.select(store => store.shopping)
  }

  addItem() {
    this.newShoppingItem.id = uuid();

    this.store.dispatch(new AddItemAction(this.newShoppingItem));

    this.newShoppingItem = { id: '', name: '' };
  }

  deleteItem(id: string) {
    this.store.dispatch(new DeleteItemAction(id));
  }

}
