<script setup>
import { computed } from 'vue';
import SeverityEnum from '@/Enums/SeverityEnum';

const sharedClasses = 'tag border rounded text-center py-0.5 px-2 select-none';

const THEMES = {
    [SeverityEnum.DEFAULT]: 'bg-slate-300 border-slate-400 text-slate-700',
    [SeverityEnum.INFO]: 'bg-blue-300 border-blue-400 text-blue-700',
    [SeverityEnum.WARNING]: 'bg-yellow-300 border-yellow-400 text-yellow-700',
    [SeverityEnum.DANGER]: 'bg-red-300 border-red-400 text-red-700',
    [SeverityEnum.SUCCESS]: 'bg-emerald-300 border-emerald-400 text-emerald-700',
}

const props = defineProps({
    severity: {
        type: String,
        default: SeverityEnum.DEFAULT,
        validator(value) {
            return Object.keys(SeverityEnum).includes(value)
        }
    },
    classes: {
        type: String,
        default: '',
    }
});

const theme = computed(() => {
    return THEMES[props.severity];
});

</script>

<template>
    <div :class="[sharedClasses, theme, classes]">
        <slot />
    </div>
</template>