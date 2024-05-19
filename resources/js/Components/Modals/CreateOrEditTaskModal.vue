<script setup>
import { defineProps, defineEmits, ref, watch, computed } from 'vue';
import Panel from '@/Components/Panel.vue';
import Modal from '@/Components/Modal.vue';
import InputError from '@/Components/Form/InputError.vue';
import InputLabel from '@/Components/Form/InputLabel.vue';
import TextInput from '@/Components/Form/TextInput.vue';
import TextArea from '@/Components/Form/TextArea.vue';
import Button from '@/Components/Buttons/Button.vue';
import SeverityEnum from '@/Enums/SeverityEnum.js';

import { useForm } from 'vee-validate';
import * as yup from 'yup';
import StatusEnum from '@/Enums/StatusEnum';
import PiorityEnum from '@/Enums/PriorityEnum';
import TaskStatusDropdown from "@/Components/Dropdown/TaskStatusDropdown.vue";
import TaskPriorityDropdown from "@/Components/Dropdown/TaskPriorityDropdown.vue";
import {dateFormat} from "@/Helpers/DateHelper.js";

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    isEditing: {
        type: Boolean,
        default: false,
    },
    task: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['close', 'create', 'edit']);

const initialValues = {
    name: '',
    description: '',
    status: StatusEnum.PENDING,
    priority: PiorityEnum.LOW,
}

const validationSchema = {
    name: yup.string().required().min(4).max(200),
    description: yup.string().required().min(4),
    deadline: yup.date().required(),
    status(value) {
        if (!value) {
            return 'this is a required field';
        }

        if (!Object.keys(StatusEnum).includes(value)) {
            return 'Invalid status'
        }

        return true;
    },
    priority(value) {
        if (!value) {
            return 'this is a required field';
        }

        if (!Object.keys(PiorityEnum).includes(value)) {
            return 'Invalid priority'
        }

        return true;
    },
}

const { defineField, handleSubmit, isSubmitting, errors, setValues, values } = useForm({
    validationSchema,
    initialValues: initialValues,
});

const hasTask = computed(() => props.task && props.task?.name);

watch(hasTask, (newTask)=> {
    if (newTask && props.isEditing && props.task) {
        setValues({
            name: props.task?.name,
            description: props.task?.description,
            status: props.task?.status,
            priority: props.task?.priority,
            deadline: dateFormat(props.task?.deadline),
        });
    }
});

// On Submit
const onSumbitSuccess = (values) => {
    const event = props.isEditing ? 'edit' : 'create'
    const newTask = props.isEditing
        ? ({ ...props.task, ...values, })
        : values;

    emit(event, newTask);
};

const onSubmit = handleSubmit(
    onSumbitSuccess,
);


// Fields
const [name, nameAttrs] = defineField('name');
const [description, descriptionAttrs] = defineField('description');
const [status] = defineField('status');
const [priority] = defineField('priority');
const [deadline, deadlineAttrs] = defineField('deadline');

const handleChangeStatus = (taskId, newStatus) => {
    setValues({
        status: newStatus,
    });
};

const handleChangePriority = (taskId, newPriority) => {
    setValues({
        priority: newPriority,
    });
};

</script>
<template>
    <Modal
        :title="isEditing ? `Edit task` : 'Create task'"
        :closeable="true"
        :show="props?.show"
        show-footer
        @close="emit('close')">
        <div :class="['min-h-3.5', loading ? 'opacity-60 pointer-events-none select-none' : '']">
            <form v-show="isEditing && task || !isEditing">
                <div class="mt-4">
                    <InputLabel for="name" value="Name" />

                    <TextInput
                        id="name"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="name"
                        v-bind="nameAttrs"
                        autofocus
                    />

                    <InputError class="mt-2" :message="errors?.name" />
                </div>

                <div class="mt-4">
                    <InputLabel for="description" value="Description" />

                    <TextArea
                        id="description"
                        class="mt-1 block w-full"
                        v-model="description"
                        v-bind="descriptionAttrs"
                    />

                    <InputError class="mt-2" :message="errors.description" />
                </div>

                <section class="flex flex-row items-center justify-between gap-4">
                <div class="mt-4 w-48">
                    <InputLabel for="status" value="Status" />

                    <TaskStatusDropdown
                        :taskId="isEditing ? props.task.id : null"
                        :status="status"
                        align="left"
                        width="48"
                        :make-request="false"
                        @change-status="handleChangeStatus"
                    />

                    <InputError class="mt-2" :message="errors.status" />
                </div>

                <div class="mt-4 w-48 flex flex-col text-right">
                    <InputLabel for="priority" value="Priority" />

                    <TaskPriorityDropdown
                        :taskId="isEditing ? props.task.id : null"
                        :priority="priority"
                        align="right"
                        width="48"
                        :make-request="false"
                        @change-priority="handleChangePriority"
                    />

                    <InputError class="mt-2" :message="errors.priority" />
                </div>
                </section>

                <div class="mt-4">
                    <InputLabel for="deadline" value="deadline" />

                    <TextInput
                        type="text"
                        id="deadline"
                        class="mt-1 block w-full"
                        pattern="\d{4}-\d{2}-\d{2}"
                        v-model="deadline"
                        v-bind="deadlineAttrs"
                    />

                    <InputError class="mt-2" :message="errors.priority" />
                </div>
            </form>
        </div>

        <template #footer>
            <div class="flex items-center justify-end">
                <Button
                    :severity="SeverityEnum.DEFAULT"
                    class="ml-4"
                    :disabled="isSubmitting"
                    @click="emit('close')">
                    {{'Cancel'}}
                </Button>

                <Button
                    type="submit"
                    :severity="SeverityEnum.SUCCESS"
                    class="ml-4"
                    :disabled="isSubmitting || loading"
                    @click="onSubmit">
                    {{isEditing ? 'Save task' : 'Create task'}}
                </Button>
            </div>
        </template>
    </Modal>
</template>