import Rednerliste from '~/components/exercises/Rednerliste';

export default {
  title: 'Aufgaben/Rednerliste',
  component: Rednerliste
}

const Template = (args, {argTypes}) => ({
  components: {Rednerliste},
  props: Object.keys(argTypes),
  template: '<Rednerliste v-bind="$props" />'
});

export const Default = Template.bind({});
