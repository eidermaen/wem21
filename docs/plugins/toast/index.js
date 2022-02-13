import {Toast} from '~/plugins/toast/Toast';
import './styles.css';

export default (context, inject) => {
  inject('toaster', (title, message, options) => {
    return Toast.createToast(title, message, options);
  });
}
