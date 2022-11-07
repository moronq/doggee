import React from 'react'

import { useCache } from '@utils/contextes'

interface QueryConfig<K> {
  onSuccess?: (data: K) => void
  onFailure?: (error: Error) => void
}

export const useQuery = <K>(
  key: string,
  request: () => Promise<any>,
  deps: React.DependencyList = [],
  config?: QueryConfig<K>
) => {
  const { cache, setCache } = useCache()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [data, setData] = React.useState<K | null>(null)

  React.useEffect(() => {
    setIsLoading(true)
    try {
      if (cache[key]) {
        setData(cache[key])
        setIsLoading(false)
        return
      }
      request().then(async (response) => {
        if (config?.onSuccess) {
          config?.onSuccess(response.data)
        }
        setCache({ ...cache, [key]: response.data })
        setData(response.data)
        setIsLoading(false)
      })
    } catch (e) {
      if (config?.onFailure) {
        config?.onFailure(e as Error)
      }
      setError((e as Error).message)
      setIsLoading(false)
    }
  }, deps)

  return { data, error, isLoading }
}
