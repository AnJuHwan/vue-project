<template>
  <!-- v-bind:type == :type  -->
  <!-- v-on:click == @click -->
  <div :class="nameClass">{{ name }}</div>
  <input :type="type" v-bind:value="name" />
  <button @click="updateName" class="btn btn-primary">
    Click
  </button>
</template>

<script>
import { ref } from 'vue';
// ref : 사용시 name.value.id 으로 접근하여 object , array 접근 가능 ,
// reactive : 직접적으로 name.id 으로 접근가능

export default {
  setup() {
    const name = ref('Hello');
    const type = ref('number');
    const nameClass = ref('');

    const updateName = () => {
      name.value = 'World';
      type.value = 'text';
      nameClass.value = 'name';
    };

    return {
      name,
      updateName,
      type,
      nameClass,
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>
