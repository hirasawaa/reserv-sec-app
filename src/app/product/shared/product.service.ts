import { Injectable } from "@angular/core"
import { products } from "src/app/products"
import { HttpClient } from '@angular/common/http'; //注意：HttpClientModuleではない！
import { Observable } from 'rxjs';


@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any> {
        return this.http.get('/api/v1/products')
    }
    getProductById(productId: string): Observable<any> {
        return this.http.get('api/v1/products/' + productId)
    }

}

