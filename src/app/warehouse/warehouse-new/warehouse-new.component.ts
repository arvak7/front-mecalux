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

@Component({
  selector: 'app-warehouse-new',
  templateUrl: './warehouse-new.component.html',
  styleUrls: ['./warehouse-new.component.css']
})
export class WarehouseNewComponent implements OnInit {

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: NewWarehouse, private familyService: FamilyService,
    public dialogRef: MatDialogRef<WarehouseNewComponent>, private warehouseService: WarehouseService) {      
  }

  ngOnInit(): void {
    this.familyService.fetchAll().subscribe(data => {
      this.families = data;
    });    
  }

  onSubmit() {
    this.errors.required = '';
    console.log('a', this.racks.length)
    console.log('b', this.warehouse.size)
    if (!this.warehouse.client || !this.warehouse.familySelectedValue || this.racks.length > this.warehouse.size) {            
      return this.errors.required = 'error requerido';
    }    
    this.warehouse.family = this.warehouse.familySelectedValue
    this.warehouse.racks = this.racks
    this.warehouseService.save(this.warehouse).subscribe(res => { this.dialogRef.close() });
    return;
  }

  cancel() {
    this.dialogRef.close();
  }

  onFamilySelected() {
    this.racks = [];
    this.familyService.fetchByFamily(this.warehouse.familySelectedValue).subscribe(data => {      
      this.allRacks = data;      
      this.filteredRacks = this.rackCtrl.valueChanges.pipe(
        startWith(null),
        map((rack: string | null) => rack ? this._filter(rack) : this.allRacks.slice()));
    });    
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
