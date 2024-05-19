<script setup>
import Spinner from "@/Components/Spinner.vue";

const props = defineProps({
    classes: {
        type: String,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})
const defaultTheme = 'p-6 bg-white shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg';

</script>

<template>
    <section :class="[defaultTheme, classes, loading ? 'opacity-60 pointer-events-none select-none' : '']">
        <div v-if="loading" class="absolute top-0 left-0 right-0 b-0 bg-gray-50 opacity-50 w-full h-full flex flex-col mx-auto text-center justify-center align-center">
            <Spinner class="ml-auto mr-auto" :show="true" />
        </div>
        <slot />
    </section>
</template>