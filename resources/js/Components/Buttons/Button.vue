<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import Icon from '@/Components/Icon.vue';
import SeverityEnum from '@/Enums/SeverityEnum.js';
import { getTheme } from '@/Theme/ButtonsTheme.js';

const props = defineProps({
    severity: {
        type: String,
        default: SeverityEnum.DEFAULT,
        validator(value) {
            return Object.keys(SeverityEnum).includes(value)
        }
    },
    icon: {
        type: String,
        default: '',
    },
    class: {
        type: String,
        default: '',
    },
    padded: {
        type: Boolean,
        default: true,
    },
    rounded: {
        type: Boolean,
        default: true,
    },
    unstyled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits('click');

const allClasses = computed(() => {
    const themeConfigs = {
        spaced: props.padded,
        rounded: props.rounded,
    };

    if (props.unstyled) {
        return [props?.class]
    }

    return [
        ...getTheme(props.severity, themeConfigs), 
        props?.class,
    ];
});
</script>

<template>
    <button type="button" :class="allClasses" @click.stop="emit('click')">
        <Icon v-if="icon" :icon="icon" class="mr-2"/>
        <slot></slot>
    </button>
</template>
