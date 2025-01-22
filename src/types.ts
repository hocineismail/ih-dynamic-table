export type ColumnType =
  | "text"
  | "boolean"
  | "image"
  | "images"
  | "badge"
  | "array"
  | "option"
  | "textarea"
  | "iconType"
  | "html"
  | "date"
  | "link"
  | "currency"
  | "group-avatar";

export type Header = {
  label: string;
  dataKey: string;
  sortable?: boolean;
  options?: string[];
  type?: ColumnType;
  disabled?: boolean;
  required?: boolean;

  iconType?: {
    name?: string;
    Icon?: React.ReactDOM;
  };
};
