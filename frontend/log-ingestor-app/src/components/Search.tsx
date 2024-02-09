import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isEqual } from "lodash";

import { SearchService } from "../services/SearchService";

import { FilterUtils } from "../utils/FilterUtils";

import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import ButtonComponent from "./reusables/Button";
import IconRenderer from "./reusables/IconRenderer";

import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";

import { IRootState } from "../types/StoreTypes";

import "../styles/Search.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "10px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 60px)",
    },
  },
}));

const handleOnSearch = (value: string) => SearchService.searchLogs(value);

const defaultFilterData = FilterUtils.getDefaultFilterData();

const SearchComponent = (props: StateProps) => {
  const { filterData } = props;
  const [searchString, setSearchString] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchString(e.target.value);

  const handleClearSearch = () => {
    setSearchString("");
    handleOnSearch("");
  };

  useEffect(() => {
    if (!isEqual(filterData, defaultFilterData))
      if (searchString) setSearchString("");
  }, [filterData]);

  return (
    <div className="search-box-wrapper">
      <Search className="search-box-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <StyledInputBase
            value={searchString}
            onChange={handleSearchChange}
            placeholder="search"
            inputProps={{ "aria-label": "search" }}
          />
          <StyledIconWrapper onClick={handleClearSearch}>
            <IconRenderer icon={faClose} />
          </StyledIconWrapper>
        </div>
      </Search>
      <ButtonComponent
        icon={faSearch}
        onClick={() => handleOnSearch(searchString)}
        color={"#30336b"}
      />
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  filterData: state.filterData,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(SearchComponent);
