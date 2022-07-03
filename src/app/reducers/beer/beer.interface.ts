import {Loadable} from '..';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: UnitValue;
  boil_volume: UnitValue;
  favorite: boolean;
}

export interface UnitValue {
  value: number;
  unit: string;
}

export interface BeerState extends Loadable {
  content: Beer[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

