<script setup>
import { defineProps, defineEmits, computed } from 'vue';
const props = defineProps({
    icon: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <i :class="`fas fa-${icon}`" />
</template>