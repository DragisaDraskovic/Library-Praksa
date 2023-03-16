import { ChangeEvent, useMemo } from 'react'

import debounce from 'lodash.debounce'
import './Search.css'


interface Search {
    dataBooks: (value: string) => void
}
const Search = ({ dataBooks } : Search) => {

  const handleSearch = ( { target }: ChangeEvent<HTMLInputElement>) => {
    debounce(() => dataBooks(target.value), 300)
  }

  // const debouncedChangeHandler:ChangeEvent<HTMLInputElement>, = useMemo(
    // () => debounce(setSearchValue(target.value), 300),
    // [])
  return (
    <div className='container_for_search'>
      <input className='input_for_search' placeholder='Search...' onChange={handleSearch}/>
    </div>
  )
}

export default Search
