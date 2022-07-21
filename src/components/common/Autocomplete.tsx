import { useDebounceState } from '@/utils/hooks/userDebounceState';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { Fragment, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

interface Props<T> {
  onChange: (value: T) => void;
  onQuery: (query: string) => Promise<T[]>;
  getDisable?: (value: T) => boolean;
  getLabel: (value: T) => string;
  debounceTime?: number;
  minLength?: number;
  placeholder?: string;
  value?: T;
}

export function AutoComplete<T>({ onChange, onQuery, getLabel, debounceTime, getDisable, minLength, placeholder, value }: Props<T>) {
  minLength = minLength ?? 3;
  debounceTime = debounceTime ?? 200;

  const [query, setQuery] = useDebounceState<string>('', debounceTime);

  const [results, setResults] = useState<T[]>([]);

  const { refetch, isLoading } = useQuery(['autocomplete-query', query], async () => onQuery(query), {
    onSuccess: (data) => setResults(data),
  });

  // Filter the query to prevent overfetching
  useEffect(() => {
    //? Don't know why ts does not infer the non undefined type
    if (query?.length >= minLength!) {
      refetch();
    }
  }, [query, refetch, minLength]);

  return (
    <Combobox as="div" value={value} onChange={onChange} className="relative">
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={getLabel}
        placeholder={placeholder}
        required
        autoComplete="off"
        className="block px-2 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {!isLoading && query?.length > 0 && query?.length < minLength && (
        <span className="absolute right-2 bottom-4 italic">Minimum {minLength} characteres</span>
      )}
      {isLoading && <span className="absolute right-2 bottom-4 italic">Loading</span>}
      <Combobox.Options as="ul" className="absolute w-full text-sm rounded-md text-gray-700 dark:text-gray-200">
        {results.map((item, i) => (
          <Combobox.Option key={i} value={item} disabled={getDisable && getDisable(item)} as={Fragment}>
            {({ active, selected, disabled }) => (
              <li
                className={`
                ${disabled ? 'bg-gray-500 text-black' : active ? 'bg-blue-500 text-white' : 'bg-white text-black'}
                ${i === 0 && 'rounded-t-md mt-1'}
                ${i === results.length - 1 && 'rounded-b-md'}
                flex justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}>
                <span>{getLabel(item)}</span>
                {selected && <CheckIcon height="24px" width="24px" className="ml-3" />}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
