import { Injectable } from '@angular/core';
import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from '@angular/router';

interface CachedRoute {
  handle: DetachedRouteHandle;
  timestamp: number;
  path: string;
}

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private cachedRoutes: Map<string, CachedRoute> = new Map();
  private readonly CACHE_TIMEOUT = 10 * 60 * 1000; // 10 minutes
  private readonly MAX_CACHE_SIZE = 10;

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Cache routes for task details to preserve their state
    return this.isTaskRoute(route) || this.isProjectBoardRoute(route);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (!handle || !this.shouldDetach(route)) {
      return;
    }

    const routePath = this.getRoutePath(route);
    
    // Clean up old cache if size exceeds limit
    if (this.cachedRoutes.size >= this.MAX_CACHE_SIZE) {
      this.clearOldestCache();
    }

    this.cachedRoutes.set(routePath, {
      handle,
      timestamp: Date.now(),
      path: routePath
    });
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const routePath = this.getRoutePath(route);
    const cached = this.cachedRoutes.get(routePath);

    if (!cached) {
      return false;
    }

    // Check if cache has expired
    const isExpired = Date.now() - cached.timestamp > this.CACHE_TIMEOUT;
    
    if (isExpired) {
      this.cachedRoutes.delete(routePath);
      return false;
    }

    return true;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const routePath = this.getRoutePath(route);
    const cached = this.cachedRoutes.get(routePath);
    
    if (!cached) {
      return null;
    }

    // Update timestamp on retrieval (refresh cache)
    cached.timestamp = Date.now();
    return cached.handle;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    // Always reuse route if parameters haven't changed
    return future.routeConfig === curr.routeConfig;
  }

  /**
   * Check if route is for task details
   */
  private isTaskRoute(route: ActivatedRouteSnapshot): boolean {
    return route.component?.name === 'TaskDetailComponent' ||
           route.url.some(segment => segment.path.includes('task'));
  }

  /**
   * Check if route is for project board
   */
  private isProjectBoardRoute(route: ActivatedRouteSnapshot): boolean {
    return route.component?.name === 'ProjectBoardComponent' ||
           route.url.some(segment => segment.path === 'board');
  }

  /**
   * Get unique path for the route
   */
  private getRoutePath(route: ActivatedRouteSnapshot): string {
    let path = '';
    let snapshot = route;

    while (snapshot) {
      path = `${snapshot.url.map(s => s.path).join('/')}/${path}`;
      snapshot = snapshot.firstChild!;
    }

    // Include route parameters in the path
    const params = route.params;
    if (Object.keys(params).length > 0) {
      path += '?' + Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join('&');
    }

    return path;
  }

  /**
   * Clear the oldest cached route
   */
  private clearOldestCache(): void {
    let oldestKey = '';
    let oldestTime = Infinity;

    this.cachedRoutes.forEach((value, key) => {
      if (value.timestamp < oldestTime) {
        oldestTime = value.timestamp;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      this.cachedRoutes.delete(oldestKey);
    }
  }

  /**
   * Clear all cache
   */
  clearCache(): void {
    this.cachedRoutes.clear();
  }

  /**
   * Clear specific route from cache
   */
  clearRoute(path: string): void {
    this.cachedRoutes.delete(path);
  }
}
