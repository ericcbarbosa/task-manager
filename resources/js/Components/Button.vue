<script setup>
import { computed, defineEmits } from 'vue';
import SeverityEnum from '@/Enums/SeverityEnum';
import { getTheme } from '@/Theme/ButtonsTheme';

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
    },
    class: {
        type: String,
    },
    padded: {
        type: Boolean,
        default: true,
    },
    rounded: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits('click');

const allClasses = computed(() => {
    const themeConfigs = {
        spaced: props.padded,
        rounded: props.rounded,
    };

    return [
        ...getTheme(props.severity, themeConfigs), 
        props?.class || '',
    ];
});
</script>

<template>
    <button type="button" :class="allClasses" @click.stop="emit('click')">
        <i v-if="icon" :class="`mr-2 fas fa-${icon}`"></i>
        <slot></slot>
    </button>
</template>
