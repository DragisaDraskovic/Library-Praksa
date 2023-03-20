import React, { ChangeEvent, useMemo } from 'react'

import debounce from 'lodash.debounce'
import './Search.css'


interface SearchProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
const Search = ({ setSearchValue } : SearchProps) => {

  const handleSeach = ({ target }: ChangeEvent<HTMLInputElement>) =>{
    setSearchValue(target.value)
  }
  const debouncedChangeHandler = useMemo(
    () => debounce(handleSeach, 300),
    []
  )

  return (
    <div className='container_for_search'>
      <input className='input_for_search' placeholder='Search...' onChange={debouncedChangeHandler}/>
    </div>
  )
}

export default Search
