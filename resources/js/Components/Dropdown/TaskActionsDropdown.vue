<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import Dropdown from '@/Components/Dropdown/Dropdown.vue';
import DropdownLink from '@/Components/Dropdown/DropdownLink.vue';
import Icon from '@/Components/Icon.vue';

import { getTheme } from '@/Theme/ButtonsTheme';
import { deleteTask, takeTask, updateTask } from '@/Services/TaskSevice';
import SeverityEnum from '@/Enums/SeverityEnum';

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
    currentUserId: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['take', 'edit', 'delete']);

const loading = ref(false);

const onTakeTask = async (taskId) => {
    loading.value = true;
    
    if (taskId) {
        const result = await takeTask(taskId);
        props.task.value = result;
    }
    
    emit('take');    
    loading.value = false;
}

const onEditTask = async (task) => {
    emit('edit', task);
}

const onDeleteTask = async (taskId) => {
    loading.value = true;

    if (taskId) {
        const result = await deleteTask(taskId);
        props.task.value = result;
    }

    emit('delete');    
    loading.value = false;
}
</script>

<template>
    <div class="relative">
        <Dropdown align="right" width="48">
            <template #trigger>
                <button :class="getTheme(SeverityEnum.INFO)">
                    Actions
                    <Icon icon="ellipsis-vertical" class="ml-2" />
                </button>
            </template>

            <template #content>
                <DropdownLink
                    v-if="props.currentUserId !== props.task.user.id"
                    @click="onTakeTask(props.task.id)"
                    class="text-blue-600">
                    <Icon icon="hand" class="mr-2" />
                    Take
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