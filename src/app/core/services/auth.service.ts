import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../models/login.dto';
import { environment } from '../../../environments/environment';
import { Auth, UserCredential, signInWithPopup, GoogleAuthProvider} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth= inject(Auth)
  private http = inject(HttpClient);
  private tokenKey = 'token';

  login(data: LoginDTO): Observable<any> {
    return this.http.post(`${environment.apiUrl}users/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}users/signup`, data);
  }

  logout(): void {
    this._cachedUser = null;
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
  }

  saveToken(token: string, remember: boolean = true): void {
    if (remember) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      sessionStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private _cachedUser: any | null = null;
  getUserFromToken(): any {
    if (this._cachedUser) return this._cachedUser;

    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this._cachedUser = payload;
      return payload;
    } catch (e) {
      console.error('Invalid token format', e);
      return null;
    }
  }

  loginWithGoogle(): Promise<Observable<any>> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(async (result: UserCredential) => {
      const idToken = await result.user.getIdToken();

    return this.http.post(`${environment.apiUrl}users/google-login`, { idToken });
    });
  }

  // ______ Profile methods ___________
  getProfile(): Observable<any> {
    return this.http.get(`${environment.apiUrl}users/profile`);
  }

  updateProfile(data: { name?: string; currentPassword?: string; newPassword?: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}users/profile`, data);
  }

}
