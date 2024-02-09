import React from "react";
import { connect } from "react-redux";

import IconRenderer from "./reusables/IconRenderer";
import DropDown from "./reusables/DropDown";
import DateRangePicker from "./reusables/DateRangePicker";

import { faFilter, faUndo } from "@fortawesome/free-solid-svg-icons";

import { FilterService } from "../services/FilterService";

import { FilterUtils } from "../utils/FilterUtils";

import { FILTER_MENU } from "../constants/FilterConstants";
import { UI_TEXT } from "../constants/UIText";

import { IRootState } from "../types/StoreTypes";
import { IDateData, IRenderFilterDropDowns } from "../types/Filter.types";
import { IDropDownMenuItem } from "../types/DropDown.types";

import "../styles/Filter.css";

const handleOnResetClick = () => FilterService.resetFilter();

const renderDropDowns = (props: IRenderFilterDropDowns) => {
  const { tableFilterDropDown, filterData } = props;
  const { dateData } = filterData;
  const { startTime, endTime } = dateData as IDateData;

  return (
    <>
      {FILTER_MENU.map((item) => {
        const { value, label } = item;
        const dropDownData = FilterUtils.getDropDownData(
          tableFilterDropDown,
          value
        );

        return (
          <DropDown
            key={`${value}_dropdown`}
            menu={dropDownData}
            value={filterData[value] as IDropDownMenuItem}
            label={label}
            onSelect={(data: IDropDownMenuItem) => {
              FilterService.updateFilterData({
                dropDownType: value,
                selectedItem: data,
              });
            }}
          />
        );
      })}
      <DateRangePicker
        localeText={{
          startLabel: UI_TEXT.START_DATE,
          endLabel: UI_TEXT.END_DATE,
        }}
        value={[startTime, endTime]}
        onChange={(data) => {
          FilterService.updateFilterData({
            dateData: data,
          });
        }}
      />
    </>
  );
};

const Filter = (props: StateProps) => {
  const { tableFilterDropDown, filterData } = props;

  return (
    <div className="filter-container">
      <div className="header">
        <div className="left-content">
          <IconRenderer icon={faFilter} />
          <div className="title">Filter</div>
        </div>
        <div className="right-content" onClick={() => handleOnResetClick()}>
          <IconRenderer icon={faUndo} />
          <div className="title">Reset</div>
        </div>
      </div>
      <div className="body">
        {renderDropDowns({ tableFilterDropDown, filterData })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  tableFilterDropDown: state.tableFilterDropDown,
  filterData: state.filterData,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Filter);
