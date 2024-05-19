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
        default: null,
    },
});

const emit = defineEmits(['close', 'create', 'edit']);
const loading = ref(false);

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

const { defineField, handleSubmit, isSubmitting, errors, setValues } = useForm({
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
            deadline: props.task?.deadline,
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
const [status, statusAttrs] = defineField('status');
const [priority, priorityAttrs] = defineField('priority');
const [deadline, deadlineAttrs] = defineField('deadline');

</script>
<template>
    <Modal :closeable="true" :show="props?.show" @close="emit('close')">
        <div class="min-h-3.5">
            <Panel>
                <form v-show="isEditing && task || !isEditing" @submit.prevent="onSubmit">
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

                    <div class="mt-4">
                        <InputLabel for="status" value="Status" />

                        <TextInput
                            id="status"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="status"
                            v-bind="statusAttrs"
                        />

                        <InputError class="mt-2" :message="errors.status" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="priority" value="Priority" />

                        <TextInput
                            id="priority"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="priority"
                            v-bind="priorityAttrs"
                        />

                        <InputError class="mt-2" :message="errors.priority" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="deadline" value="deadline" />

                        <TextInput
                            id="deadline"
                            type="date"
                            class="mt-1 block w-full"
                            v-model="deadline"
                            v-bind="deadlineAttrs"
                        />

                        <InputError class="mt-2" :message="errors.priority" />
                    </div>

                    <div class="flex items-center justify-end mt-4">
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
                            :disabled="isSubmitting">
                            {{isEditing ? 'Save task' : 'Create task'}}
                        </Button>
                    </div>
                </form>
            </Panel>
        </div>
    </Modal>
</template>