# Dynamic React Table Component

![Description of the image](https://github.com/hocineismail/ih-dynamic-table/blob/main/examples/image.png?raw=true)

A flexible and feature-rich table component for React applications with built-in sorting, searching, pagination, and more.

## Features

- Dynamic column rendering based on provided headers
- Support for complex data structures
- Sorting functionality
- Search capability
- Pagination
- Row selection with checkboxes
- Custom action rendering
- Loading and error states
- Color-coded badges
- Currency formatting
- Responsive design

## Installation

To install the package, run:

```bash
npm install ih-dynamic-table
```

## Usage

Here's a basic example of how to use the Table component:

```jsx
import React from "react";
import { DynamicTable } from "ih-dynamic-table";

const App = () => {
  const headers = [
    { label: "Name", dataKey: "profile.fullname", sortable: true },
    { label: "Role", dataKey: "role", type: "badge" },
    { label: "Currency", dataKey: "currency", type: "currency" },
    {
      label: "Status",
      dataKey: "option",
      type: "option",
      options: ["PENDING", "APPROVED", "REJECTED"],
    },
    { label: "Avatar", dataKey: "image", type: "image" },
  ];

  const data = [
    {
      id: "1",
      profile: { fullname: "John Doe" },
      role: "admin",
      currency: 100,
      option: "PENDING",
      image: "https://example.com/avatar1.jpg",
    },
    // ... more data
  ];

  const renderActionsItem = (item) => (
    <button onClick={() => console.log("Edit", item)}>Edit</button>
  );

  return (
    <DynamicTable
      name="Users"
      headers={headers}
      colorMap={{ open: "#28a745", closed: "#F44336" }}
      data={data}
      currency="USD"
      handleSearchInput={(e) => console.log("search", e)}
      searchIsEnabled={true}
      isLoading={false}
      error={null}
      handleSortColumn={(col, direction) => console.log(col, direction)}
      handleUpdateItem={(name, value, dataKey) =>
        console.log(name, value, dataKey)
      }
      selectElement={(name) => console.log(name)}
      renderActionsItem={renderActionsItem}
      pagination={{
        currentPage: 1,
        totalPages: 12,
      }}
      onNavigateToPage={(page) => console.log("Navigate to page", page)}
    />
  );
};

export default App;
```

## Props

| Prop Name           | Type           | Description                                           | Required | Optional |
| ------------------- | -------------- | ----------------------------------------------------- | -------- | -------- |
| name                | string         | The name of the table                                 |          | ✓        |
| headers             | Array<Header>  | An array of header objects defining the table columns | ✓        |          |
| data                | Array<any>     | The data to be displayed in the table                 | ✓        |          |
| isLoading           | boolean        | Indicates if the table data is loading                | ✓        |          |
| error               | string \| null | Error message to display if there's an error          | ✓        |          |
| searchIsEnabled     | boolean        | Enables the search functionality                      |          | ✓        |
| colorMap            | object         | A map of colors for rendering badges                  |          | ✓        |
| currency            | string         | The currency code for formatting currency values      |          | ✓        |
| renderActionsItem   | function       | A function to render action items for each row        |          | ✓        |
| pagination          | object         | An object containing currentPage and totalPages       |          | ✓        |
| onNavigateToPage    | function       | A function to handle page navigation                  |          | ✓        |
| handleSelectElement | function       | A function to handle selection of table elements      |          | ✓        |
| handleSortColumn    | function       | A function to handle column sorting                   |          | ✓        |
| handleUpdateItem    | function       | A function to handle updates to table items           |          | ✓        |

## Header Object

Each header object in the `headers` array should have the following properties:

- `label`: The display label for the column
- `dataKey`: The key to access the data in each row (supports nested properties)
- `type`: The type of data (e.g., 'text', 'currency', 'badge', 'option', 'image', etc.)
- `sortable`: Whether the column is sortable
- `options`: An array of options for 'option' type columns

## Column Types

The component supports various column types:

```typescript
export type ColumnType =
  | "text"
  | "boolean"
  | "image"
  | "badge"
  | "array"
  | "option"
  | "iconType"
  | "link"
  | "currency";
```

### Examples of different column types:

1. Text column:

   ```javascript
   { label: 'Name', dataKey: 'name', type: 'text' }
   ```

2. Badge column:

   ```javascript
   { label: 'Status', dataKey: 'status', type: 'badge' }
   ```

3. Currency column:

   ```javascript
   { label: 'Price', dataKey: 'price', type: 'currency' }
   ```

4. Image column:

   ```javascript
   { label: 'Avatar', dataKey: 'avatar', type: 'image' }
   ```

5. Option column:

   ```javascript
   { label: 'Category', dataKey: 'category', type: 'option', options: ['A', 'B', 'C'] }
   ```

6. Boolean column:

   ```javascript
   { label: 'Active', dataKey: 'isActive', type: 'boolean' }
   ```

## Using Complex Data Structures

The `dataKey` property in the header object supports nested properties, allowing you to display data from complex structures. Use dot notation to access nested properties:

```javascript
const headers = [
  { label: "Full Name", dataKey: "profile.fullname", type: "text" },
  { label: "Address", dataKey: "contact.address.street", type: "text" },
];

const data = [
  {
    id: 1,
    profile: { fullname: "John Doe" },
    contact: { address: { street: "123 Main St" } },
  },
  // ... more data
];
```

## Styling

The component comes with default styling, but you can override it by using the same class names in your own CSS file. Here are the main class names used:

```css
/* Table Styles */
.ih-table-container {
  /* Container for the entire table */
}

.ih-table {
  /* Styles for the table element */
}

.ih-table-header {
  /* Styles for the table header */
}

.ih-table-data {
  /* Styles for the table data rows */
}

.ih-table-title {
  /* Styles for the table title */
}

.ih-table-image {
  /* Styles for images within the table */
}

.ih-table-badge {
  /* Styles for badges within the table */
}

/* Pagination Styles */
.ih-pagination-container {
  /* Container for the pagination controls */
}

.ih-pagination-btn {
  /* Styles for pagination buttons */
}

.ih-pagination-item {
  /* Styles for individual pagination items */
}

/* Add more custom styles as needed */
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
