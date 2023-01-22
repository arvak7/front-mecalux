import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Warehouse } from 'src/app/shared/models/warehouse.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewWarehouse } from '../new-warehouse';
import { FamilyService } from 'src/app/shared/services/family/family.service';
import { WarehouseService } from 'src/app/shared/services/warehouse/warehouse.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Rack } from 'src/app/shared/models/rack.model';


@Component({
  selector: 'app-warehouse-edit',
  templateUrl: './warehouse-edit.component.html',
  styleUrls: ['./warehouse-edit.component.css']
})
export class WarehouseEditComponent implements OnInit {


  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  rackCtrl = new FormControl();
  filteredRacks: Observable<string[]>;
  racks: string[] = [];
  allRacks: string[] = [];

  @ViewChild('rackInput') rackInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  colorCreate = "primary";
  colorCancel = "primary";

  families: string[] = [];
  errors = { required: '' };

  warehouse = {
    id: 0,
    client: '',
    uuid: '',
    family: '',
    familySelectedValue: '',
    rackSelectedValue: '',
    size: 1,
    racks: [],
    rackss: '',
    isHighlighted: false

  } as Warehouse

  constructor(@Inject(MAT_DIALOG_DATA) public data: Warehouse, private familyService: FamilyService,
    public dialogRef: MatDialogRef<WarehouseEditComponent>, private warehouseService: WarehouseService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.warehouse)
    console.log('ngOnInit', this.data)
    this.warehouse = this.data;
    this.warehouse.familySelectedValue = this.data.family;     
    this.familyService.fetchAll().subscribe(data => {
      this.families = data;
    });   
    this.onFamilySelected()  
    this.racks = this.data.racks.map(r => r.type);
  }
  

  onSubmit() {
    this.errors.required = '';
    if (!this.warehouse.client || !this.warehouse.familySelectedValue || this.racks.length > this.warehouse.size) {
      return this.errors.required = 'error requerido';
    }
    this.warehouse.family = this.warehouse.familySelectedValue
    this.warehouse.racks = this.racks;
    this.warehouseService.update(this.warehouse).subscribe(res => { this.dialogRef.close() });
    return;
  }

  cancel() {
    this.dialogRef.close();
  }

  async onFamilySelected() {
    try {
      this.racks = [];
      this.allRacks = await this.familyService.fetchByFamily(this.warehouse.familySelectedValue);
      this.filteredRacks = this.rackCtrl.valueChanges.pipe(
        startWith(null),
        map((rack: string | null) => rack ? this._filter(rack) : this.allRacks.slice()));
    
  } catch(error) {
    console.log(error);
  }  
}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.racks.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.rackCtrl.setValue(null);
  }

  remove(rack: string): void {
    const index = this.racks.indexOf(rack);

    if (index >= 0) {
      this.racks.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.racks.push(event.option.viewValue);
    this.rackInput.nativeElement.value = '';
    this.rackCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRacks.filter(rack => rack.toLowerCase().indexOf(filterValue) === 0);
  }


}
