import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Product } from './../../models/product.model';
import { AuthService } from './../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private cache$: Observable<Product[]> | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener la lista de productos con caché y paginación
  getProducts(page: number = 1, size: number = 10, useCache: boolean = true): Observable<Product[]> {
    if (useCache && this.cache$) {
      return this.cache$;
    }

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    this.cache$ = this.http.get<Product[]>(this.apiUrl, { params }).pipe(
      tap(products => console.log('Fetched products:', products)),
      shareReplay(1),
      catchError(this.handleError)
    );

    return this.cache$;
  }

  // Búsqueda de productos
  searchProducts(query: string): Observable<Product[]> {
    const params = new HttpParams().set('q', query);

    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params }).pipe(
      tap(products => console.log('Searched products:', products)),
      catchError(this.handleError)
    );
  }

  // Obtener un producto por ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      tap(product => console.log('Fetched product:', product)),
      catchError(this.handleError)
    );
  }

  // Crear un nuevo producto con autenticación
  createProduct(product: Product): Observable<Product> {
    return this.authService.isAuthenticated()
      ? this.http.post<Product>(this.apiUrl, product).pipe(
          tap(newProduct => console.log('Created product:', newProduct)),
          catchError(this.handleError)
        )
      : throwError('User not authenticated');
  }

  // Actualizar un producto existente con autenticación
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.authService.isAuthenticated()
      ? this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
          tap(updatedProduct => console.log('Updated product:', updatedProduct)),
          catchError(this.handleError)
        )
      : throwError('User not authenticated');
  }

  // Borrar un producto por ID con autenticación
  deleteProduct(id: number): Observable<void> {
    return this.authService.isAuthenticated()
      ? this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
          tap(() => console.log(`Deleted product with ID: ${id}`)),
          catchError(this.handleError)
        )
      : throwError('User not authenticated');
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente o de la red
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // Filtrar productos por categoría
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.categoryID === categoryId))
    );
  }
}
