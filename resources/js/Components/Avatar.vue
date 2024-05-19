<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});

const avatarStyle = 'inline-block h-6 min-h-6 w-6 min-w-6 rounded-full ring-2 ring-white bg-gray-200 grow-1 shrink-0';

</script>

<template>
    <div class="flex flex-row items-center justify-start w-36 space-x-2">
        <img v-if="user?.avatar" :class="avatarStyle" :src="user?.avatar" :title="user?.name" />
        <div v-else :class="avatarStyle" :title="user?.name" />

        <p class="text-sm text-left leading-tight text-ellipsis overflow-hidden line-clamp-2">
            {{ user?.name }}
        </p>
    </div>
</template>

<style>

</style>