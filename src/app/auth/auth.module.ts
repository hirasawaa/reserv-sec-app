import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './shared/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/token.interceptor';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }

]

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        // AuthComponent
    ],

    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule
    ],

    providers: [
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }

    ],
    bootstrap: []
})
export class AuthModule { }
