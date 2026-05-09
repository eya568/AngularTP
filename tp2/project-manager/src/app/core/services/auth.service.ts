import { Injectable, signal } from '@angular/core';

export type UserRole = 'user' | 'admin' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = signal(false);
  private userRole = signal<UserRole>(null);
  private currentUser = signal<{ email: string; role: UserRole } | null>(null);

  constructor() {
    this.checkAuthStatus();
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.userRole() === 'admin';
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser();
  }

  /**
   * Get user role
   */
  getUserRole(): UserRole {
    return this.userRole();
  }

  /**
   * Simulate login
   */
  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate admin login for admin@test.com
        const role: UserRole = email === 'admin@test.com' ? 'admin' : 'user';
        
        this.loggedIn.set(true);
        this.userRole.set(role);
        this.currentUser.set({ email, role });
        
        // Store in localStorage
        localStorage.setItem('authToken', `token_${email}_${Date.now()}`);
        localStorage.setItem('userRole', role);
        
        resolve(true);
      }, 500);
    });
  }

  /**
   * Logout
   */
  logout(): void {
    this.loggedIn.set(false);
    this.userRole.set(null);
    this.currentUser.set(null);
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  }

  /**
   * Check auth status from localStorage
   */
  private checkAuthStatus(): void {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole') as UserRole;
    
    if (token && role) {
      this.loggedIn.set(true);
      this.userRole.set(role);
      // Extract email from token or set a default
      this.currentUser.set({ email: 'user@test.com', role });
    }
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
