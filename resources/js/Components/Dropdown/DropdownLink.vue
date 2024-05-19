<script setup>
import { defineEmits } from 'vue';

import { Link } from '@inertiajs/vue3';

defineProps({
    href: {
        type: String,
        default: '',
    },
});

const emits = defineEmits(['click'])
</script>

<template>
    <Link
        v-if="href"
        :href="href"
        class="block w-full px-4 py-2 text-left text-sm leading-5 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        @click="emits('click')"
    >
        <slot />
    </Link>
    <div
        v-else
        class="block w-full px-4 py-2 text-left text-sm leading-5 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        @click="emits('click')">
        <slot />
    </div>
</template>
