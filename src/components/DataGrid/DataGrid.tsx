import {
  DataGridColumn,
  DataGridRow,
} from "@/components/DataGrid/types/dataGrid";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Checkbox,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import Table from "@mui/material/Table";
import { useState } from "react";

interface DataGridProps<T> {
  columns: DataGridColumn<T>[];
  data: DataGridRow<T>[];
  textForEmptyData?: string;
  selectionMode?: "single" | "multiple";
  rowKey?: keyof T;
  selectedItems?: T[];
  // totalPages?: number;
  // totalElements?: number;
  // disablePagination?: boolean;
  tableHeight?: number | string;
  toolbar?: React.ReactNode;
  onSelectionChange?: (selected: T[]) => void;
}

export function DataGrid<T>({
  columns,
  data,
  textForEmptyData = "Nenhum resultado encontrado.",
  selectionMode,
  rowKey = "id" as keyof T,
  selectedItems,
  // totalPages,
  // totalElements,
  // disablePagination,
  tableHeight,
  toolbar,
  onSelectionChange,
}: DataGridProps<T>) {
  const theme = useTheme();

  const [internalSelected, setInternalSelected] = useState<T[]>([]);

  const isSelectable =
    selectionMode === "single" || selectionMode === "multiple";

  const isSingleSelect = selectionMode === "single";

  const isMultipleSelect = selectionMode === "multiple";

  const isControlled =
    selectedItems !== undefined && onSelectionChange !== undefined;

  const selected = isControlled ? selectedItems! : internalSelected;

  const isAllSelected =
    data.length > 0 && data.every((row) => isRowSelected(row));

  function handleSelectionChange(newSelected: T[]) {
    if (isControlled) onSelectionChange?.(newSelected);
    else setInternalSelected(newSelected);
  }

  function isRowSelected(row: T): boolean {
    return selected.some((item) => item[rowKey] === row[rowKey]);
  }

  function toggleSelectAll(): void {
    if (!isMultipleSelect) return;

    const allSelected = data.every((row) => isRowSelected(row));

    const newSelected = allSelected
      ? selected.filter(
          (item) => !data.some((row) => row[rowKey] === item[rowKey]),
        )
      : [...selected, ...data.filter((row) => !isRowSelected(row))];

    handleSelectionChange(newSelected);
  }

  function toggleRowSelection(row: T): void {
    if (isSingleSelect) {
      const alreadySelected = isRowSelected(row);

      handleSelectionChange(alreadySelected ? [] : [row]);
    } else {
      const alreadySelected = isRowSelected(row);

      const newSelected = alreadySelected
        ? selected.filter((item) => item[rowKey] !== row[rowKey])
        : [...selected, row];

      handleSelectionChange(newSelected);
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {toolbar && (
          <Box
            px={2}
            py={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="divider"
          >
            {toolbar}
          </Box>
        )}

        <TableContainer sx={{ maxHeight: tableHeight ?? 1000 }}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead sx={{ height: theme.spacing(7) }}>
              <TableRow>
                {isSelectable && (
                  <TableCell
                    padding="checkbox"
                    sx={{
                      fontWeight: 600,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    {isMultipleSelect && (
                      <Checkbox
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        inputProps={{ "aria-label": "select all rows" }}
                      />
                    )}
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    size="small"
                    key={column.key.toString()}
                    align={column.align ?? "left"}
                    sx={{
                      ...column?.style,
                      ...(column.hideOnMobile && {
                        display: { xs: "none", md: "table-cell" },
                        fontWeight: 600,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      }),
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {data.length ? (
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={row[rowKey]?.toString() ?? index.toString()}
                    sx={{
                      backgroundColor: theme.palette.secondary.contrastText,
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                      ...row?.style,
                    }}
                  >
                    {isSelectable && (
                      <TableCell
                        padding="checkbox"
                        sx={{
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Checkbox
                          checked={isRowSelected(row)}
                          onChange={() => toggleRowSelection(row)}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        size="small"
                        key={column.key.toString()}
                        align={column.align ?? "left"}
                        sx={{
                          ...(column.hideOnMobile && {
                            display: { xs: "none", md: "table-cell" },
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          }),
                        }}
                      >
                        {row[column.key]?.toString()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (isSelectable ? 1 : 0)}
                    sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        padding: theme.spacing(1),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <InfoIcon
                        color="error"
                        sx={{ marginRight: theme.spacing(0.5) }}
                      />
                      <Typography variant="body2">
                        {textForEmptyData}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        {/* {!disablePagination && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            sx={{ borderTop: "1px solid", borderColor: "divider" }}
          >
            <Typography variant="body2" color="text.secondary">
              Total de resultados: {totalElements ?? data.length}
            </Typography>

            <Pagination
              color="primary"
              count={totalPages}
              page={getBackendPage() + 1}
              onChange={(_, value) => {
                setParams({ pagina: value });
              }}
              shape="rounded"
            />
          </Box>
        )} */}
      </Paper>
    </Box>
  );
}
