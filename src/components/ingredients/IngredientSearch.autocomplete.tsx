import { useDebounce } from '@/utils/hooks/userDebounce';
import { InferQueryOutput, trpc } from '@/utils/trpc';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { FC, Fragment, useEffect, useState } from 'react';

type IngredientSearchResult = InferQueryOutput<'ingredients.search'>[number];
type IngredientOption = IngredientSearchResult | { name: string; id: null };

interface Props {
  onChange: (id: string | null) => void;
}

export const IngredientAutocomplete: FC<Props> = ({ onChange }) => {
  const [selected, setSelected] = useState<IngredientSearchResult | null>(null);

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

  const handleOnChange = (v: IngredientSearchResult | null) => {
    setSelected(v);
    onChange(v?.id ?? null);
  };

  return (
    <Combobox as="div" value={selected} onChange={handleOnChange} className="relative">
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
                {selected && <CheckIcon className="ml-3" />}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};
