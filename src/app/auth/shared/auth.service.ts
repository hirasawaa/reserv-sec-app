import { Injectable } from "@angular/core"
import { products } from "src/app/products"
import { HttpClient } from '@angular/common/http'; //注意：HttpClientModuleではない！
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    register(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/register', userData)
    }
    login(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/login', userData)
    }


}

