import { Header } from "./types";

export const headers: Header[] = [
  {
    label: "Avatar",
    dataKey: "image",
    type: "image",
    sortable: true,
  },
  {
    label: "Fullname",
    dataKey: "profile.fullname",
    type: "text",
    sortable: true,
  },
  {
    label: "option",
    dataKey: "option",
    type: "option",
    options: ["FINISHED", "PENDING"],
    sortable: true,
  },
  {
    label: "Email",
    dataKey: "email",
    type: "text",
    sortable: true,
    required: true,
  },
  {
    label: "Currency",
    dataKey: "currency",
    type: "currency",
    sortable: true,
    required: true,
  },
  {
    label: "Role",
    dataKey: "role",
    type: "badge",
    sortable: true,
    required: true,
  },
  {
    label: "status",
    dataKey: "status",
    type: "boolean",
    sortable: true,
    required: true,
  },
];
