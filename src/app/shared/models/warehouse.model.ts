import { Rack } from "./rack.model"

export interface Warehouse {
  id: number,
  uuid: string,
  family: string,
  size: number,
  racks: Array<Rack>,
  rackss: string,
  isHighlighted: boolean
}
