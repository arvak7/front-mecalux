import { Component, OnInit, Inject } from '@angular/core';
import { Warehouse } from 'src/app/shared/models/warehouse.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FamilyService } from 'src/app/shared/services/family/family.service';
import { Rack } from 'src/app/shared/models/rack.model';
import { RackService } from '../shared/services/rack/rack.service';




@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.css']
})
export class RackComponent implements OnInit {

  
  allRacks: string[] = [];

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


  newRack = {
    type: '',
    warehouse_id: 0
  } as Rack;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Warehouse, private familyService: FamilyService,
    public dialogRef: MatDialogRef<RackComponent>, private rackService: RackService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.warehouse)
    console.log('ngOnInit', this.data)
    
    this.warehouse = this.data;    
    this.familyService.fetchAll().subscribe(data => {
      this.families = data;
    });   
    this.warehouse.familySelectedValue = this.data.family;     
    //this.racks = this.data.racks.map(r => r.type);
    this.onFamilySelected()      
  }
  

  onSubmit() {
    this.errors.required = ''; 
    if (!this.warehouse.client || !this.warehouse.familySelectedValue || this.warehouse.racks.length + 1 > this.warehouse.size) {            
      return this.errors.required = 'error requerido';
    }
    this.warehouse.family = this.warehouse.familySelectedValue
    this.newRack.warehouse_id = this.warehouse.id;    
    this.rackService.save(this.newRack).subscribe();
    this.dialogRef.close();
    return;
  }

  cancel() {
    this.dialogRef.close();
  }

  async onFamilySelected() {
    try {         
      if (this.warehouse.familySelectedValue != '') {                
        this.allRacks = await this.familyService.fetchByFamily(this.warehouse.familySelectedValue);    
      }
  } catch(error) {
    console.log(error);
  }  
}



}
