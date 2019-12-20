import Vue from 'vue'
import Router from 'vue-router'
let menu = []
for (let value of JSON.parse(sessionStorage.menu)) {
  if (value.router_json.length > 0) {
    let routerJson = JSON.parse(value.router_json)
    let routerMenu = { path: routerJson.path, props: {formid: value.form_id, extra: routerJson.extra} }
    routerMenu.component = resolve => require(['../view/workbench/' + routerJson.component + '.vue'], resolve)
    if (routerJson.child) {
      routerMenu.children = []
      for (let val of routerJson.child) {
        let routerChild = { path: val.path }
        routerChild.component = resolve => require(['../view/workbench/' + val.component + '.vue'], resolve)
        routerChild.props = true
        routerMenu.children.push(routerChild)
      }
    }
    menu.push(routerMenu)
  }
}

if (menu.length !== 0) {
  let index = Object.assign({}, menu[0], {})
  index.path = '/'
  menu.push(index)
}
let extra = {path: '/*', component: resolve => require(['../view/workbench/errorpage/errorTwo.vue'], resolve)}
menu.push(extra)

console.log(menu)
Vue.use(Router)
export default new Router({
  routes: [
    ...menu
  ]
})
