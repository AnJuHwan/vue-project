<template>
  <div v-if="loading">Loading ...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group mb-3">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control" />
          <div v-if="subjectError" class="text_red">
            {{ subjectError }}
          </div>
        </div>
      </div>
      <div v-if="editing" class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? 'Completed' : 'Incompleted' }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea
            v-model="todo.body"
            class="form-control"
            id=""
            cols="30"
            rows="10"
          >
          </textarea>
        </div>
      </div>
    </div>

    <button
      :disabled="!todoUpdated"
      type="submit"
      class="btn btn-primary mt-3 "
    >
      {{ editing ? 'Update' : 'Create' }}
    </button>
    <button class="btn btn-outline-dark mt-3 mx-2" @click="moveToTodoListPage">
      Cancel
    </button>
  </form>
  <transition name="fade">
    <Toast :message="toastMessage" v-if="showToast" :type="toastAleartType" />
  </transition>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from '@vue/reactivity';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast.js';
export default {
  components: {
    Toast,
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: '',
      completed: false,
      body: '',
    });
    const subjectError = ref('');
    const originalTodo = ref(null);
    const loading = ref(false);
    const id = route.params.id;

    const {
      toastMessage,
      toastAleartType,
      showToast,
      triggerToast,
    } = useToast();

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await axios.get(`http://localhost:3000/todos/${id}`);

        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
        triggerToast('Something went wrong', 'danger');
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    if (props.editing) {
      getTodo();
    }

    const toggleTodoStatus = () => {
      // e.preventDefault();
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: 'Todos',
      });
    };

    const onSave = async () => {
      subjectError.value = '';
      if (!todo.value.subject) {
        subjectError.value = 'Subject is required!';
        return;
      }
      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };
        if (props.editing) {
          originalTodo.value = { ...res.data };
          res = await axios.put(`http://localhost:3000/todos/${id}`, data);
        } else {
          res = await axios.post(`http://localhost:3000/todos`, data);
          todo.value.subject = '';
          todo.value.body = '';
        }

        originalTodo.value = { ...res.data };
        const message =
          'Successfully' + (props.editing ? 'Updated!' : 'Created!');
        triggerToast(message);
      } catch (error) {
        console.log(error);
        triggerToast('Something went wrong', 'danger');
      }
    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAleartType,
      subjectError,
    };
  },
};
</script>

<style scoped>
/* scoped : 해당 컴포넌트 안에서만 사용 */
.text_red {
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
