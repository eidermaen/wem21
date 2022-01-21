import CustomAnchor from '~/components/CustomAnchor.vue';

export default {
  title: 'Homepage/Anchor',
  component: CustomAnchor,
}

export const Link = () => ({
  components: { CustomAnchor },
  template: '<CustomAnchor>Some anchor</CustomAnchor>'
})
