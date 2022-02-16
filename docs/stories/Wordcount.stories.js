import WordCount from '~/components/exercises/WordCount';

export default {
  title: 'Aufgaben/Wordcount',
  component: WordCount,
  argTypes: {
    label: {
      control: {
        type: 'text'
      },
      defaultValue: 'Some input field'
    },
    id: {
      control: {
        type: 'text'
      },
      defaultValue: 'my-unique-id'
    }
  }
}

const Template = (args, {argTypes}) => ({
  components: {WordCount},
  props: Object.keys(argTypes),
  template: `
    <div>
      <WordCount v-bind="$props"></WordCount>
    </div>
  `,
});

export const Default = Template.bind({});
