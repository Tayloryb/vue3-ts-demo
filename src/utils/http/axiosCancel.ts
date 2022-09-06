import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'
import qs from 'qs'
import { isFunction } from '/@/utils/is'

let pendingMap = new Map<string, Canceler>()

/**
 * 
 * @param {object} config 
 * @returns url
 */
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&')

export class AxiosCanceler {
  /**
   * add request into pendingMap
   * @param {object: AxiosRequestConfig} config axios config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
      if (!pendingMap.has(url)) {
        pendingMap.set(url, cancel)
      }
    })
  }

  /**
   * remove reuqest from pendingMap
   * @param {object} config axios config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  /**
   * remove all request
   * 
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  reset():void {
    pendingMap = new Map<string, Canceler>()
  }
}