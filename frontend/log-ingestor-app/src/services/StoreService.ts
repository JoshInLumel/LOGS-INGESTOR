import store from "../store/store";

import { hydrate as hydrateTableRows } from "../reducers/tableRowsReducer";
import { hydrate as hydrateTableFilterDropDown } from "../reducers/tableFilterDropDownReducer";

import { StoreUtils } from "../utils/StoreUtils";
import { TimeUtils } from "../utils/TimeUtils";

import { IDataTableRow } from "../types/DataTable.types";
import { ELOG_ITEM_KEYS, ILogData } from "../types/LogData.types";
import { IGetProcessedLogData, IProcessedLogData } from "../types/StoreTypes";

export class StoreService {
  //conversion of backend data to store compatible data for table rows and table filter dropdowns
  static getProcessedLogData = (
    props: IGetProcessedLogData
  ): IProcessedLogData => {
    const { logData = [], logOptionData = null } = props;

    const dataTableData: IDataTableRow[] = [];

    logData.map((logItem) => {
      const { metadata, timestamp, ...rest } = logItem;
      const { resourceId, level, traceId, spanId } = rest;

      //processing and storing the data for the table filter dropdowns
      if (logOptionData) {
        StoreUtils.storeDropDownData(
          resourceId,
          logOptionData[ELOG_ITEM_KEYS.RESOURCE_ID]
        );
        StoreUtils.storeDropDownData(
          level,
          logOptionData[ELOG_ITEM_KEYS.LEVEL]
        );
        StoreUtils.storeDropDownData(
          metadata.parentResourceId,
          logOptionData[ELOG_ITEM_KEYS.PARENT_RESOURCE_ID]
        );
        StoreUtils.storeDropDownData(
          traceId,
          logOptionData[ELOG_ITEM_KEYS.TRACE_ID]
        );
        StoreUtils.storeDropDownData(
          spanId,
          logOptionData[ELOG_ITEM_KEYS.SPAN_ID]
        );
      }

      //processing and storing the data for the table rows
      const dataTableRow: IDataTableRow = {
        ...(rest as unknown as IDataTableRow),
        timestamp: TimeUtils.formatTimeStamp(timestamp),
        [ELOG_ITEM_KEYS.PARENT_RESOURCE_ID]: metadata.parentResourceId,
      };

      dataTableData.push(dataTableRow);
    });

    return {
      tableRows: dataTableData,
      ...(logOptionData && {
        tableFilterDropDownData: {
          resourceIdDropDownData:
            logOptionData[ELOG_ITEM_KEYS.RESOURCE_ID].dropDownData,
          levelDropDownData: logOptionData[ELOG_ITEM_KEYS.LEVEL].dropDownData,
          parentResourceIdDropDownData:
            logOptionData[ELOG_ITEM_KEYS.PARENT_RESOURCE_ID].dropDownData,
          traceIdDropDownData:
            logOptionData[ELOG_ITEM_KEYS.TRACE_ID].dropDownData,
          spanIdDropDownData:
            logOptionData[ELOG_ITEM_KEYS.SPAN_ID].dropDownData,
        } as any,
      }),
    };
  };

  //poulating the 'tableRows' and 'tableFilterDropDown' store
  static hydrateStore = (
    data: ILogData,
    isHydrateTableFilterDropDownStore: boolean = true
  ) => {
    const { tableRows, tableFilterDropDownData = null } =
      StoreService.getProcessedLogData({
        logData: data,
        ...(isHydrateTableFilterDropDownStore && {
          logOptionData: StoreUtils.getDefaultLogOptionsData(),
        }),
      });

    store.dispatch(hydrateTableRows(tableRows));

    if (tableFilterDropDownData)
      store.dispatch(hydrateTableFilterDropDown(tableFilterDropDownData));
  };
}
