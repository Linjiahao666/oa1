import UserLogin from "./pages/UserLogin.vue";
import UserSign from "./pages/UserSign.vue";
import Auth from './pages/Auth.vue';

export const routes = [
  {
    path: '/user/login',
    component: UserLogin
  },
  {
    path: '/user/sign',
    component: UserSign
  },
  {
    path: '/user/auth',
    component: Auth
  }
]