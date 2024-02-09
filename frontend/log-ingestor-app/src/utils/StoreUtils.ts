import { uniqueId } from "lodash";

import { LOG_TABLE_DROPDOWN_FILTER_TYPES } from "../constants/FilterConstants";
import { ILogOptionData, ILogOptionsData } from "../types/StoreTypes";

export class StoreUtils {
  static getDefaultLogOptionsData = (): ILogOptionsData => {
    const logOptionsData: any = {};

    LOG_TABLE_DROPDOWN_FILTER_TYPES.forEach((key) => {
      logOptionsData[key] = {
        options: new Set<string>(),
        dropDownData: [],
      };
    });

    return logOptionsData;
  };

  static storeDropDownData = (
    optionLabel: string,
    logOptionData: ILogOptionData = { options: new Set(), dropDownData: [] }
  ) => {
    const { options, dropDownData } = logOptionData;
    if (!options.has(optionLabel)) {
      options.add(optionLabel);
      dropDownData.push({ value: uniqueId(), label: optionLabel });
    }
  };
}
