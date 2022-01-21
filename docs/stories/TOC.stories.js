import {defineComponent} from '@nuxtjs/composition-api';
import TOC from '~/components/TOC';

export default {
  title: 'Homepage/TableOfContents',
  component: TOC,
  argTypes: {
    depth: {
      control: {
        type: 'select',
        options: ['h1', 'h2', 'h3', 'h4', 'h5'],
      }
    }
  }
}

const Template = (args, {argTypes}) => defineComponent({
  props: Object.keys(argTypes),
  setup: () =>({args}),
  template: `
    <div>
      <TOC v-bind="$props"></TOC>

      <div>
        <h1>Some H1 heading</h1>
        <h2>Some H2 heading</h2>
        <h2>Another H2</h2>
        <h3>H3 won't be included</h3>
      </div>
    </div>`
});

export const Default = Template.bind({});
Default.args = {
  depth: 'h2'
};
