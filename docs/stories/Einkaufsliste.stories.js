import Einkaufsliste from '~/components/exercises/Einkaufsliste';

export default {
  title: 'Aufgaben/Einkaufsliste',
  component: Einkaufsliste
}

const Template = (args, {argTypes}) => ({
  components: {Einkaufsliste},
  props: Object.keys(argTypes),
  template: '<Einkaufsliste v-bind="$props" />'
});

export const Default = Template.bind({});
