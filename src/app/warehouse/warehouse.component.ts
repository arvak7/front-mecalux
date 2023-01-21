import { Component, OnInit, ViewChild } from '@angular/core';
import { Warehouse } from '../shared/models/warehouse.model';
import { WarehouseService } from '../shared/services/warehouse/warehouse.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  displayedColumns: string[] = ['client', 'family', 'size', 'racks', 'actions'];
  dataSource = new MatTableDataSource<Warehouse>([]);

  constructor(private warehouseService: WarehouseService) { }

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
    console.log("Edit: ", element);
    // implementar la lógica de edición aquí
  }

  delete(element: Warehouse) {
    console.log("Delete: ", element);
    // implementar la lógica de eliminación aquí
  }

  create() {
    console.log("Create new warehouse");
    // implementar la lógica de creación aquí
  }



}


