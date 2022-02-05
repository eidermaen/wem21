import LoadingAnimation from '~/components/animations/LoadingAnimation';

export default {
  title: 'Homepage/LoadingAnimation',
  component: LoadingAnimation
}

const Template = (args, {argTypes}) => ({
  components: {LoadingAnimation},
  template: '<LoadingAnimation/>'
});

export const Default = Template.bind({});
