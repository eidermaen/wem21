import {ToastVariant} from '~/plugins/toast/Toast';

export default {
  title: 'Homepage/Toast',

  argTypes: {
    title: {
      description: 'Title of the toast.',
      control: {
        type: 'text'
      },
      defaultValue: 'Toast title',
    },
    message: {
      description: 'Message to be shown in the toast.',
      control: {
        type: 'text'
      },
      defaultValue: 'Toast message.'
    },
    variant: {
      description: 'Select in which color the panel should be rendered.',
      control: {
        type: 'radio',
        options: {
          'Info': ToastVariant.INFO,
          'Success': ToastVariant.SUCCESS,
          'Warning': ToastVariant.WARNING,
          'Error': ToastVariant.ERROR
        },
      },
      defaultValue: ToastVariant.INFO,
    },
    autoDestroy: {
      description: 'Whether the toast should close by itself or only by user interaction.',
      control: {
        type: 'radio',
        options: {
          'true': true,
          'false': false,
        },
      },
      defaultValue: true,
    },
    timeout: {
      description: 'Time in ms how long the toast should be displayed',
      control: {
        type: 'number'
      },
      defaultValue: 0
    }
  }
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  template: `
    <button @click="showToast">Click to show toast</button>
  `,
  methods: {
    showToast () {
      const props = this._props;
      this.$toaster(props.title, props.message, {
        autoDestroy: props.autoDestroy,
        variant: props.variant,
        timeout: props.timeout
      }).show();
    }
  }
});

export const Default = Template.bind({});

export const Success = Template.bind({});
Success.args = {
  title: 'Congrats!',
  message: 'This is a success message!',
  variant: ToastVariant.SUCCESS
};

export const Warning = Template.bind({});
Warning.args = {
  title: 'Caution!',
  message: 'This is dangerous!',
  variant: ToastVariant.WARNING
};

export const Error = Template.bind({});
Error.args = {
  title: 'Oh no!',
  message: 'Something went terribly wrong :(',
  variant: ToastVariant.ERROR
};
