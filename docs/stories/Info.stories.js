import Info from '~/components/Info.vue';
import {defineComponent} from '@nuxtjs/composition-api';

export default {
  title: 'Homepage/Info',
  component: Info,
  argTypes: {
    title: {
      control: {
        type: 'text'
      },
      defaultValue: 'Title',
    },
    variant: {
      control: {
        type: 'radio',
        options: ['info', 'success', 'danger']
      },
    }
  }
}

const Template = args => defineComponent({
  components: { Info },
  setup: () => ({ args }),
  template: '<Info v-bind="$props">Some content</Info>'
});

export const InfoPanel = Template.bind({});
InfoPanel.args = {
  title: 'Info',
  variant: 'info',
};
