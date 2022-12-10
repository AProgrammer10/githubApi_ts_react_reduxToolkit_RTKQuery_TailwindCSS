import React, {useState, useEffect} from 'react'
import {useSearchUsersQuery, useLazyGetUserReposQuery} from '../store/github/github.api'
import {useDebounce} from '../hooks/useDebounce'
import {RepoCard} from '../components/RepoCard'

export function HomePage() {

  const [search, setSearch] = useState<string>('')
  const [dropdown, setDropdown] = useState<boolean>(false)
  
  const debounced = useDebounce(search)
  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })

  const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
  }, [debounced, data])

  const clickHandler = (username: string) => {
    fetchRepos(username)
    setDropdown(false)
  }

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen">
      {isError && <p className="text-center text-red-600">Error</p>}

      <div className='relative w-[900px] border'>
        <input type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="users search in github"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {dropdown && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[333px] shadow-md bg-white overflow-y-scroll">
          {isLoading && <p className="text-center">Loading...</p>}
          {data?.map(user => (
            <li
              key={user.id}
              onClick={() => clickHandler(user.login)}
              className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer">{user.login}</li>
          ))}
        </ul>}
        <div className="container">
            {areReposLoading && <p className="text-center">Repos are loading...</p>}
            {repos?.map(repo => <RepoCard repo={repo} key={repo.id} />) }
        </div> 
      </div>          
    </div>
  )
}