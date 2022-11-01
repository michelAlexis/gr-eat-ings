import { IngredientSearchResult, Quantity } from '@/models/ingredient.model';
import { useFocus } from '@/utils/hooks/useFocus';
import { useDebounce } from '@/utils/hooks/userDebounce';
import { getDefaultQuantity } from '@/utils/ingredient.utils';
import { trpc } from '@/utils/trpc';
import { Combobox } from '@headlessui/react';
import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { FC, Fragment, useEffect, useState } from 'react';
import QuantityInput, { QuantityOrEmpty } from '../Quantity.input';

export type OnAddParams = { id: string; quantity: Quantity };

interface Props {
  exclude: string[];
  onAdd: (_: OnAddParams) => void;
}

export const IngredientCalculatorSearchBar: FC<Props> = ({ exclude, onAdd }) => {
  const [selected, setSelected] = useState<IngredientSearchResult | null>(null);
  const [quantity, setQuantity] = useState<QuantityOrEmpty>({
    quantity: getDefaultQuantity('gr'),
    unit: 'gr',
  });

  const [query, setQuery] = useState<string>('');
  const [inputRef, setInputFocus] = useFocus();
  const [quantityRef, setQuantityFocus] = useFocus();

  // Debound the query to prevent too fast fetching
  const debouncedQuery = useDebounce(query, 300);

  const { data, refetch, isLoading } = trpc.useQuery(['ingredients.search', { query: debouncedQuery, exclude }], {
    keepPreviousData: true,
    enabled: false,
  });

  const results = data ?? [];

  const minQueryLenght = 3;

  // Filter the query to prevent overfetching
  useEffect(() => {
    if (debouncedQuery.length >= minQueryLenght) {
      refetch();
    }
  }, [debouncedQuery, refetch]);

  const onIngredientSelect = (v: IngredientSearchResult | null) => {
    setSelected(v);
    if (v && v.unitRef !== quantity.unit) {
      setQuantity({ quantity: getDefaultQuantity(v.unitRef), unit: v.unitRef });
      setQuantityFocus();
    }
  };

  const validate = () => {
    if (selected && quantity.quantity !== undefined && quantity.quantity !== 0) {
      onAdd({ id: selected.id, quantity: { unit: quantity.unit, quantity: quantity.quantity } });
      setSelected(null);
      setQuery('');
      setInputFocus();
    }
  };

  return (
    <div className="flex justify-between gap-1">
      <Combobox as="div" value={selected} onChange={onIngredientSelect} className="relative grow">
        <Combobox.Input
          ref={inputRef}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(ingredient: IngredientSearchResult) => ingredient?.name}
          placeholder="Search Ingredients..."
          required
          autoComplete="off"
          className="block px-2 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {!isLoading && query?.length > 0 && query?.length < minQueryLenght && (
          <span className="absolute right-2 bottom-4 italic">Minimum {minQueryLenght} characteres</span>
        )}
        {isLoading && <span className="absolute right-2 bottom-4 italic">Loading</span>}
        <Combobox.Options as="ul" className="absolute w-full text-sm rounded-md text-gray-700 dark:text-gray-200">
          {results.length === 0 && !isLoading && query.length >= minQueryLenght && <NoResultOption />}
          {results.length > 0 &&
            results.map((ingredient, i) => (
              <IngredientOption key={i} ingredient={ingredient} first={i === 0} last={i === results.length - 1} />
            ))}
        </Combobox.Options>
      </Combobox>
      <QuantityInput ref={quantityRef} value={quantity} onChange={(v) => setQuantity((q) => ({ ...q, quantity: v }))} />
      <button onClick={validate} className="p-3 bg-violet-700 text-white rounded-md hover:cursor-pointer hover:text-gray-200">
        <PlusIcon height="1.25rem" width="1.25rem" />
      </button>
    </div>
  );
};

const NoResultOption: FC = () => {
  return (
    <Combobox.Option value={null} disabled={true} as={Fragment}>
      {() => (
        <li
          className={clsx(
            'bg-gray-500 text-black',
            'rounded-t-md mt-1',
            'rounded-b-md',
            'flex justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
          )}>
          <span>No ingredient found..</span>
        </li>
      )}
    </Combobox.Option>
  );
};

const IngredientOption: FC<{ ingredient: IngredientSearchResult; first: boolean; last: boolean }> = ({ ingredient, first, last }) => {
  return (
    <Combobox.Option value={ingredient} as={Fragment}>
      {({ active, selected }) => (
        <li
          className={clsx(
            active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black',
            first && 'rounded-t-md mt-1',
            last && 'rounded-b-md',
            'flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
          )}>
          <span className="flex-1">{ingredient.name}</span>
          {ingredient.kcalRef && (
            <span>
              {ingredient.kcalRef} kcal / {ingredient.quantityRef} {ingredient.unitRef}
            </span>
          )}
          {selected && <CheckIcon className="h-5 w-5 ml-3" />}
        </li>
      )}
    </Combobox.Option>
  );
};

export default IngredientCalculatorSearchBar;
