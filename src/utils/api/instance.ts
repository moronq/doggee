type BaseUrl = string
const baseUrl: BaseUrl = 'http://localhost:3001/'

export class API {
  readonly baseUrl: BaseUrl

  constructor(baseUrl: BaseUrl) {
    this.baseUrl = baseUrl
  }

  async request<T>(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'GET',
      credentials: 'same-origin',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(!!options?.headers && options.headers)
      }
    })

    if (!response.ok) throw new Error(response.statusText)

    const responseData = (await response.json()) as ApiResponse<T>
    return { data: responseData, status: response.status }
  }

  get<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  post(endpoint: string, body: Record<string, any>, options: RequestInit = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      ...(!!body && { body: JSON.stringify(body) })
    })
  }
}

export const api = new API(baseUrl)
