import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from 'moment'
import { Router } from '@angular/router';

const jwt = new JwtHelperService()


class DecodedToken {
    userId: string = ''
    username: string = ''
    exp: number = 0
}

@Injectable()


export class AuthService {
    private decodedToken
    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.decodedToken = JSON.parse(JSON.stringify(localStorage.getItem('app-meta'))) || new DecodedToken
    }

    isAuthenticated() {
        return moment().isBefore(moment.unix(this.decodedToken.exp))
    }


    register(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/register', userData)
    }

    login(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/login', userData).pipe(map(
            token => {
                this.decodedToken = jwt.decodeToken(JSON.stringify(token))
                localStorage.setItem('app-auth', JSON.stringify(token))
                localStorage.setItem('app-meta', JSON.stringify(this.decodedToken))

                return token

            }
        ))
    }

    getToken() {
        return localStorage.getItem('app-auth')
        }
        

    logout() {
        localStorage.removeItem('app-auth')
        localStorage.removeItem('app-meta')
        this.decodedToken = new DecodedToken()
        this.router.navigate(['/login'])
    }


}





