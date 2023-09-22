interface Phones {
  number: string
}

export interface AllContactType {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: Phones[];
}

export interface FavoriteState {
  item: AllContactType[];
  contactOrFav: Boolean;
}
