import React, { createContext, useCallback, useState, useContext } from 'react'

import Router from 'next/router'
import { IWork } from 'pages/api/works'

export interface WorksContextData {
  filterWorks: IWork[]
  search: string[]
  handleSetWorks(data: IWork[]): void
  handleSearch(data: string): void
  handleRemoveSearchLang(data: string): void
  handleRemoveAll(): void
}

const WorksContext = createContext<WorksContextData>({} as WorksContextData)

const WorksProvider: React.FC = ({ children }) => {
  const [works, setWorks] = useState<IWork[]>([])
  const [filterWorks, setFilterWorks] = useState<IWork[]>([])
  const [search, setSearch] = useState<string[]>([])

  const handleSetWorks = useCallback((data: IWork[]) => {
    setWorks(data)
  }, [])

  const handleSearch = useCallback(
    (lang: string) => {
      const data = filterWorks.length ? filterWorks : works
      const searchLang = search.concat(lang)

      const filter = data.filter((item) =>
        item.languages.join(', ').includes(searchLang.join(', '))
      )

      setSearch(searchLang)
      setFilterWorks(filter)
    },
    [search, works]
  )

  const handleRemoveSearchLang = useCallback(
    (lang: string) => {
      const searchIndex = search.findIndex((item) => item === lang)
      const removeSearch = search.slice(0, searchIndex)

      const filter = works.filter((item) =>
        item.languages.join(', ').includes(removeSearch.join(', '))
      )

      setFilterWorks(filter)
      setSearch(search.slice(0, searchIndex))
    },
    [works, search]
  )

  const handleRemoveAll = useCallback(() => {
    setFilterWorks([])
    setSearch([])
  }, [])

  return (
    <WorksContext.Provider
      value={{
        filterWorks,
        search,
        handleSetWorks,
        handleSearch,
        handleRemoveSearchLang,
        handleRemoveAll,
      }}
    >
      {children}
    </WorksContext.Provider>
  )
}

function useWorks(): WorksContextData {
  const context = useContext(WorksContext)

  if (!context) {
    throw new Error(' useWorks must be used within an WorksProvider ')
  }
  return context
}
export { WorksProvider, useWorks }
