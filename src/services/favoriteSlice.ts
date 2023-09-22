import { createSlice } from "@reduxjs/toolkit";
import { AllContactType } from "./interfaces";

interface FavoriteState {
  item: AllContactType[];
  contactOrFav: Boolean;
}

const sessionChecker = () => {
  if (sessionStorage.getItem("favorite")) {
    const objFav: Array<AllContactType> = JSON.parse(
      sessionStorage.getItem("favorite") || "{}"
    );
    return objFav;
  }
  return [];
};

const initialState: FavoriteState = {
  item: sessionChecker(),
  contactOrFav: true,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    init: (state: FavoriteState, action) => {
      state.item = [...state.item, action.payload];
    },
    change: (state: FavoriteState, action) => {
      state.item = action.payload;
    },
    remove: (state: FavoriteState, action) => {
      state.item = state.item.filter((item) => item.id !== action.payload.id);
    },
    toggle: (state: FavoriteState, action) => {
      state.contactOrFav = action.payload;
    },
  },
});

export default favoriteSlice.reducer;
export const { init, remove, toggle, change } = favoriteSlice.actions;
