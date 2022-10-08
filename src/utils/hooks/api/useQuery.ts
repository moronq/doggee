import React from 'react'

export const useQuery = <K>(request: <T>() => Promise<any>, deps: React.DependencyList = []) => {
  const [status, setStatus] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [data, setData] = React.useState<K | null>(null)

  React.useEffect(() => {
    setIsLoading(true)
    try {
      request<K>().then(async (response) => {
        setStatus(response.status)
        setData(response.data)
        setIsLoading(false)
      })
    } catch (e) {
      setError((e as Error).message)
      setIsLoading(false)
    }
  }, deps)

  return { data, error, isLoading, status }
}
