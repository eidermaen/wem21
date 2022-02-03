<template>
  <div>
    <form @submit.prevent="onSubmit" class="p-4 border-3 border-blue-200 rounded">
      <FormInput v-model="inputValue" type="text" id="name" name="name" required label="Neuer Redner" />
      <Button type="submit">Hinzufügen</Button>
    </form>

    <div class="mt-4 space-y-2">
      <Redner
        v-for="item in items"
        :key="item.name"
        :name="item.name"
        :is-active="item.isActive"
        @start="startPerson(item.name)"
        @stop="stopPerson(item.name)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive} from '@nuxtjs/composition-api';
import FormInput from '~/components/form/FormInput.vue';
import Redner from '~/components/exercises/Redner.vue';

interface Person {
  name: string,
  isActive: boolean,
};

export default defineComponent({
  components: {FormInput, Redner},

  setup(props: any) {
    let inputValue = ref('');
    let items = reactive<Person[]>([]);

    const onSubmit = () => {
      items.push({
        name: inputValue.value,
        isActive: false
      });
      inputValue.value = '';
    };

    const startPerson = (name: string) => {
      items.forEach(person => {
        if (person.name === name) {
          person.isActive = true
        } else {
          person.isActive = false
        }
      });
    };

    const stopPerson = (name: string) => {
      items.forEach(person => {
        if (person.name === name) {
          person.isActive = false;
        }
      });
    };

    return {
      inputValue,
      items,
      onSubmit,
      startPerson,
      stopPerson,
    }
  }
});
</script>
