<script setup>
const props = defineProps({
    classes: {
        type: String,
    },
})
const defaultTheme = 'p-6 bg-white shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg';

</script>

<template>
    <section :class="[defaultTheme, classes]">
        <slot />
    </section>
</template>