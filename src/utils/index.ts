import type { App, Plugin } from 'vue'
import { isObject } from './is'
import { getCurrentInstance,ComponentInternalInstance } from 'vue'


export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

/**
 * Add the object as a parameter to the URL
 * @param {string} baseUrl url
 * @param {object} obj params
 * @returns encode url
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  if (/\?$/.test(baseUrl)) {
    return baseUrl + parameters
  } else if (/\?/.test(baseUrl)) {
    return baseUrl + '&' + parameters
  } else {
    return baseUrl.replace(/\/?$/, '?') + parameters
  }
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

/**
 * 获取vue上挂在的全局变量
 * @returns instance global config
 */
export function useGlobalConfig(){
  const instance:ComponentInternalInstance|null =getCurrentInstance()
  if(!instance){
    console.log('useGlobalConfig 必须得在setup里面整')
    return
  }
  return instance.appContext.config.globalProperties.$AILEMENTE || {}
}