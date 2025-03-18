import { defineModule } from '@directus/extensions-sdk';
import ModuleComponent from './module.vue';

export default defineModule({
  id: 'wellcome-message',
  name: 'Wellcome Message',
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