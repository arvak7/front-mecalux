import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermutationsComponent } from './permutations/permutations.component';
import { RackComponent } from './rack/rack.component';
import { WarehouseComponent } from './warehouse/warehouse.component';

const routes: Routes = [
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'racks', component: RackComponent },
  { path: 'permutations', component: PermutationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
