import { AxiosError, AxiosInstance } from 'axios'

const defaultDelay = {
  waitTime: 3000,
  count: 5
}

export class AxiosRetry {
  /**
   * axios retry again
   * @param instance
   * @param error 
   */
  retry(instance: AxiosInstance, error: AxiosError) {
    // @ts-ignore
    const { config } = error.response
    const { waitTime, count } = config?.requestOptions?.retryRequest || defaultDelay
    config._retryCount = config._retryCount || 0
    if (config._retryCount >= count) {
      return Promise.reject(error)
    }
    config._retryCount += 1
    return this.delay(waitTime).then(() => instance(config))
  }

  private delay(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime))
  }
}