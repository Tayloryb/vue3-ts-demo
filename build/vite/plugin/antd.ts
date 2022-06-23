import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export function configAntPlugin() {
  return Components({
    resolvers: [AntDesignVueResolver()],
  })
}