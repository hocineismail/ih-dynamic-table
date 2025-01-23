import { useState, useEffect, useMemo } from "react";

import { debounce } from "../helper/debounce";

import PaginationComponent from "./Pagination";
import { ColumnType, Header } from "../types";

interface TableProps {
  name?: string;
  headers: Header[];
  data: any[];
  isLoading: boolean;
  currency?: string;
  error: string | null;
  searchIsEnabled?: boolean;
  colorMap?: any;
  handleUpdateItem?: (name: string, value: any, col?: string) => void;
  handleSearchInput?: (value: any) => void;
  renderActionsItem?: (item: any) => JSX.Element;
  selectElement: (ids: number | string[]) => void;
  handleSortColumn?: (column: string, direction: string) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
  };
  onNavigateToPage?: (page: number) => void;
}

/**
 * Table component for rendering a dynamic table with various functionalities such as sorting, searching, pagination, and more.
 *
 * @param {TableProps} props - The properties for the Table component.
 * @param {string} props.name - The name of the table.
 * @param {boolean} props.searchIsEnabled - Flag to enable or disable the search functionality.
 * @param {Array} props.headers - The headers of the table, each containing a label, dataKey, and other optional properties.
 * @param {Array} props.data - The data to be displayed in the table.
 * @param {boolean} props.isLoading - Flag to indicate if the table data is currently loading.
 * @param {string} props.error - Error message to be displayed if there is an error.
 * @param {Object} props.colorMap - A map of colors for rendering badges.
 * @param {Function} props.handleSortColumn - Function to handle sorting of columns.
 * @param {Function} props.handleUpdateItem - Function to handle updates to table items.
 * @param {Function} props.renderActionsItem - Function to render action items for each row.
 * @param {Object} props.pagination - Pagination information including currentPage and totalPages.
 * @param {string} props.currency - The currency code for formatting currency values.
 * @param {Function} props.handleSearchInput - Function to get the search value.
 * @param {Function} props.onNavigateToPage - Function to handle navigation to a different page.
 * @param {Function} props.selectElement - Function to handle selection of table elements.
 *
 * @returns {JSX.Element} The rendered Table component.
 */
export function DynamicTable({
  name,
  searchIsEnabled,
  headers,
  data,
  isLoading,
  error,
  colorMap,
  handleSortColumn,
  handleUpdateItem,
  renderActionsItem,
  pagination,
  currency,
  handleSearchInput,
  onNavigateToPage,
  selectElement,
}: TableProps) {
  const [inputValue, setInputValue] = useState("");
  const [sortColumn, setSortColumn] = useState("fullname");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isSelectAllIndeterminate, setIsSelectAllIndeterminate] =
    useState(false);

  useEffect(() => {
    setIsSelectAllIndeterminate(
      selectedItems.length > 0 && selectedItems.length < data.length
    );
  }, [selectedItems, data.length]);

  const debouncedChangeHandler = useMemo(() => {
    if (handleSearchInput) {
      return debounce(handleSearchInput, 500);
    }
    return undefined;
  }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleSearchInput) {
      setInputValue(e.target.value);
      if (debouncedChangeHandler) {
        debouncedChangeHandler(e.target.value);
      }
    }
  };

  const handleSelectAll = () => {
    const newSelection =
      selectedItems.length === data.length ? [] : data.map((item) => item.id);
    setSelectedItems(newSelection);
    if (selectElement) {
      selectElement(newSelection);
    }
    //  dispatch(setSelectedItem(newSelection));
  };

  const handleCheckboxChange = (id: string | number) => {
    const newSelection = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];
    setSelectedItems(newSelection);
    if (selectElement) {
      selectElement(newSelection);
    }
    //dispatch(setSelectedItem(newSelection));
  };
  const getNestedValue = (obj: any, path: any) => {
    return path
      .split(".")
      .reduce((acc: any, part: any) => (acc ? acc[part] : null), obj);
  };
  const renderSortIcon = (dataKey: string) => {
    if (handleSortColumn) {
      if (sortColumn !== dataKey) return null;

      handleSortColumn(dataKey, sortDirection);

      return sortDirection === "asc" ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-up"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
            />
          </svg>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
            />
          </svg>
        </>
      );
    }
  };
  const handleSort = (dataKey: string) => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortColumn(dataKey);
  };
  const renderCell = (item: any, dataKey: string, type: ColumnType) => {
    const value = getNestedValue(item, dataKey);
    const header = headers.find((h) => h.dataKey === dataKey);
    // const options = header?.options || [];

    switch (type) {
      case "option":
        return (
          <select
            value={value}
            onChange={(e) => {
              if (handleUpdateItem) {
                handleUpdateItem(item.id, e.target.value, dataKey);
              }
            }}
          >
            {header?.options?.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "boolean":
        return (
          <label className="ih-switch">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => {
                if (handleUpdateItem) {
                  handleUpdateItem(item.id, e.target.checked, dataKey);
                }
              }}
            />
            <span className="ih-slider round"></span>
          </label>
        );
      case "html":
        return value ? (
          <div dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          "-"
        );
      case "currency":
        return (
          <span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency || "USD",
            }).format(value)}
          </span>
        );
      case "link":
        return value ? <a href={value}> Link </a> : "-";
      case "image":
        return value ? (
          <img src={value} alt="avatar" className="ih-table-image" />
        ) : (
          "-"
        );
      case "badge":
        return (
          <span
            className="ih-table-badge"
            style={{ backgroundColor: colorMap[value.toLowerCase()] }}
          >
            {value}
          </span>
        );
      case "array":
        return value ? value.join(", ") : "-";
      default:
        return value !== null && value !== undefined ? value : "-";
    }
  };

  if (error) {
    return <div className="ih-table-error">{error}</div>;
  }

  if (isLoading) {
    return <div className="ih-table-loading">Loading...</div>;
  }
  return (
    <div className="ih-table-container">
      {name && <h2 className="ih-table-title">{name}</h2>}
      <div className="ih-table-header">
        {searchIsEnabled && (
          <input
            type="text"
            value={inputValue}
            placeholder={`Search...`}
            className="ih-table-search"
            onChange={onSearch}
          />
        )}
      </div>
      <table className="ih-table">
        <thead>
          <tr>
            <th className="ih-table-header">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  data.length !== 0 && selectedItems.length === data.length
                }
                ref={(input) => {
                  if (input) input.indeterminate = isSelectAllIndeterminate;
                }}
              />
            </th>
            {headers.map((header, index) => (
              <th
                key={index}
                onClick={() => header.sortable && handleSort(header.dataKey)}
                className={
                  header.sortable
                    ? "table-header sortable-column"
                    : "table-header"
                }
              >
                {header.label}
                {header.sortable && renderSortIcon(header.dataKey)}
              </th>
            ))}
            {renderActionsItem && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="ih-table-data">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(item.id)}
                  checked={selectedItems.includes(item.id)}
                />
              </td>
              {headers.map((header: any) => (
                <td key={header.dataKey}>
                  {renderCell(item, header.dataKey, header?.type)}
                </td>
              ))}
              {renderActionsItem && (
                <td className="ih-table-data col-action">
                  {renderActionsItem(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && onNavigateToPage && pagination.totalPages > 1 && (
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onNavigateToPage={onNavigateToPage}
        />
      )}
    </div>
  );
}
