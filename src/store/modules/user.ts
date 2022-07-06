import { UserInfo } from '/#/store'
import { defineStore } from 'pinia'

import { store } from '/@/store'
import { RoleEnum } from '/@/enums/roleEnum';

interface UserStore {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserStore => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    lastUpdateTime: 0
  }),
  getters: {
    getToken():string {
      return this.token || ''
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    }
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ?? ''
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}