<template>
  <div>
    <form @submit.prevent="onSubmit" class="p-4 border-3 border-blue-200 rounded">
        <FormInput v-model="inputValue" label="Enter new item" type="text" name="item" id="item" required/>
        <Button type="submit">Add item</Button>
    </form>

    <div>
      <ul class="list-disc list-inside mt-5 space-y-3">
        <li v-for="item in items" :key="item" class="flex flex-row items-center">
          <span>
            {{ item }}
          </span>
          <button
            @click="onClickRemoveElement(item)"
            class="ml-2 p-1 rounded border-red-500 bg-red-400 text-white">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import FormInput from '~/components/form/FormInput.vue';

export default defineComponent({
  components: {FormInput},

  setup(props: any) {
    let items = ref<string[]>([]);
    let inputValue = ref('');

    const onSubmit = () => {
      items.value.push(inputValue.value);
      inputValue.value = '';
    };

    const onClickRemoveElement = (value: string) => {
      items.value = items.value.filter(i => i !== value);
    };

    return {
      items,
      inputValue,
      onSubmit,
      onClickRemoveElement
    }
  }
});
</script>

<style>

</style>
