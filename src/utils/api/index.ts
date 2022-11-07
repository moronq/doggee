import { API } from './instance'

export * from './instance'
export * from './requests'

const baseUrl = 'https://api.thedogapi.com/v1/'
export const dogApi = new API(baseUrl)
