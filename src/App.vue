<template>
  <div class="name">{{ name }}</div>
  <button v-on:click="updateName" class="btn btn-primary">
    Click
  </button>
</template>

<script>
import { ref } from 'vue';
// ref : 사용시 name.value.id 으로 접근하여 object , array 접근 가능 ,
// reactive : 직접적으로 name.id 으로 접근가능

export default {
  setup() {
    // const name2 = reactive({
    //   id: 1,
    // });
    const name = ref({
      id: 1,
    });

    // const greeting = (name) => {
    //   return `Hello ${name}`;
    // };

    // const greet = greeting(name);
    const updateName = () => {
      name.value.id = 2;
      console.log(name);
    };

    return {
      name,
      updateName,
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>
