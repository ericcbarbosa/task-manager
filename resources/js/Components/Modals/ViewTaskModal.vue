<script setup>
import { defineProps, defineEmits } from 'vue';
import Panel from '@/Components/Panel.vue';
import Modal from '@/Components/Modal.vue';
import Button from '@/Components/Buttons/Button.vue';
import SeverityEnum from '@/Enums/SeverityEnum';
import TaskStatusDropdown from "@/Components/Dropdown/TaskStatusDropdown.vue";
import TaskPriorityDropdown from "@/Components/Dropdown/TaskPriorityDropdown.vue";
import { dateFormat } from "@/Helpers/DateHelper.js";
import Avatar from "@/Components/Avatar.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    isEditing: {
        type: Boolean,
        default: false,
    },
    task: {
        type: Object,
    },
});

const emit = defineEmits(['close', 'delete', 'take', 'edit', 'change-status', 'change-priority']);

const onDeleteTask = () => {
    emit('delete', props.task.id);
};
const onEditTask = () => {
    emit('edit', props.task);
};
const onTakeTask = () => {
    emit('take', props.task.id);
};

</script>
<template>
    <Modal
        :title="props.task.name"
        :closeable="true"
        :show="props?.show"
        show-footer
        @close="emit('close')">
        <div class="min-h-3.5">
            <strong>Description:</strong>
            <section class="border rounded-lg bg-slate-100 border-slate-200 p-2 mt-1 mb-3">
                <p class="mb-0 text-lg">{{ props.task.description }}</p>
            </section>

            <strong>Owner:</strong>
            <section class="border rounded-lg bg-slate-100 border-slate-200 p-2 mt-1 mb-4">
                <Avatar :user="props.task.user" />
            </section>

            <section class="flex flex-row justify-between items-center">
                <strong class="mr-3">Status:</strong>
                <strong class="mr-3">Priority:</strong>
            </section>

            <section class="border rounded-lg bg-slate-100 border-slate-200 p-2 mt-1 mb-4 flex flex-row items-center justify-between gap-4">
                <TaskStatusDropdown
                    :taskId="props.task.id"
                    :status="props.task.status"
                    align="left"
                    width="48"
                    @change-status="emit('change-status')"
                />

                <TaskPriorityDropdown
                    :task-id="props.task.id"
                    :priority="props.task.priority"
                    align="right"
                    width="48"
                    @change-priority="emit('change-priority')"
                />
            </section>

            <strong>Deadline:</strong>
            <section class="border rounded-lg bg-slate-100 border-slate-200 p-2 mt-1 mb-4 flex flex-row items-center justify-between gap-4">
                <p class="mb-0 text-lg">{{ dateFormat(props.task.deadline) }}</p>
            </section>
        </div>

        <template #footer>
            <div class="flex items-center justify-end">
                <Button
                    :severity="SeverityEnum.DEFAULT"
                    class="ml-4"
                    @click="emit('close')">
                    Cancel
                </Button>

                <Button
                    :severity="SeverityEnum.DANGER"
                    :disabled="false"
                    icon="trash"
                    class="ml-4"
                    @click="onDeleteTask">
                    Delete
                </Button>

                <Button
                    :severity="SeverityEnum.INFO"
                    :disabled="false"
                    icon="hand"
                    class="ml-4"
                    @click="onTakeTask">
                    Take ownership
                </Button>

                <Button
                    :severity="SeverityEnum.SUCCESS"
                    :disabled="false"
                    icon="pencil"
                    class="ml-4"
                    @click="onEditTask">
                    Edit
                </Button>
            </div>
        </template>
    </Modal>
</template>