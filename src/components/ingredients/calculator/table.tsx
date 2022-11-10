import { IngredientDetail, Quantity } from '@/models/ingredient.model';
import { mapKcal, reduceNutrition } from '@/utils/ingredient.utils';
import { LinkIcon, MinusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { FC } from 'react';
import QuantityInput from '../Quantity.input';

export const NewIngredientCalculatorTable: FC<{
  data: { ingredient: IngredientDetail; quantity: Quantity }[];
  onQuantityUpdate: (rowIndex: number, value: number) => void;
  onRemove: (id: string) => void;
}> = ({ data, onRemove, onQuantityUpdate: onUpdate }) => {
  return (
    <div className="p-2">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Ingredient</th>
            <th className="text-left">Quantity</th>
            <th className="text-right w-60 md:w-40 sm:w-20">Kcal</th>
            <th className="text-left w-40 md:w-20 sm:w-11"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <TableRow key={d.ingredient.id} {...d} onRemove={onRemove} onQuantityChange={(v) => onUpdate(i, v ?? 0)} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td className="text-right">
              <span className="font-bold">{reduceNutrition(data, 'kcal')} kcal</span>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const TableRow: FC<{
  ingredient: IngredientDetail;
  quantity: Quantity;
  onRemove: (id: string) => void;
  onQuantityChange: (q: number | undefined) => void;
}> = ({ ingredient, quantity, onRemove, onQuantityChange }) => {
  return (
    <tr>
      {/* Ingredient link */}
      <td className="pr-4">
        <div className="flex justify-between">
          <Link href={`/ingredients/${ingredient.id}`}>
            <a className="hover:text-blue-400 hover:border-b border-blue-400">
              <span className="mr-2">{ingredient.name}</span>
              <LinkIcon height="1rem" className="inline-flex" />
            </a>
          </Link>
          <span className="text-gray-400 text-sm pr-3">
            {ingredient.kcal ? `(${ingredient.kcal} kcal / ${ingredient.quantityRef} ${ingredient.unitRef})` : ''}
          </span>
        </div>
      </td>

      {/* Quantity inpu */}
      <td className="pr-4">
        <QuantityInput defaultValue={quantity} onChange={onQuantityChange} />
      </td>

      {/* Kcal */}
      <td className="pl-4 text-right">{ingredient.kcal ? mapKcal(ingredient.quantityRef, ingredient.kcal, quantity.quantity) : '?'}</td>

      {/* Remove action */}
      <td className="pl-4 text-right">
        <button onClick={() => onRemove(ingredient.id)} className="p-3 bg-slate-800 text-white rounded-md hover:bg-slate-700">
          <MinusIcon height={20} width={20} />
        </button>
      </td>
    </tr>
  );
};
