import React, {useState} from 'react'
import {IRepo} from '../models/models'
import {useActions} from '../hooks/actions'
import {useAppSelector} from '../hooks/redux'

export function RepoCard({repo}: {repo: IRepo}){

  const {addFavorites, removeFavorites} = useActions()
  const {favorites} = useAppSelector(state => state.github)

  const [isFav, setIsFav] = useState(favorites.includes(repo.html_url))

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addFavorites(repo.html_url)
    setIsFav(true)
  }

  const removeFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    removeFavorites(repo.html_url)
    setIsFav(false)
  }

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-1">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>

        {!isFav && <button 
          className="py-2 px-4 bg-yellow-300 ml-2 rounded hover:shadow-md transition-all"
          onClick={addToFavorite}
        >Add</button>}

        {isFav && <button 
          className="py-2 px-4 bg-red-300 mr-2 rounded hover:shadow-md transition-all"
          onClick={removeFavorite}
        >Remove</button>}
      </a>
      
    </div>
  )
}