import {defineComponent} from '@nuxtjs/composition-api';
import Info from '~/components/Info.vue';

export default {
  title: 'Homepage/Panels',
  component: Info,
  argTypes: {
    title: {
      description: 'Title of the panel that will be displayed at the top.',
      control: {
        type: 'text'
      },
      defaultValue: 'Title',
    },
    variant: {
      description: 'Select in which color the panel should be rendered.',
      control: {
        type: 'radio',
        options: ['info', 'success', 'danger', 'tip']
      },
    }
  }
}

const Template = (args, {argTypes}) => defineComponent({
  components: { Info },
  props: Object.keys(argTypes),
  setup: () => ({args}),
  template: '<Info v-bind="$props">{{ args.default }}</Info>'
});

export const DefaultPanel = Template.bind({});
DefaultPanel.args = {
  title: 'Info',
  variant: 'info',
  default: 'This is some info message',
};

export const SuccessPanel = Template.bind({});
SuccessPanel.args = {
  title: 'Congratulations',
  variant: 'success',
  default: 'You just finished this exercise! Keep going!',
};

export const DangerPanel = Template.bind({});
DangerPanel.args = {
  title: 'Oops',
  variant: 'danger',
  default: 'That does not look that great :/',
};

export const TipPanel = Template.bind({});
TipPanel.args = {
  title: 'Did you know?',
  variant: 'tip',
  default: 'Did you know, that you can also use JavaScript in the backend? #Node',
};
