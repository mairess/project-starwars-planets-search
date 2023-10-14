export type Planet = {
  [key: string]: any
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents?: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type Planets = Planet[];

export type Filter = {
  column: string;
  comparison: string;
  value: string;
};
