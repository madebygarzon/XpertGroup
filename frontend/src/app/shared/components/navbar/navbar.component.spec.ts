import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { AuthHttpService } from '../../../core/services/auth-http.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthHttpService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthHttpService', [
      'isAuthenticated',
      'getCurrentUser',
      'logout'
    ]);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthHttpService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthHttpService) as jasmine.SpyObj<AuthHttpService>;
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    expect(component.isAuthenticated).toBe(true);
  });

  it('should logout user', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
