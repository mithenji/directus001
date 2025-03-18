import { defineModule } from '@directus/extensions-sdk';
import ModuleComponent from './module.vue';

export default defineModule({
  id: 'wellcome-page',
  name: 'Wellcome Page',
  icon: 'home',
  routes: [
    {
      path: '',
      component: ModuleComponent
    }
  ],
  navItem: {
    name: '欢迎',
    icon: 'home',
    order: -1
  }
});