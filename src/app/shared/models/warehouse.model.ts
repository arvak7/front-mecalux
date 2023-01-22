import { Rack } from "./rack.model"

export interface Warehouse {
  id: number,
  client: string,
  uuid: string,
  family: string,
  size: number,
  racks: Array<any>,
  rackss: string,
  familySelectedValue: string;
  rackSelectedValue: string;
  isHighlighted: boolean
}
