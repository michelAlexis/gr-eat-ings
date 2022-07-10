import { IngredientDetail, Quantity } from '@/models/ingredient.model';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { FC } from 'react';

function reduceNutrition(
  ingredients: { ingredient: IngredientDetail; multiplier: number; quantity: Quantity }[],
  key: keyof IngredientDetail['nutritions'][number]
) {
  let anyMissing = false;
  const sum = ingredients.reduce((agg, i) => {
    const refValue = i.ingredient.nutritions?.[0][key];

    if (refValue) {
      const value = (+refValue ?? 0) * i.multiplier;

      agg += +value;
    } else {
      anyMissing = true;
    }

    return agg;
  }, 0);

  return anyMissing ? `~ ${sum}` : `${sum}`;
}

export const IngredientCalculatorTable: FC<{
  data: { ingredient: IngredientDetail; multiplier: number; quantity: Quantity }[];
  onRemove: (id: string) => void;
}> = ({ data, onRemove }) => {
  const columns: ColumnDef<{ ingredient: IngredientDetail; multiplier: number; quantity: Quantity }>[] = [
    {
      accessorFn: (i) => i.ingredient.name,
      header: 'Ingredient',
      footer: '',
    },
    {
      accessorFn: (i) => i.quantity,
      cell: ({ cell }) => (
        <span>
          {cell.getValue<Quantity>().quantity} {cell.getValue<Quantity>().unit}
        </span>
      ),
      header: 'Quantity',
      footer: '',
    },
    {
      accessorFn: (i) => (i.ingredient.nutritions[0]?.kcal ?? 0) * i.multiplier,
      header: 'Kcal',
      footer: () => reduceNutrition(data, 'kcal'),
    },
    {
      accessorFn: (i) => i.ingredient.id,
      cell: (i) => <button onClick={() => onRemove(i.getValue())}>-</button>,
      id: 'remove-action',
      header: '',
      footer: '',
    },
  ];
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-2">
      <h2>Size : {data.length}</h2>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
};

export default IngredientCalculatorTable;
