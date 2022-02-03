import Tabellenkalkulation from '~/components/exercises/Tabellenkalkulation';

export default {
  title: 'Aufgaben/Tabellenkalkulation',
  component: Tabellenkalkulation
}

const Template = (args, {argTypes}) => ({
  components: {Tabellenkalkulation},
  props: Object.keys(argTypes),
  template: '<Tabellenkalkulation v-bind="$props" />',
});

export const Default = Template.bind({});
