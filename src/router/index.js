import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function(/* { store, ssrContext } */) {
  const createHistory = createWebHistory;
  
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createWebHistory()
  });
  
  Router.beforeEach((to, from, next) => {
      // if (to.meta.needReplaceTitle) {
      //   const valueToReplace = to.params[to.meta.titleReplaceParam];
      //   to.meta.title = to.meta.title.replace(/(№)({{REPLACE}}|\d*)/, `$1${ valueToReplace }`);
      // }
      
      document.title = to.meta.title;
      next();
    }
  );
  
  return Router;
});
