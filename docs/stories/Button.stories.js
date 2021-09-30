export default {
  title: 'Components/Button',
  parameters: {
    variant: {
      type: 'list'
    },
  },
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  template: '<b-button v-bind="$props">This is a test</b-button>'
});

export const Primary = Template.bind({});

