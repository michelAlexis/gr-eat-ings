import { IngredientDetail, Quantity } from '@/models/ingredient.model';
import { LinkIcon } from '@heroicons/react/20/solid';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import { FC } from 'react';
import QuantityInput from '../Quantity.input';

function reduceNutrition(
  ingredients: { ingredient: IngredientDetail; multiplier: number; quantity: Quantity }[],
  key: keyof IngredientDetail['nutritionRef']
) {
  let anyMissing = false;
  const sum = ingredients.reduce((agg, i) => {
    const refValue = i.ingredient.nutritionRef[key];

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
  onUpdate: (rowIndex: number, colId: string, value: any) => void;
  onRemove: (id: string) => void;
}> = ({ data, onRemove, onUpdate }) => {
  const columns: ColumnDef<{ ingredient: IngredientDetail; multiplier: number; quantity: Quantity }>[] = [
    {
      id: 'ingredient',
      accessorFn: (i) => i.ingredient,
      header: () => <div className="w-96">Ingredient</div>,
      footer: '',
      cell: ({ cell, row }) => {
        const ingredient = row.getValue<IngredientDetail>('ingredient');
        return (
          <>
            <Link href={`/ingredients/${ingredient.id}`}>
              <a className="hover:text-blue-400 hover:border-b-[1px] border-blue-400">
                <span className="mr-2">{ingredient.name}</span>
                <LinkIcon height="1rem" className="inline-flex" />
              </a>
            </Link>
          </>
        );
      },
    },
    {
      id: 'quantity',
      accessorFn: (i) => i.quantity,
      cell: ({ cell, row, column, table, getValue }) => {
        const quantity = cell.getValue<Quantity>();
        const onChange = (input: number) => {
          console.log('New quantity', input);
          // onUpdate(row.index, column.id, { ...quantity, quantity: input ?? 0 });
        };
        row.getAllCells()[0].renderValue();
        return <QuantityInput defaultValue={quantity} onChange={onChange} className="max-w-md" />;
      },
      header: () => <div className="w-64">Quantity</div>,
      footer: '',
    },
    {
      id: 'kcal',
      accessorFn: (i) => (i.ingredient.nutritionRef.kcal ?? 0) * i.multiplier,
      header: () => <div className="w-32">Kcal</div>,
      footer: () => <span className="font-bold">{reduceNutrition(data, 'kcal')} kcal</span>,
    },
    {
      id: 'remove-action',
      accessorFn: (i) => i.ingredient.id,
      cell: (i) => (
        <button onClick={() => onRemove(i.getValue())} className="p-3 bg-slate-800 text-white rounded-md hover:bg-slate-700">
          -
        </button>
      ),
      header: () => <div className="w-32"></div>,
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
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
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
                <td key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default IngredientCalculatorTable;
