import { API } from './instance'

export * from './instance'
export * from './requests'

const baseUrlApi: BaseUrl = 'http://localhost:3001/'
export const api = new API(baseUrlApi)
api.interceptors.response.use((res) => {
  if (res.body.success) {
    return {
      ...res,
      body: {
        data: res.body.data,
        status: res.status,
        success: res.body.success
      }
    }
  }
  return {
    ...res,
    body: { data: res.body.data, status: res.status, success: res.body.success }
  }
})

const baseUrlDogApi: BaseUrl = 'https://api.thedogapi.com/v1/'
export const dogApi = new API(baseUrlDogApi)
dogApi.interceptors.request.use((config) => ({ ...config, mode: 'no-cors' }))
