import { Rack } from "./rack.model"

export interface Warehouse {
  id: number,
  uuid: string,
  family: string,
  size: number,
  Racks: Array<Rack>
}
