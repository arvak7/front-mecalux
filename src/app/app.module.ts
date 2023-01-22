import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { RackComponent } from './rack/rack.component';
import { PermutationsComponent } from './permutations/permutations.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { WarehouseNewComponent } from './warehouse/warehouse-new/warehouse-new.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select/';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { WarehouseEditComponent } from './warehouse/warehouse-edit/warehouse-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    WarehouseComponent,
    RackComponent,
    PermutationsComponent,
    NavigationComponent,
    WarehouseNewComponent,
    WarehouseEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
