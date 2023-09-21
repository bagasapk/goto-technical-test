interface Phones {
  number: string
}

export interface AllContactType {
  created_at: Date;
  first_name: string;
  id: number;
  last_name: string;
  phones: Phones[];
}
