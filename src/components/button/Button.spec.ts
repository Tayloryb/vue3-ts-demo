
import ElButton from './elbutton.vue'
import { mount } from '@vue/test-utils'
describe('按钮测试', () => {
  it('按钮能够显示文本', () => {
    const content = '大圣小老弟'
    const wrapper = mount(ElButton, {
      slots: {
        default: content
      }
    })
    expect(wrapper.text()).toBe(content)
  })
  it('通过size属性控制大小', () => {
    const size = 'small'
    const wrapper = mount(ElButton, {
      props: {
        size
      }
    })
    // size内部通过class控制
    expect(wrapper.classes()).toContain('el-button--small')
  })

})