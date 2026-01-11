import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { BreedsListComponent } from './features/breeds/breeds-list/breeds-list.component';
import { BreedSearchComponent } from './features/breeds/breed-search/breed-search.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProfileComponent } from './features/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'breeds', component: BreedsListComponent },
  { path: 'search', component: BreedSearchComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
