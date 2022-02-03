import HtmlEditor from '~/components/exercises/HtmlEditor';

export default {
  title: 'Aufgaben/HtmlEditor',
  component: HtmlEditor
}

const Template = (args, {argTypes}) => ({
  components: {HtmlEditor},
  props: Object.keys(argTypes),
  template: '<HtmlEditor v-bind="$props"/>'
});

export const Default = Template.bind({});
