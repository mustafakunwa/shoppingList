import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { LoadShoppingAction, ShoppingActionTypes, LoadShoppingSuccessAction, LoadShoppingFailureAction, DeleteItemSuccessAction, AddItemFailureAction, DeleteItemAction, AddItemSuccessAction, AddItemAction, DeleteItemFailureAction } from '../actions/shopping.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ShoppingService } from 'src/app/shopping.service';
import { of } from 'rxjs';

@Injectable()

export class ShoopingEffect {

    @Effect() loadShopping$ = this.actions$
        .pipe(
            ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
            mergeMap(
                () => this.shoppingService.getShoppingItem()
                    .pipe(
                        map(data => new LoadShoppingSuccessAction(data)),
                        catchError(
                            err =>
                                of(new LoadShoppingFailureAction(err))
                        )
                    )
            ),
        )

    @Effect() addShoppingItem$ = this.actions$
        .pipe(
            ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
            mergeMap(
                (data) => this.shoppingService.addShoppingItem(data.payload)
                    .pipe(
                        map(() => new AddItemSuccessAction(data.payload)),
                        catchError(error => of(new AddItemFailureAction(error)))
                    )
            )
        )

    @Effect() deleteShoppingItem$ = this.actions$
        .pipe(
            ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
            mergeMap(
                (data) => this.shoppingService.deleteShoppingItem(data.payload)
                    .pipe(
                        map(() => new DeleteItemSuccessAction(data.payload)),
                        catchError(error => of(new DeleteItemFailureAction(error)))
                    )
            )
        )
    constructor(private actions$: Actions,
        private shoppingService: ShoppingService) {

    }
}