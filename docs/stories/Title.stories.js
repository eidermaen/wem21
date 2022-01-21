import { defineComponent } from '@nuxtjs/composition-api';
import Title from '~/components/Title.vue';

export default {
  title: 'Homepage/Title',
  component: Title,
  argTypes: {
    sub: {
      description: 'If true, h2 will be rendered, else h1.',
      control: {
        options: [false, true],
        type: 'radio'
      },
      defaultValue: false,
    },
    default: {
      description: 'Content of the title',
      control: {
        type: 'text'
      },
    },
  },
};

const Template = (args, {argTypes}) => defineComponent({
  components: { Title },
  props: Object.keys(argTypes),
  setup: () => ({ args }),
  template: '<Title v-bind="$props">{{ args.default }}</Title>'
});

export const Default = Template.bind({});
Default.args = {
  default: 'Some title',
}
