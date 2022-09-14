/**
 * eventBus
 * @description 事件总线
 * @author zyb
 */
import mitt from 'mitt'

export type BusEvents = {
  validate: undefined
}

export const emitter = mitt<BusEvents>()
