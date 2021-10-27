import { ref, onUnmounted } from 'vue';

export const useToast = () => {
  const toastMessage = ref('');
  const toastAleartType = ref('');
  const showToast = ref(false);
  const timeout = ref(null);
  const triggerToast = (message, type = 'success') => {
    toastMessage.value = message;
    toastAleartType.value = type;
    showToast.value = true;
    timeout.value = setTimeout(() => {
      toastMessage.value = '';
      toastAleartType.value = '';
      showToast.value = false;
    }, 3000);
  };
  onUnmounted(() => {
    clearTimeout(timeout.value);
  });

  return {
    toastMessage,
    toastAleartType,
    showToast,
    triggerToast,
  };
};
