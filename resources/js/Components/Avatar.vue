<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

const avatarStyle = 'avatar__img inline-block h-12 min-h-12 w-12 min-w-12 rounded-full ring-2 ring-white bg-gray-200';

</script>

<template>
    <div class="avatar flex flex-col items-center justify-center w-16">
        <img 
            v-if="imageUrl"
            :class="avatarStyle" 
            :src="imageUrl" 
            :title="user?.name"
        />
        <div 
            v-else
            :class="avatarStyle"
            :title="user?.name"
        ></div>

        <p class="avatar__name text-xs text-center leading-tight text-ellipsis overflow-hidden line-clamp-2">
            {{ user?.name }}
        </p>
    </div>
</template>

<style>
.avatar {
    min-width: 3rem;
    max-width: 3rem;
}
</style>