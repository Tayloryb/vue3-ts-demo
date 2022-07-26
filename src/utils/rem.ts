// rem等比适配配置文件
// 基准大小，注意此值要与 postcss.config.js文件中的rootValue保持一致
const baseSize = 37.5
//设置rem函数
function setRem() {
  //当前页面宽度相对于375宽的缩放比例，可根据自己需要修改,一般设计稿都是宽750(图方便可以拿到设计图后改过来)。
  const scale = document.documentElement.clientWidth / 375 //设置页面根节点字体大小（“Math.min(scale,2)”指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
//初始化
setRem()
//改变窗口大小时重新设置rem
window.onresize = function () {
  setRem()
}

export { }