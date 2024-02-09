import store from "../store/store";
import { isEqual } from "lodash";

import { hydrate as hydrateFilterData } from "../reducers/filterReducer";

import { LogService } from "./LogService";
import { StoreService } from "./StoreService";

import { ILogData } from "../types/LogData.types";
import { FilterUtils } from "../utils/FilterUtils";

export class SearchService {
  static searchLogs = (value: string) => {
    try {
      if (!value) {
        LogService.getAllLogs().then((data) => {
          StoreService.hydrateStore(data, false);
        });
        return;
      }

      //clear the filter if it exists - when search is applied
      const { filterData } = store.getState();
      const defaultFilterData = FilterUtils.getDefaultFilterData();

      if (!isEqual(defaultFilterData, filterData)) {
        store.dispatch(hydrateFilterData(defaultFilterData));
      }

      LogService.getSearchFilteredLogs(value).then((data: ILogData) => {
        StoreService.hydrateStore(data, false);
      });
    } catch (error) {
      console.error(error);
    }
  };
}
