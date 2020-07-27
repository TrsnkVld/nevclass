import VueRouter from "vue-router";
import { mergeObjects } from "@/utils/utils";
import store from "../store/index";
import routes from "./routes";

const router = new VueRouter({
  mode: "history",
  //base: process.env.BASE_URL,
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes,
});
let lastActionName = null;

router.beforeResolve((to, from, next) => {
  next();
  // setTimeout(() => {
   
  // }, 800);
});

router.beforeEach((to, from, next) => {
  store.state.isPreloaderShowing = true;
  store.state.isMapLoaded = false;
  store.state.isMapLoading = false;

  if (store.state.firtTimeLoad) {
    store.state.isPreloaderShowing = true;
    store.state.isPreloaderLogoShowing = true;
    document.documentElement.classList.add("locked");
    store.state.firtTimeLoad = false;
  }

  const loaded = { user: true, page: false };
  const setLoaded = (mode) => {
    loaded[mode] = true;
    if (loaded.page) {
      next();
    }
  };

  // 1. загружаем данные юзаера (некэшируемые), они не зависят от роута:
  /*if (!to.meta || !to.meta['noAuth']) {
        store.dispatch('fetchUser').then(() => {
            setLoaded("user");
        }).catch(() => {
            // здесь не вызываем next() - его вызовем ниже после получения fetchPage
            ("User data is empty...");
            /!*router.push(<RawLocation>{
                name: "auth", params: {
                    redirect: to.name
                }
            });*!/
        });
    }
    else setLoaded("user");*/

  // 2. загружаем данные текущего роута (кэшируемые), в т.ч. common данные:
  if (to.meta && to.meta.api) {
    //to сохраняем в state потому что используется в мутациях
    //store.dispatch('route', to);
    // let params = Object.assign({}, {name: to.meta.api, params: to.params}, to.meta);// this works only with target:es6, but we need IE11

    lastActionName = to.meta.api;
    let params = mergeObjects(
      {},
      { action: to.meta.api, method: to.meta.method, params: to.params },
      to.meta
    );
    store
      .dispatch("fetchPage", params)
      .then(() => {
        //console.log("Fetched "+to.meta.controller);
        setLoaded("page");
      })
      .catch((err) => {
        console.error("Could not fetch API data: ", err);
        //next();
      });
  } else setLoaded("page");
});

router.afterEach((to, from) => {
  window.scrollTo({
    behavior: "auto",
    left: 0,
    top: 0,
  });
  store.state.isCardOpened = false;

  let elements = document.querySelectorAll(".aos-animate");
  elements.forEach((element) => element.classList.remove("aos-animate"));
  store.state.isPreloaderLogoShowing = false;
  document.documentElement.classList.remove("locked");
  store.state.isPreloaderShowing = false;
  elements.forEach((element) => element.classList.add("aos-animate"));

  // небольшая задержка, чтобы в браузере сменился URL
  setTimeout(() => {
    // сообщаем пре-рендереру, что страница загрузилась:
    document.dispatchEvent(new Event("render-event"));
  }, 800);
});

export default router;
