import Vue from 'vue';
import {Toast, ToastOptions} from '~/plugins/toast/Toast';

declare module 'vue/types/vue' {
  interface Vue {
    $toaster(title: string, message?: string, options?: ToastOptions): Toast
  }
}
