import { AllContactType } from "./interfaces";

/**Ascending sort */
export const ascSort = (a: string, b: string) => {
  let fa = a.toLowerCase(),
    fb = b.toLowerCase();
  if (fa < fb) {
    return -1;
  }
  if (fa > fb) {
    return 1;
  }
  return 0;
};

/**Remove Array */
export const removeArray = (
  array: AllContactType[],
  filter: AllContactType[]
) => {
  const myArrayFiltered = array.filter((el) => {
    return filter.every((f) => {
      return f.id !== el.id;
    });
  });
  return myArrayFiltered;
};

export const checkDeletedFavorite = (data: AllContactType[]) => {
    const objFav: Array<AllContactType> = JSON.parse(
      sessionStorage.getItem("favorite") || "{}"
    );
    const myArrayFiltered = objFav.filter((f) => {
      return data.some((el: AllContactType) => {
        return f.id === el.id;
      });
    });
    sessionStorage.setItem("favorite", JSON.stringify([...myArrayFiltered]));
    return myArrayFiltered;
};
