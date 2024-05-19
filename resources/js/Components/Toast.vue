<script setup>
import SeverityEnum from "@/Enums/SeverityEnum.js";
import {getTheme} from "@/Theme/SurfacesTheme.js";
import Icon from "@/Components/Icon.vue";
import Button from "@/Components/Buttons/Button.vue";

const props = defineProps({
    message: {
        type: String,
        default: '',
    },
    severity: {
        type: String,
        default: SeverityEnum.DEFAULT,
        validator(value) {
            return Object.keys(SeverityEnum).includes(value)
        }
    },
    closable: {
        type: Boolean,
        default: true,
    }
});

const emit = defineEmits(['close']);

</script>

<template>
    <div :class="[getTheme(props.severity), 'relative']">
        <slot v-if="!props.message" />
        <template v-else>{{ props.message }}</template>

        <Button
            v-if="closable" class="absolute w-8 h-8 text-center right-2 top-3 rounded-full"
            @click="emit('close')"
            unstyled>
            <Icon icon="times" />
        </Button>
    </div>
</template>

<style scoped>

</style>