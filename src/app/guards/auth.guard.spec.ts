import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthService] 
    });

    // Inyectamos las dependencias
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {

    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(true); 
  });

  it('should return false and navigate to login if user is not authenticated', () => {

    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const navigateSpy = spyOn(guard['router'], 'navigate'); 
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
