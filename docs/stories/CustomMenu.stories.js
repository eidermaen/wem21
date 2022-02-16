import CustomMenu from '~/components/exercises/CustomMenu';
import MenuItem from '~/components/exercises/MenuItem';

export default {
  title: 'Aufgaben/CustomMenu',
  component: CustomMenu,
}

const Template = (args, {argTypes}) => ({
  components: {CustomMenu, MenuItem},
  props: Object.keys(argTypes),
  template: `
    <div class="container">
    <h1>Vue components</h1>

    <div class="content">
      <CustomMenu class="top-nav">
        <MenuItem to="#">
          Start
        </MenuItem>
        <MenuItem to="#">
          About
        </MenuItem>
      </CustomMenu>

      <CustomMenu vertical>
        <MenuItem to="#">
          Test
        </MenuItem>
        <MenuItem to="#">
          Another entry
        </MenuItem>
      </CustomMenu>
    </div>
    </div>
    <style>
    .container {
      max-width: 75%;
      margin: 2rem auto;
    }

    .content {
      display: grid;
      grid-template-columns: auto 1fr;
    }

    .top-nav {
      grid-column: span 2;
      margin-bottom: 2rem;
    }
    </style>
  `,
});

export const Default = Template.bind({});
