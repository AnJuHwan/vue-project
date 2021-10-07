<template>
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 me-2">
        <input
          class="form-control "
          type="text"
          v-model="todo"
          placeholder="Type new to-do"
        />
      </div>
      <div class="ml-2">
        <button type="submit" class="btn btn-primary">
          Add
        </button>
      </div>
    </div>
    <div v-show="hasError" style="color:red">This field cannot be empty</div>
  </form>
</template>

<script>
export default {};
</script>

<style></style>
