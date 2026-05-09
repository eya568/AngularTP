import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationError, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, RouterModule, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Mes Projets';
  darkMode = signal(false);
  isLoading = signal(false);

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to router events for global loading state
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.isLoading.set(false);
      }
    });
  }

  toggleTheme(): void {
    this.darkMode.update(current => !current);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}