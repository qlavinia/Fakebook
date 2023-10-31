import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import PrivateSection from '@/views/PrivateSection.vue'

const messagesSourceEnum = {
  PUBLIC: 'public',
  FRIENDS: 'friends',
  OWN: 'own',
};

const routes = [
  { 
    path: '/', 
    name: 'public', 
    component: () => import('@/components/Messages.vue'),
    props: (route) => ( {page : parseInt(route.query.page) || 1, sourcePage : messagesSourceEnum.PUBLIC} )
  },
  { 
    path: '/private', 
    name: 'private', 
    component: PrivateSection, 
    meta: {
      requiresAuth: true 
    }
  },
  { path: '/register', name: 'register', component: () => import('@/views/RegisterUser.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginUser.vue') },
  { path: '/registrationConfirmation', name: 'registrationConfirmation', component: () => import('@/views/RegistrationConfirmation.vue') },
  { path: '/createMessage', name: 'createMessage', component: () => import('@/views/CreateMessage.vue') },
  { path: '/user/:userId', name: 'user', component: () => import('@/views/UserDisplay.vue') },
  { path: '/friends', name: 'friends', component: () => import('@/views/Friends.vue') },
  { 
    path: '/wall', 
    name: 'wall', 
    component: () => import('@/components/Messages.vue') ,
    props: (route) => ( {page : parseInt(route.query.page) || 1, sourcePage : messagesSourceEnum.FRIENDS} )
  },
  { 
    path: '/posts', 
    name: 'posts', 
    component: () => import('@/components/Messages.vue') ,
    props: (route) => ( {page : parseInt(route.query.page) || 1, sourcePage : messagesSourceEnum.OWN} )
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  //linkActiveClass: 'active-route'         
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {

    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated; 
    console.log('autentificat??????' + isAuthenticated);
    
    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router

// router.beforeEach(async (to) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/', '/login', '/register', '/registrationConfirmation'];
//   const authRequired = !publicPages.includes(to.path);
//   const auth = useAuthStore();

//   if (authRequired && !auth.user) {
//     auth.returnUrl = to.fullPath;
//     return '/login';
//   }
// });

