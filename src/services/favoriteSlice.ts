import { createSlice } from "@reduxjs/toolkit";
import { AllContactType } from "./interfaces";

interface FavoriteState {
  item: AllContactType[];
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
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    init: (state: FavoriteState, action) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export default favoriteSlice.reducer;
export const { init } = favoriteSlice.actions;
