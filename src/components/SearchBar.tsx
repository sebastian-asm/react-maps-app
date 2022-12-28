import { ChangeEvent, useContext, useRef } from 'react';

import { PlacesContext } from '../context';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {
  const { searchPlacesByQuery } = useContext(PlacesContext);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const queryChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchPlacesByQuery(e.target.value);
    }, 500);
  };

  return (
    <div className="fixed top-16 left-2">
      <input
        onChange={queryChanged}
        type="text"
        className="rounded-lg p-2 w-48 shadow-md outline-none"
        placeholder="Buscar..."
      />

      <SearchResults />
    </div>
  );
};
