/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Spinner,
  Tooltip,
} from "@nextui-org/react";

import { SearchIcon } from "../../core/components/icons/SearchIcon";
import { ChevronDownIcon } from "../../core/components/icons/ChevronDownIcon";
import { capitalize } from "../../core/utils";
import FlightsForm from "./Flights.Add.Form";
import FlightsFormEdit from "./Flights.Edit.Form";
import { DeleteService } from "../services.handlers";
import DeleteModal from "../../core/components/DeleteModal";

const INITIAL_VISIBLE_COLUMNS = [
  "airline",
  "NAME",
  "quantityAvailable",
  "arrivalTime",
  "actions",
];

export default function FlightsTable({ data, isLoading, handleUpdate }) {
  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "price", uid: "price" },
    { name: "quantityAvailable", uid: "quantityAvailable" },
    { name: "savings", uid: "savings", sortable: true },
    { name: "airline", uid: "airline", sortable: true },
    { name: "departureAddress", uid: "departureAddress", sortable: true },
    { name: "seatType", uid: "seatType", sortable: true },
    { name: "arrivalAddress", uid: "arrivalAddress" },
    { name: "arrivalTime", uid: "arrivalTime" },
    { name: "departureCity", uid: "departureCity" },
    { name: "arrivalCity", uid: "arrivalCity" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "ACTIONS", uid: "actions" },
  ];

  console.log("data", data);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(data?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filteredUsers;
  }, [data, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "airline":
        return (
          <div className="relative flex items-center   gap-2">
            {user.flight?.airline}
          </div>
        );
      case "departureAddress":
        return (
          <div className="relative flex items-center   gap-2">
            {user.flight?.departureAddress}
          </div>
        );
      case "seatType":
        return (
          <div className="relative flex items-center   gap-2">
            {user.flight?.seatType}
          </div>
        );
      case "arrivalAddress":
        return (
          <div className="relative flex items-center   gap-2">
            {user.flight?.arrivalAddress}
          </div>
        );
      case "arrivalTime":
        return (
          <div className="relative flex items-center   gap-2">
            {user.flight?.arrivalTime}
          </div>
        );
      case "departureCity":
        return (
          <div className="relative flex items-center   gap-2">
            {user.flight?.departureCity}
          </div>
        );
      case "arrivalCity":
        return (
          <div className="relative flex items-center   gap-2">
            {user.flight?.arrivalCity}
          </div>
        );
      case "actions":
        console.log("userrrrrrrrr", user);

        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <FlightsFormEdit
                handleUpdate={handleUpdate}
                flightID={user.id}
                data={user}
              />
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <DeleteModal
                deleteFun={() => {
                  DeleteService(user.id, handleUpdate, "flights");
                }}
                text={"flight"}
              />
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="max-h-80 overflow-scroll overflow-x-hidden"
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <FlightsForm handleUpdate={handleUpdate} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {data.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    data.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <Table
      className="mt-5"
      removeWrapper
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      aria-label="Flights Table."
      checkboxesProps={{
        classNames: {
          wrapper: " after:bg-foreground after:text-background text-background",
          base: "overflow-scroll",
          table: "overflow-scroll",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "end"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
        emptyContent={"No hotels found"}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
