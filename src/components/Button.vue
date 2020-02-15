<template>
  <button :class="['btn', `btn-${type}`]">
    <i class="fas fa-fw" :class="icon"></i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style>

</style>
