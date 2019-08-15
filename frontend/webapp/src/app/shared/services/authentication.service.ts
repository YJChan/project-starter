import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserAuth } from '../../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserAuth>;
    public currentUser: Observable<UserAuth>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserAuth {
        return this.currentUserSubject.value;
    }

    login(loginName: string, password: string) {
        return this.http.post<any>(`http://localhost:4000/api/auth/sign-in`, { loginName, password })
            .pipe(map(resp => {
              if (resp.code === 200) {
                const {loginUser, token, role, userid } = resp.result;
                // login successful if there's a jwt token in the response
                if (loginUser && token && role && userid) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify({
                        loginUser, loginUserId: userid, token, role
                    }));
                    this.currentUserSubject.next(resp.result);
                }

                return loginUser;
              }
            }));
    }

    logout() {
        sessionStorage.clear();
        this.currentUserSubject.next(null);
    }

    clearAuth() {
        sessionStorage.clear();
    }
}
