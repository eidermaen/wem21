<template>
  <div>
    <Title>
      Feedback
    </Title>

    <div class="mt-8">
      <p>
        Sie haben Feedback? Dann lassen Sie es mich gerne wissen!
      </p>

      <BaseForm ref="form" netlify name="wem_contact" method="post" @submit.prevent="onSubmit">
        <FormInput type="text" v-model="name" required label="Name" id="name" name="name" placeholder="Mika Muster"/>

        <FormInput label="E-Mail Adresse" v-model="email" name="email" id="email" required type="email"
                   placeholder="mika@muster.de"/>

        <FormTextArea label="Nachricht" v-model="message" name="message" id="message" required />

        <Button type="submit" class="flex flex-row items-center">
          <Paperplane class="w-5 h-5 rotate"/>
          <div class="ml-1">
            Absenden!
          </div>
        </Button>
      </BaseForm>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import getTitle from '~/utils/getTitle';
import Button from '~/components/Button.vue';
import Paperplane from '~/components/icons/Paperplane.vue';
import FormInput from '~/components/form/FormInput.vue';
import FormTextArea from '~/components/form/FormTextArea.vue';
import BaseForm from '~/components/form/BaseForm.vue';
import {ToastVariant} from '~/plugins/toast/Toast';

export default defineComponent({
  components: {BaseForm, FormTextArea, FormInput, Paperplane, Button},
  head: {
    title: getTitle('Feedback')
  },

  data() {
    return {
      name: '',
      email: '',
      message: '',
    }
  },

  methods: {
    async onSubmit() {
      const form = this.$refs.form as any;

      const formData = new FormData(form.$el) as any;

      try {
        await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData).toString()
        });

        this.name = '';
        this.email = '';
        this.message = '';

        this.$toaster('Vielen Dank!', 'Vielen Dank für Ihre Nachricht.', {
          variant: ToastVariant.SUCCESS
        }).show();

      } catch (e) {
        this.$toaster('Fehler', e.message, {
          variant: ToastVariant.ERROR
        }).show();
      }
    }
  },
})
</script>

<style scoped>
.rotate {
  transform: rotate(90deg);
}
</style>
