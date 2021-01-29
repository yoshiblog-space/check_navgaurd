import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const TestComponent = { // アクセスさせない画面を持つコンポーネント
  render: function (h) {
    return h('div', 'hello ' + this.$route.params.id)
  },
  beforeRouteEnter(to, from, next) { // [3]
    console.log('component: beforeRouteEnter');
    next();
  },
  beforeRouteUpdate(to, from, next) { // [4]
    console.log('component: beforeRouteUpdate');
    console.log(to.params.id)
    if (to.params.id === 'hanako'){
      alert("ハナコぉぉぉ");
      next('/');
    }else{
      next();
    }

  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/about',
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter: (to, from, next) => { // [2]
      console.log('router: beforeEnter');

      next();
    }
  },
  {
    path: '/user/:id', component: TestComponent, 
    beforeEnter: (to, from, next) => { // [2]
      console.log('router: beforeEnter');
      
      next();
    }
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => { // [1]
  console.log('global: beforeEach');
  
  next();
});
export default router;
