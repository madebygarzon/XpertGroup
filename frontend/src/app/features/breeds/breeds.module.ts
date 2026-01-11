import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BreedsListComponent } from './breeds-list/breeds-list.component';
import { BreedSearchComponent } from './breed-search/breed-search.component';

@NgModule({
  declarations: [
    BreedsListComponent,
    BreedSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class BreedsModule {}
