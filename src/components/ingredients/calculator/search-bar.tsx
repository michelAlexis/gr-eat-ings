import { IngredientSearchResult, Quantity } from '@/models/ingredient.model';
import { useDebounce } from '@/utils/hooks/userDebounce';
import { getDefaultQuantity } from '@/utils/ingredient.utils';
import { trpc } from '@/utils/trpc';
import { Combobox } from '@headlessui/react';
import { CheckIcon, PlusIcon } from '@heroicons/react/solid';
import { FC, Fragment, useEffect, useState } from 'react';
import QuantityInput, { QuantityOrEmpty } from '../Quantity.input';

export type IngredientOption = IngredientSearchResult | { name: string; id: null; kcal: null };

export type OnAddParams = { id: string; quantity: Quantity };

interface Props {
  onAdd: (_: OnAddParams) => void;
}

export const IngredientCalculatorSearchBar: FC<Props> = ({ onAdd }) => {
  const [selected, setSelected] = useState<IngredientSearchResult | null>(null);
  const [quantity, setQuantity] = useState<QuantityOrEmpty>({
    quantity: getDefaultQuantity('gr'),
    unit: 'gr',
  });

  const [query, setQuery] = useState<string>('');

  const [results, setResults] = useState<IngredientOption[]>([]);

  // Debound the query to prevent too fast fetching
  const debouncedQuery = useDebounce(query, 300);

  const { refetch, isLoading } = trpc.useQuery(['ingredients.search', { query: debouncedQuery }], {
    keepPreviousData: true,
    enabled: false,
    onSuccess: (r) => {
      // Add the 'No result' option
      if (r.length == 0) {
        setResults([
          {
            id: null,
            name: 'No result found',
            kcal: null,
          },
        ]);
      } else {
        setResults(r);
      }
    },
  });

  // Filter the query to prevent overfetching
  useEffect(() => {
    setResults([]);
    if (debouncedQuery?.length > 2) {
      refetch();
    }
  }, [debouncedQuery, refetch]);

  const onIngredientSelect = (v: IngredientSearchResult | null) => {
    setSelected(v);
    if (v && v.unitRef !== quantity.unit) {
      setQuantity({ quantity: getDefaultQuantity(v.unitRef), unit: v.unitRef });
    }
  };

  const validate = () => {
    if (selected && quantity.quantity !== undefined && quantity.quantity !== 0) {
      onAdd({ id: selected.id, quantity: { unit: quantity.unit, quantity: quantity.quantity } });
      setSelected(null);
      setQuery('');
    }
  };

  return (
    <div className="flex justify-between">
      <Combobox as="div" value={selected} onChange={onIngredientSelect} className="relative grow">
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(ingredient: IngredientOption) => ingredient?.name}
          placeholder="Search Ingredients..."
          required
          autoComplete="off"
          className="block px-2 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {!isLoading && query?.length > 0 && query?.length < 3 && (
          <span className="absolute right-2 bottom-4 italic">Minimum 3 characteres</span>
        )}
        {isLoading && <span className="absolute right-2 bottom-4 italic">Loading</span>}
        <Combobox.Options as="ul" className="absolute w-full text-sm rounded-md text-gray-700 dark:text-gray-200">
          {results.map((ingredient, i) => (
            <Combobox.Option key={i} value={ingredient} disabled={!ingredient.id} as={Fragment}>
              {({ active, selected, disabled }) => (
                <li
                  className={`
                ${disabled ? 'bg-gray-500 text-black' : active ? 'bg-blue-500 text-white' : 'bg-white text-black'}
                ${i === 0 && 'rounded-t-md mt-1'}
                ${i === results.length - 1 && 'rounded-b-md'}
                flex justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}>
                  <span>{ingredient.name}</span>
                  {ingredient.kcal && <span className="text-gray-100">{ingredient.kcal} kcal</span>}
                  {selected && <CheckIcon height="24px" width="24px" className="ml-3" />}
                </li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
      <QuantityInput value={quantity} onChange={(v) => setQuantity((q) => ({ ...q, quantity: v.length === 0 ? undefined : +v }))} />
      {/* <div className="relative group">
        <input
          type="number"
          min={0}
          value={quantity.quantity}
          onChange={(e) => setQuantity((q) => ({ ...q, quantity: e.target.value.length === 0 ? '' : +e.target.value }))}
          className="form-control block w-full px-2 py-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {quantity && <span className="absolute right-2 bottom-4 italic group-hover:mr-5 group-focus:mr-5">{quantity.unit}</span>}
      </div> */}
      <button onClick={validate} className="">
        <PlusIcon height="1.25rem" width="1.25rem" className="hover:cursor-pointer hover:text-gray-200" />
      </button>
    </div>
  );
};

export default IngredientCalculatorSearchBar;
