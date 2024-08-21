"use client";
import {
  DataEditor,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import React from "react";

type DummyItem = {
  name: string;
  company: string;
  email: string;
  phone: string;
};

const data = [
  {
    name: "Hines Fowler",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127",
  },
  {
    name: "Test",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127",
  },
  {
    name: "12354",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127",
  },
];

const columns: GridColumn[] = [
  {
    title: "Name",
    id: "name",
  },
  {
    title: "Company",
    id: "company",
  },
  {
    title: "Email",
    id: "email",
  },
  {
    title: "Phone",
    id: "phone",
  },
];

const DataGrid = () => {
  const getCellContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    // dumb but simple way to do this
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: false,
      displayData: d,
      data: d,
    };
  }, []);
  return (
    <div>
      <DataEditor
        columns={columns}
        rows={data.length}
        getCellContent={getCellContent}
      />{" "}
    </div>
  );
};

export default DataGrid;
