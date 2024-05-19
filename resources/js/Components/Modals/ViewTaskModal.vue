<script setup>
import { defineProps, defineEmits, ref, watch, computed } from 'vue';
import Panel from '@/Components/Panel.vue';
import Modal from '@/Components/Modal.vue';
import Button from '@/Components/Button.vue';
import SeverityEnum from '@/Enums/SeverityEnum';
import Tag from '../Tag.vue';
import { getPriorityToSeverity, getStatusToSeverity } from '@/Helpers/SeverityMapperHelpers';
import { getPriorityLabel, getStatusLabel } from '@/Helpers/LabelHelper';

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

const emit = defineEmits(['close', 'delete', 'take', 'edit']);

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
    <Modal :closeable="true" :show="props?.show" @close="emit('close')">
        <div class="min-h-3.5">
            <Panel>
                <h3>Created by {{ props.task.user?.name }}</h3>

                <section class="border-t border-slate-200 py-2 my-2">
                    <strong>Name:</strong>
                    <p class="mb-0 text-lg">{{ props.task.name }}</p>
                </section>

                <section class="border-t border-slate-200 py-2 my-2">
                    <strong>Description:</strong>
                    <p class="mb-0 text-lg">{{ props.task.description }}</p>
                </section>

                <section class="flex flex-row items-center border-t border-slate-200 py-2 my-2">
                    <strong class="mr-3">Status:</strong>
                    <Tag :severity="getStatusToSeverity(props.task.status)" classes="w-32 text-lg font-bold">
                        {{ getStatusLabel(props.task.status) }}
                    </Tag>
                </section>

                <section class="flex flex-row items-center border-t border-slate-200 py-2 my-2">
                    <strong class="mr-3">Priority:</strong>
                    <Tag :severity="getPriorityToSeverity(props.task.priority)" classes="w-32 text-lg font-bold">
                        {{ getPriorityLabel(props.task.priority) }}
                    </Tag>
                </section>

                <section class="border-t border-slate-200 py-2 my-2">
                    <strong>Deadline:</strong>
                    <p class="mb-0 text-lg">{{ props.task.deadline }}</p>
                </section>
            
                <div class="flex items-center justify-end border-t border-slate-200 pt-4 mt-6">
                    <Button
                        :severity="SeverityEnum.DEFAULT"
                        class="ml-4"
                        :disabled="isSubmitting"
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
                        Take
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
            </Panel>
        </div>
    </Modal>
</template>