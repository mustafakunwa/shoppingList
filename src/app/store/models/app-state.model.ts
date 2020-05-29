import { ShoppingItem } from './shopping-item.model';
import { shoppingState } from '../reducers/shopping.reducer';

export interface AppState {
    readonly shopping: shoppingState
}