import { api } from '@utils/api'

export const createRegistration = ({ params, config }: ApiParams<RegistrationReqPostParams>) =>
  api.post<ApiResponse<User>>('registration', params, config)
