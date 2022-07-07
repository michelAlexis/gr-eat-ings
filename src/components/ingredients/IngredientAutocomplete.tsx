import { inferQueryResponse } from '@/pages/api/trpc/[trpc]';
import { trpc } from '@/utils/trpc';
import { useDebounce } from '@/utils/userDebounce';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { FC, Fragment, useEffect, useState } from 'react';

type IngredientSearchResult = inferQueryResponse<'search-ingredient'>[number];
type IngredientOption = IngredientSearchResult | { name: string; id: null };

export const IngredientAutocomplete: FC = () => {
  const [selected, setSelected] = useState<IngredientSearchResult | null>(null);

  const [query, setQuery] = useState<string>('');

  const [results, setResults] = useState<IngredientOption[]>([]);

  // Debound the query to prevent too fast fetching
  const debouncedQuery = useDebounce(query, 300);

  const { refetch, isLoading } = trpc.useQuery(['search-ingredient', { query: debouncedQuery }], {
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

  return (
    <Combobox as="div" value={selected} onChange={setSelected} className="relative">
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(ingredient: IngredientOption) => ingredient?.name}
        placeholder="Search Ingredients..."
        required
        className="block px-2 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {isLoading && <span className="absolute right-2 bottom-4 italic">Loading</span>}
      <Combobox.Options as="ul" className="relative text-sm text-gray-700 dark:text-gray-200">
        {results.map((ingredient, i) => (
          <Combobox.Option key={i} value={ingredient} disabled={ingredient.id === null} as={Fragment}>
            {({ active, selected, disabled }) => (
              <li
                className={`${
                  disabled ? 'bg-gray-500 text-black' : active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                } flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}>
                <span>{ingredient.name}</span>
                {selected && <CheckIcon height="24px" width="24px" className="ml-3" />}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};
