import Navigator from '~/components/exercises/Navigator';

export default {
  title: 'Aufgaben/WWWNavigator',
  component: Navigator
};

const Template = (args, {argTypes}) => ({
  components: {Navigator},
  props: Object.keys(argTypes),
  template: '<Navigator></Navigator>'
});

export const Default = Template.bind({});
