export enum ToastVariant {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
};

export interface ToastOptions {
  autoDestroy?: boolean;
  timeout?: number;
  variant?: ToastVariant;

  onClose?(): any;
};

interface ToastData {
  [key: string]: HTMLElement
}

const CREATED_TOASTS: ToastData = {};

export class Toast {

  private readonly id: string;
  private readonly title: string;
  private readonly message?: string;
  private readonly options: ToastOptions;
  private readonly elem: HTMLElement;
  private timeout?: NodeJS.Timeout;

  private constructor(title: string, message?: string, options?: ToastOptions) {
    // ID between 0 and 100
    this.id = 'toast-' + String(Math.floor(Math.random() * 101));
    this.title = title;
    this.message = message;

    this.options = {
      autoDestroy: typeof options?.autoDestroy !== 'undefined' ? options?.autoDestroy : true,
      timeout: options?.timeout || 5000,
      variant: options?.variant || ToastVariant.INFO,
      onClose: options?.onClose || undefined,
    }

    this.elem = this.generateHTML();
  }

  public static createToast(title: string, message?: string, options?: ToastOptions): Toast {
    return new Toast(title, message, options);
  }

  public show() {
    CREATED_TOASTS[this.id] = this.elem;
    document.body.appendChild(this.elem);

    setTimeout(() => {
      this.elem.classList.toggle('toaster-hide');
      this.shiftToasts();
    }, 10);

    if (this.options.autoDestroy) {
      this.timeout = setTimeout(() => {
        this.destroy();
      }, this.options.timeout);
    }
  }

  public destroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.elem.classList.toggle('toaster-hide');

    setTimeout(() => {
      document.body.removeChild(this.elem);
      delete CREATED_TOASTS[this.id];
    }, 500);
  }

  private generateHTML(): HTMLElement {
    const div = document.createElement('div');
    div.id = this.id;
    this.addStyles(div);

    const containerElem = document.createElement('div');
    containerElem.classList.add('container');

    const titleElem = document.createElement('div');
    titleElem.classList.add('title');
    titleElem.textContent = this.title;

    const closeElem = document.createElement('div');
    closeElem.classList.add('close-icon');
    closeElem.textContent = `X`;

    closeElem.onclick = () => {
      if (this.options.onClose) {
        this.options.onClose();
      } else {
        this.destroy();
      }
    };

    containerElem.append(titleElem, closeElem);

    if (this.message) {
      const messageElem = document.createElement('div');
      messageElem.innerHTML = `<hr><div class="content">${this.message}</div>`;
      containerElem.appendChild(messageElem);
    }

    div.appendChild(containerElem);

    return div;
  }

  private addStyles(elem: HTMLElement) {
    let variantStyle = '';

    switch (this.options.variant) {
      case ToastVariant.SUCCESS:
        variantStyle = 'toaster-success';
        break;
      case ToastVariant.WARNING:
        variantStyle = 'toaster-warning';
        break;
      case ToastVariant.INFO:
        variantStyle = 'toaster-info';
        break;
      case ToastVariant.ERROR:
        variantStyle = 'toaster-error';
        break;
    }

    elem.classList.add('toaster', 'toaster-hide', variantStyle);
  }

  private shiftToasts() {
    const currentHeight = this.elem.offsetHeight;
    const padding = 10;

    for (let key in CREATED_TOASTS) {
      if (key !== this.id) {
        const el = CREATED_TOASTS[key];
        const style = window.getComputedStyle(el);
        const matrix = new DOMMatrixReadOnly(style.transform);
        el.style.transform = `translateY(${matrix.m42 + currentHeight + padding}px)`;
      }
    }
  }
}
