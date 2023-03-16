import { ChangeEvent, useMemo } from 'react'

import debounce from 'lodash.debounce'
import './Search.css'


interface Search {
    setSearchValue : any
}
const Search = ({ setSearchValue } : Search) => {
  const handleSearch = ( { target }: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value)
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(handleSearch, 300),
    [])
  return (
    <div className='container_for_search'>
      <input className='input_for_search' placeholder='Search...' onChange={debouncedChangeHandler}/>
    </div>
  )
}

export default Search
