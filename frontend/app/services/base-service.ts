import { API_URL } from '@/constants/General'

export class BaseService {
  protected readonly apiURL: string

  constructor() {
    const apiURL = API_URL
    this.apiURL = apiURL
  }
}
