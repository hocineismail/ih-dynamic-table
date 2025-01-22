# Dynamic React Table Component

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

```
npm install ih-dynamic-table
```

## Usage

Here's a basic example of how to use the Table component:

```jsx
import React from "react";
import { Table } from "ih-dynamic-table";
// import our default style
import "ih-dynamic-table/table-style.css";
import "ih-dynamic-table/pagination-style.css";

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
    <Table
      name="Users"
      headers={headers}
      data={data}
      currency="USD"
      searchIsEnabled={true}
      isLoading={false}
      error={null}
      renderActionsItem={renderActionsItem}
      pagination={{
        currentPage: 1,
        totalPages: 5,
      }}
      onNavigateToPage={(page) => console.log("Navigate to page", page)}
    />
  );
};

export default App;
```

## Props

| Prop Name             | Type           | Description                                           |
| --------------------- | -------------- | ----------------------------------------------------- |
| name                  | string         | The name of the table                                 |
| headers               | Array<Header>  | An array of header objects defining the table columns |
| data                  | Array<any>     | The data to be displayed in the table                 |
| isLoading             | boolean        | Indicates if the table data is loading                |
| error                 | string \| null | Error message to display if there's an error          |
| searchIsEnabled       | boolean        | Enables the search functionality                      |
| colorMap              | object         | A map of colors for rendering badges                  |
| currency              | string         | The currency code for formatting currency values      |
| renderActionsItem     | function       | A function to render action items for each row        |
| pagination            | object         | An object containing currentPage and totalPages       |
| onNavigateToPage      | function       | A function to handle page navigation                  |
| handleSelectedElement | function       | A function to handle selection of table elements      |
| handleSortColumn      | function       | A function to handle column sorting                   |
| handlUpdateItem       | function       | A function to handle updates to table items           |

## Header Object

Each header object in the `headers` array should have the following properties:

- `label`: The display label for the column
- `dataKey`: The key to access the data in each row (supports nested properties)
- `type`: The type of data (e.g., 'text', 'currency', 'badge', 'option', 'image', etc.)
- `sortable`: Whether the column is sortable
- `options`: An array of options for 'option' type columns
- `iconType`: An object containing icon information for 'iconType' columns

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
    skills: [{ name: "JavaScript" }, { name: "React" }],
  },
  // ... more data
];
```

## Styling

The component comes with default styling, but you can override it by using the same class names in your own CSS file. Here are the main class names used:

- `.table-container`: Container for the entire table
- `.table`: The table element
- `.table-header`: Table header cells
- `.table-data`: Table data cells
- `.table-title`: Table title
- `.table-image`: Image within table cells
- `.table-badge`: Badge styling
- `.pagination-container`: Container for pagination
- `.pagination-btn`: Pagination buttons
- `.pagination-item`: Pagination number items

Example of custom styling:

```css
.table-container {
  width: 100%;
  overflow-x: auto;
  padding: 1rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  background-color: #f4f4f4;
  font-weight: bold;
}

.table-data,
.table-header {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

/* Add more custom styles as needed */
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

```

This updated README provides more detailed information about using dataKeys for complex data structures, explains how users can use their own CSS by overriding the provided class names, and includes examples of different column types. It also incorporates the updated types and provides a more comprehensive guide for users of your dynamic table component.
```
