import { IngredientUnit } from '@prisma/client';
import { FC } from 'react';

export type QuantityOrEmpty<U extends IngredientUnit = IngredientUnit> = { quantity: number | undefined; unit: U };

interface Props {
  value?: QuantityOrEmpty;
  defaultValue?: QuantityOrEmpty;
  onChange: (v: string) => void;
  className?: string;
}

export const QuantityInput: FC<Props> = ({ value, defaultValue, onChange, className }) => {
  return (
    <div className="relative group">
      <input
        type="number"
        min={0}
        value={value?.quantity}
        defaultValue={defaultValue?.quantity}
        onChange={(e) => onChange(e.target.value)}
        className={`form-control block w-full px-2 py-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 
        focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      />
      {(value || defaultValue) && (
        <span className="absolute right-2 bottom-4 italic group-hover:mr-5 group-focus:mr-5 next-to-input-focus">
          {value?.unit || defaultValue?.unit}
        </span>
      )}
    </div>
  );
};

export default QuantityInput;
