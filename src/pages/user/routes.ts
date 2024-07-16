import UserLogin from "./pages/UserLogin.vue";
import UserSign from "./pages/UserSign.vue";

export const routes = [
  {
    path: '/user/login',
    component: UserLogin
  },
  {
    path: '/user/sign',
    component: UserSign
  }
]