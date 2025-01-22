import { headers } from "./example.header";
import "./table-style.css";
import "./pagination-style.css";

import { data } from "./data";
import { DynamicTable } from ".";

export const colorMap: Record<string, string> = {
  admin: "#007bff", // Blue
  user: "#28a745", // Green
  manager: "#6f42c1", // Purple

  paid: "#4CAF50", // Dark Green for paid (a strong, positive color)
  unpaid: "#FF9800", // Orange for unpaid (easy to distinguish)

  ready: "#28a745", // Green (could be used for ready)
  pending: "#FFC107", // Yellow (could be used for pending)
  refunded: "#9E9E9E", // Red-Orange (for refunded, more noticeable)

  open: "#28a745", // Bright Blue (for open)
  closed: "#F44336", // Red for closed
};
const renderActionsItem = (item: any) => {
  return (
    <button
      onClick={() => {
        console.log("Edit", item);
      }}
    >
      Edit
    </button>
  );
};
function App() {
  const onNavigateToPage = (page: number) => {
    console.log(page);
  };
  return (
    <>
      <DynamicTable
        name="Users"
        headers={headers}
        colorMap={colorMap}
        data={data}
        currency="USD"
        getSearchValue={(e) => console.log("search", e)}
        searchIsEnabled={true}
        isLoading={false}
        error={null}
        setData={(e) => console.log(e)}
        handleSortColumn={(col, direction) => console.log(col, direction)}
        handlUpdateItem={(name, value, dataKey) =>
          console.log(name, value, dataKey)
        }
        handleSelectedElement={(name) => console.log(name)}
        renderActionsItem={renderActionsItem}
        pagination={{
          currentPage: 1,
          totalPages: 12,
        }}
        onNavigateToPage={onNavigateToPage}
      />
    </>
  );
}

export default App;
