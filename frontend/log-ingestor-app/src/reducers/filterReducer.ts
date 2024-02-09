import { FilterUtils } from "../utils/FilterUtils";

import { IFilterData } from "../types/Filter.types";
import { IFilterDataHydrateAction } from "../types/StoreTypes";

const initalState: IFilterData = FilterUtils.getDefaultFilterData();

export const hydrate = (filterData: IFilterData): IFilterDataHydrateAction => ({
  type: "HYDRATE_FILTER_DATA",
  payload: filterData,
});

const filterReducer = (
  state = initalState,
  action: IFilterDataHydrateAction
): IFilterData => {
  const { type, payload } = action;

  switch (type) {
    case "HYDRATE_FILTER_DATA":
      return payload;
    default:
      return state;
  }
};

export default filterReducer;
