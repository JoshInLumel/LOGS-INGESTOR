export interface IDropDownMenuItem {
  label: string;
  value?: string;
}

export interface IDropDownPassedProps {
  menu: IDropDownMenuItem[];
  onSelect: (data: IDropDownMenuItem) => void;
  value: IDropDownMenuItem;
  label: string;
}
