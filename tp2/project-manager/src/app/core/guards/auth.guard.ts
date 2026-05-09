import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard - Protects authenticated routes
 * Redirects to login if user is not logged in
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Store return URL for redirect after login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

/**
 * AdminGuard - Protects admin routes
 * Only allows access if user is admin
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  // Redirect non-admin users to projects page
  router.navigate(['/projects']);
  return false;
};

/**
 * Interface for components that can check if they have pending changes
 */
export interface CanComponentDeactivate {
  canDeactivate(): boolean | Promise<boolean>;
}

/**
 * PendingChangesGuard - Prevents leaving a component with unsaved changes
 */
export const pendingChangesGuard: CanActivateFn = (route, state) => {
  const component = route.component as unknown as CanComponentDeactivate;
  
  if (component && component.canDeactivate) {
    const canDeactivate = component.canDeactivate();
    
    if (canDeactivate === false) {
      const confirmLeave = window.confirm(
        'Voulez-vous vraiment quitter ? Les modifications non sauvegardées seront perdues.'
      );
      return confirmLeave;
    }
    
    return canDeactivate;
  }
  
  return true;
};
