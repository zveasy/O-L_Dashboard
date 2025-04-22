import { useMemo, useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// third-party
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { ColumnDef, HeaderGroup, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

// project-imports
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import MainCard from 'components/MainCard';
import { CSVExport, DraggableRow } from 'components/third-party/react-table';
import makeData from 'data/react-table';

// types
import { TableDataProps } from 'types/table';
import { LabelKeyObject } from 'react-csv/lib/core';

interface ReactTableProps {
  defaultColumns: ColumnDef<TableDataProps>[];
  defaultData: TableDataProps[];
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ defaultColumns, defaultData }: ReactTableProps) {
  const [columns] = useState(() => [...defaultColumns]);
  const [data, setData] = useState([...defaultData]);

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as TableDataProps);
    setData([...data]);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(), // good to have guaranteed unique row ids/keys for rendering
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  let headers: LabelKeyObject[] = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5
      }
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const draggedRowIndex = table.getRowModel().rows.findIndex((row) => `row-${row.id}` === active.id);
      const targetRowIndex = table.getRowModel().rows.findIndex((row) => `row-${row.id}` === over.id);
      reorderRow(draggedRowIndex, targetRowIndex);
    }
  };

  return (
    <MainCard
      title="Row Drag & Drop"
      content={false}
      secondary={
        <CSVExport {...{ data: table.getRowModel().flatRows.map((row) => row.original), headers, filename: 'row-dragable.csv' }} />
      }
    >
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                <TableRow key={headerGroup.id} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                  <TableCell />
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <DraggableRow key={row.id} row={row} reorderRow={reorderRow}>
                  <>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </>
                </DraggableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DndContext>
    </MainCard>
  );
}

// ==============================|| ROW - DRAG & DROP ||============================== //

export default function RowDragDrop() {
  const data = useMemo(() => makeData(10), []);

  const defaultColumns: ColumnDef<TableDataProps>[] = [
    {
      id: 'id',
      header: '#',
      accessorKey: 'id'
    },
    {
      id: 'firstName',
      header: 'First Name',
      accessorKey: 'firstName'
    },
    {
      id: 'lastName',
      header: 'Last Name',
      accessorKey: 'lastName'
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email'
    },
    {
      id: 'age',
      header: 'Age',
      accessorKey: 'age',
      meta: {
        className: 'cell-right'
      }
    },
    {
      id: 'visits',
      header: 'Visits',
      accessorKey: 'visits',
      meta: {
        className: 'cell-right'
      }
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (props) => {
        switch (props.getValue()) {
          case 'Complicated':
            return <Chip color="error" label="Complicated" size="small" variant="light" />;
          case 'Relationship':
            return <Chip color="success" label="Relationship" size="small" variant="light" />;
          case 'Single':
          default:
            return <Chip color="info" label="Single" size="small" variant="light" />;
        }
      }
    },
    {
      id: 'progress',
      header: 'Profile Progress',
      accessorKey: 'progress',
      cell: (props) => <LinearWithLabel value={props.getValue() as number} sx={{ minWidth: 75 }} />
    }
  ];

  return <ReactTable {...{ defaultColumns, defaultData: data }} />;
}
