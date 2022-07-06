<template>
  <div class="layout-menu flex-shink-0">
    <a-menu id="layout-menu" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys">
      <a-menu-item v-for="(menu, index) in menuList" :key="`layout_menu_${menu.id}_${index}`"
        @click="changeRoute(menu)">
        {{ menu.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { getCurrentRoute, useGo } from '/@/hooks/web/usePage';

interface Menu {
  name: string,
  id: number,
  children: Menu[],
  icon?: string,
  link: string,
}

export default defineComponent({
  components: {},
  name: 'BasicLayoutMenu',
  setup() {
    const go = useGo()
    /**菜单 */
    const menuList: Menu[] = [
      {
        name: 'test1',
        id: 1,
        children: [],
        link: '/home/'
      }
    ]
    const links: string[] = ['temp', 'temp1', 'temp2', 'temp3', 'temp4']
    for (let i = 0; i < 5; i++) {
      const menu = {
        name: `menu_${i}`,
        id: i + 1,
        children: [],
        link: links[i]
      }
      menuList.push(menu)
    }

    const openKeys = ref<string[]>([]);
    const selectedKeys = ref<string[]>([]);

    watch(selectedKeys, (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })

    const changeRoute = (menu: Menu) => {
      console.log('menu.link :>> ', menu.link);
      go(menu.link)
    }

    onMounted(() => {
      const currentRoute = getCurrentRoute()
      menuList.forEach((menu, idx) => {
        let path = menu.link.split('?')[0];
        if (path.endsWith('/')) {
          path = path.slice(0, -1)
        }
        if (path === currentRoute.path) {
          selectedKeys.value.push(`layout_menu_${menu.id}_${idx}`)
        }
      })
    })

    return {
      menuList,
      openKeys,
      selectedKeys,
      changeRoute
    }
  }
})
</script>
<style lang="less">
.layout-menu {
  width: 200px;
}
</style>