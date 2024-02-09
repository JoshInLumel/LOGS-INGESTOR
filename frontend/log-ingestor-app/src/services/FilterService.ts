import store from "../store/store";

import { hydrate as hydrateFilterData } from "../reducers/filterReducer";

import { FilterUtils } from "../utils/FilterUtils";

import { IFilterData, IUpdateFilterData } from "../types/Filter.types";
import { LogService } from "./LogService";
import { StoreService } from "./StoreService";

import { ILogData } from "../types/LogData.types";

export class FilterService {
  static updateTableRowsStore = (updatedFilterData: IFilterData) => {
    const filterBackendFilterQuery =
      FilterUtils.generateBackendFilterQuery(updatedFilterData);

    LogService.getFilteredLogs(filterBackendFilterQuery).then(
      (data: ILogData) => {
        StoreService.hydrateStore(data, false);
      }
    );
  };

  static updateFilterData = (props: IUpdateFilterData) => {
    const { dropDownType = null, selectedItem, dateData = [] } = props;

    const { filterData } = store.getState();

    const updatedFilterData = {
      ...filterData,
      ...(dropDownType
        ? {
            [dropDownType]: selectedItem ?? { label: "", value: "" },
          }
        : {
            dateData: {
              startTime: dateData[0]?.toISOString(),
              endTime: dateData[1]?.toISOString(),
            },
          }),
    } as IFilterData;

    store.dispatch(hydrateFilterData(updatedFilterData));
    FilterService.updateTableRowsStore(updatedFilterData);
  };

  static resetFilter = () => {
    const updatedFilterData = FilterUtils.getDefaultFilterData();

    store.dispatch(hydrateFilterData(updatedFilterData));
    FilterService.updateTableRowsStore(updatedFilterData);
  };
}
