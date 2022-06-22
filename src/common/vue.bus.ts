/**
 * eventBus
 * @description 事件总线简易实现
 * @author zyb
 */
class Bus {
  private list: { [key: string]: Array<Function> }
  constructor() {
    this.list = {}
  }

  $on(name: string, fn: Function) {
    this.list[name] = this.list[name] || []
    this.list[name].push(fn)
  }

  $emit(name: string, data?: any) {
    if (this.list[name]?.length) {
      this.list[name].forEach((fn: Function) => {
        fn(data)
      })
    }
  }

  $off(name:string, fn?: Function) {
    if (this.list[name]) {
      if (fn) {
        const idx = this.list[name].findIndex(func => func === fn)
        if (idx >= 0) {
          this.list[name].splice(idx, 1)
        }
      } else {
        delete this.list[name]
      }
    }
  }

  getList() {
    console.log(this.list)
  }
}

export default new Bus()