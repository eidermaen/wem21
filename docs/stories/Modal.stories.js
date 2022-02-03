import Modal from '~/components/Modal';

export default {
  title: 'Homepage/Modal',
  component: Modal,
  argTypes: {
    open: {
      description: 'Toggle whether the modal is shown or not.',
      control: {
        type: 'boolean'
      }
    },
  },
};

const Template = (args, {argTypes}) => ({
  components: {Modal},
  props: Object.keys(argTypes),
  template: '<Modal v-bind="$props" @close="open = false"> <template v-slot:header>Header</template>' +
    '<template v-slot:body>' +
    '<p>This is the body of the modal</p>' +
    '</template> </Modal>'
});

export const Default = Template.bind({});

Default.args = {
  open: true
};
