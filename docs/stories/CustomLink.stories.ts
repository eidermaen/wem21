import CustomLink from '~/components/CustomLink.vue';

export default {
  title: 'Homepage/Link',
  component: CustomLink
};

export const Nuxt = () => ({
  components: { CustomLink },
  template: '<CustomLink to="#">Some Link</CustomLink>',
});

export const Default = () => ({
  components: { CustomLink },
  template: '<CustomLink :nuxt="false" to="#">Normal link</CustomLink>',
});
