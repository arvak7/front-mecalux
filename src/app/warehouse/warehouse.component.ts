import { Component, OnInit, ViewChild } from '@angular/core';
import { Warehouse } from '../shared/models/warehouse.model';
import { WarehouseService } from '../shared/services/warehouse/warehouse.service';
import { WarehouseNewComponent } from './warehouse-new/warehouse-new.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NewWarehouse } from './new-warehouse';
import { MatDialog } from '@angular/material/dialog';
import { WarehouseEditComponent } from './warehouse-edit/warehouse-edit.component';
import { RackComponent } from '../rack/rack.component';



@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  
  displayedColumns: string[] = ['client', 'family', 'size', 'racks', 'actions'];
  dataSource = new MatTableDataSource<Warehouse>([]);

  constructor(private warehouseService: WarehouseService, public dialog: MatDialog) { }

  @ViewChild('empTbSort') empTbSort = new MatSort();

  ngOnInit(): void {
    this.warehouseService.fetchAll().subscribe((data: Warehouse[]) => {
      this.dataSource.data = data.map(warehouse => {
        warehouse.rackss = warehouse.racks.map(rack => rack.type).join('');
        return warehouse;
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;
  }

  highlight(row: Warehouse) {
    row.isHighlighted = true;
  }

  unhighlight(row: Warehouse) {
    row.isHighlighted = false;
  }

  edit(element: Warehouse) {    
    const dialogo1 = this.dialog.open(WarehouseEditComponent, {
      data: element
    });
  }

  delete(element: Warehouse) {    
    this.warehouseService.delete(element.uuid).subscribe();
  }

  create() {
    const dialogo1 = this.dialog.open(WarehouseNewComponent, {
      data: new NewWarehouse()
    });
  }

  addRack(element: Warehouse) {    
    const dialogo1 = this.dialog.open(RackComponent, {
      data: element
    });
  }

}


