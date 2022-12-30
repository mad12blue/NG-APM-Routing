import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProductListResolved } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolver implements Resolve<ProductListResolved> {

  constructor(private productService: ProductService) { }

  resolve(): Observable<ProductListResolved> {
    return this.productService.getProducts()
      .pipe(
        map(products => ({ products, error: '' })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ products: null, error: message });
        })
      );
  }
}