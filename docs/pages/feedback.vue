<template>
  <div>
    <Title>
      Feedback
    </Title>

    <div class="mt-8">
      <p>
        Sie haben Feedback? Dann lassen Sie es mich gerne wissen!
      </p>

      <BaseForm netlify name="wem_contact" method="post">
        <FormInput type="text" required label="Name" id="name" name="name" placeholder="Mika Muster"/>

        <FormInput label="E-Mail Adresse" name="email" id="email" required type="email"
                   placeholder="mika@muster.de"/>

        <FormTextArea label="Nachricht" name="message" id="message" required />

        <Button class="flex flex-row items-center">
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

export default defineComponent({
  components: {BaseForm, FormTextArea, FormInput, Paperplane, Button},
  head: {
    title: getTitle('Feedback')
  },
})
</script>

<style scoped>
.rotate {
  transform: rotate(90deg);
}
</style>
