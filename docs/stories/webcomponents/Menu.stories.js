import {MenuWrapper, MenuEntry} from '~/webcomponents/Menu';

customElements.define('MenuWrapper', MenuWrapper);
customElements.define('MenuItem', MenuEntry);

export default {
  title: 'WebComponent/Menu',
  component: MenuWrapper,
  subcomponents: {MenuEntry}
}

export const Default = () => `
  <MenuWrapper vertical>
    <MenuItem id="id">Test</MenuItem>
    <MenuItem>Another one</MenuItem>
    <MenuItem>Third one</MenuItem>
  </MenuWrapper>`;
