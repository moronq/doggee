import React from 'react'

export const useMutation = <T, K>(request: (body: T) => Promise<any>) => {
  const [status, setStatus] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const mutation = React.useCallback(async (body: T): Promise<ApiResponse<K>> => {
    setIsLoading(true)
    try {
      return await request(body).then(async (response) => {
        setStatus(response.status)
        console.log(body)
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
  return { mutation, error, isLoading, status }
}
