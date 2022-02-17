import Kalligraphie from '~/components/exercises/Kalligraphie';

export default {
  title: 'Aufgaben/Kalligraphie',
  component: Kalligraphie
};

const Template = (args, {argTypes}) => ({
  components: {Kalligraphie},
  template: '<Kalligraphie></Kalligraphie>'
});

export const Default = Template.bind({});
