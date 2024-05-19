<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import Dropdown from '@/Components/Dropdown/Dropdown.vue';
import DropdownLink from '@/Components/Dropdown/DropdownLink.vue';
import Icon from '@/Components/Icon.vue';
import Button from '@/Components/Buttons/Button.vue';

import { getTheme } from '@/Theme/ButtonsTheme';
import {deleteTask, takeTask, updateTaskStatus} from '@/Services/TaskSevice';
import SeverityEnum from '@/Enums/SeverityEnum';
import StatusEnum from "@/Enums/StatusEnum.js";

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
    currentUserId: {
        type: Number,
        required: true,
    },
    disabledTakeOn: {
        type: Boolean,
        required: false,
    },
});

const emit = defineEmits(['take', 'edit', 'delete', 'start-fetch', 'end-fetch', 'change-status']);

const loading = ref(false);

const onTakeTask = async (taskId) => {
    loading.value = true;
    emit('start-fetch');
    
    if (taskId) {
        const success = await takeTask(taskId);

        if (success) {
            emit('take');
        }
    }

    loading.value = false;
    emit('end-fetch');
}

const onEditTask = async (task) => {
    emit('edit', task);
}

const onDeleteTask = async (taskId) => {
    loading.value = true;
    emit('start-fetch');

    if (taskId) {
        const success = await deleteTask(taskId);

        if (success) {
            emit('delete');
        }
    }

    loading.value = false;
    emit('end-fetch');
}

const onChangeStatus = async (taskId, status) => {
    loading.value = true;
    emit('start-fetch');

    if (taskId) {
        const success = await updateTaskStatus(taskId, status);

        if (success) {
            emit('change-status', StatusEnum.IN_PROGRESS);
        }
    }

    loading.value = false;
    emit('end-fetch');
}
</script>

<template>
    <div class="relative">
        <Dropdown align="right" width="48" grouped>
            <template #before-trigger>
                <Button
                    :disabled="disabledTakeOn || loading"
                    :rounded="false"
                    :severity="SeverityEnum.SUCCESS"
                    class="rounded-l-md pr-3 border-r border-r-green-700"
                    @click="onChangeStatus(props.task.id, StatusEnum.IN_PROGRESS)">
                    Take on
                </Button>
            </template>

            <template #trigger>
                <button :disabled="loading" :class="[
                    getTheme(SeverityEnum.SUCCESS, { rounded: false, spaced: false }),
                    'h-full rounded-r-md pr-3'
                ]">
                    <Icon icon="ellipsis-vertical" class="ml-2" />
                </button>
            </template>

            <template #content>
                <DropdownLink
                    v-if="props.currentUserId !== props.task.user.id"
                    @click="onTakeTask(props.task.id)"
                    class="text-blue-600">
                    <Icon icon="hand" class="mr-2" />
                    Take ownership
                </DropdownLink>

                <DropdownLink @click="onEditTask(props.task)" class="text-green-600">
                    <Icon icon="pencil" class="mr-2" />
                    Edit
                </DropdownLink>

                <DropdownLink @click="onDeleteTask(props.task.id)" class="text-red-600">
                    <Icon icon="trash" class="mr-2" />
                    Delete
                </DropdownLink>
            </template>
        </Dropdown>
    </div>
</template>