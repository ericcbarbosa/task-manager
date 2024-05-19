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
    <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
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
    </transition>
</template>

<style scoped>

</style>