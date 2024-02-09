import { Action } from "redux";
import { IDataTableRow } from "./DataTable.types";
import { IFilterData } from "./Filter.types";
import { ELOG_ITEM_KEYS, ILogData } from "./LogData.types";

//tableRowsReducer types
export const HYDRATE_TABLE_ROWS = "HYDRATE_TABLE_ROWS";

export interface ITableRowsHydrateAction
  extends Action<typeof HYDRATE_TABLE_ROWS> {
  payload: IDataTableRow[];
}

//tableFilterDropDown types
export const HYDRATE_TABLE_FILTER_DROP_DOWN = "HYDRATE_TABLE_FILTER_DROP_DOWN";

export interface IDropDownData {
  label: string;
  value?: string;
}

export interface ITableFilterDropDowData {
  resourceIdDropDownData: IDropDownData[];
  levelDropDownData: IDropDownData[];
  parentResourceIdDropDownData: IDropDownData[];
  traceIdDropDownData: IDropDownData[];
  spanIdDropDownData: IDropDownData[];
}

export interface IProcessedLogData {
  tableRows: IDataTableRow[];
  tableFilterDropDownData?: ITableFilterDropDowData;
}

export interface ITableFilterDropDownHydrateAction
  extends Action<typeof HYDRATE_TABLE_FILTER_DROP_DOWN> {
  payload: ITableFilterDropDowData;
}

//filter-data type
export const HYDRATE_FILTER_DATA = "HYDRATE_FILTER_DATA";

export interface IFilterDataHydrateAction
  extends Action<typeof HYDRATE_FILTER_DATA> {
  payload: IFilterData;
}

//rootState types
export interface IRootState {
  tableRows: IDataTableRow[];
  tableFilterDropDown: ITableFilterDropDowData;
  filterData: IFilterData;
}

//store service types
export interface ILogOptionData {
  options: Set<string>;
  dropDownData: IDropDownData[];
}

export type ILogOptionsData = {
  [key in ELOG_ITEM_KEYS]: ILogOptionData;
};
export interface IGetProcessedLogData {
  logData: ILogData;
  logOptionData?: ILogOptionsData;
}
