<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import Button from '@/Components/Button.vue';
import SeverityEnum from '@/Enums/SeverityEnum.js';
import Icon from './Icon.vue';

const props = defineProps({
    severity: {
        type: String,
        default: SeverityEnum.DEFAULT,
        validator(value) {
            return Object.keys(SeverityEnum).includes(value)
        }
    },
});

const emit = defineEmits(['click']);

</script>
<template>
    <Button 
        :severity="severity" 
        class="fixed shadow-xl bottom-5 right-5 w-12 h-12 rounded-full ring-2 ring-white p-1 text-center" 
        @click="emit('click')"
        :padded="false"
        :rounded="false">
        <Icon icon="plus" class="text-2xl" />
    </Button>
</template>