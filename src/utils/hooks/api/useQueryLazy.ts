import React from 'react'

export const useQueryLazy = <K>(request: () => Promise<any>) => {
  const [status, setStatus] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const query = React.useCallback(async (): Promise<ApiResponse<K>> => {
    setIsLoading(true)
    try {
      return await request().then(async (response) => {
        setStatus(response.status)
        setIsLoading(false)
        return response.data
      })
    } catch (e) {
      setError((e as Error).message)
      return { success: false, data: { message: (e as Error).message } }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { query, error, isLoading, status }
}
