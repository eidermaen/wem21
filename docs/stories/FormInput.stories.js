import FormInput from '~/components/form/FormInput';

export default {
  title: 'Homepage/FormInput',
  component: FormInput,
  argTypes: {
    name: {
      control: {
        type: 'text'
      },
      defaultValue: 'input-name',
    },
    id: {
      control: {
        type: 'text',
      },
      defaultValue: 'input-id',
    },
    label: {
      control: {
        type: 'text'
      },
      defaultValue: 'Custom input for forms'
    },
    type: {
      control: {
        type: 'radio',
        options: ['text', 'number', 'phone', 'email', 'password'],
      },
      defaultValue: 'text',
    },
    required: {
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    description: {
      control: {
        type: 'text'
      },
      defaultValue: 'Here is some describing text'
    },
    placeholder: {
      control: {
        type: 'text'
      },
    },
  }
};

const Template = (args, {argTypes}) => ({
  components: {FormInput},
  props: Object.keys(argTypes),
  template: '<FormInput v-bind="$props"/>'
});

export const Default = Template.bind({});
