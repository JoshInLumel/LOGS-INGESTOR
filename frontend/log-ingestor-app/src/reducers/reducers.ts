import { combineReducers } from "redux";

import tableRowsReducer from "./tableRowsReducer";
import tableFilterDropDownReducer from "./tableFilterDropDownReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  tableRows: tableRowsReducer,
  tableFilterDropDown: tableFilterDropDownReducer,
  filterData: filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
