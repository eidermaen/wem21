import Bezier from '~/components/exercises/Bezier';

export default {
  title: 'Aufgaben/Bezier',
  component: Bezier
};

const Template = (args, {argTypes}) => ({
  components: {Bezier},
  template: '<Bezier></Bezier>'
});

export const Default = Template.bind({});
