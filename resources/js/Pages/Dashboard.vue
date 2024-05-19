<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import SeverityEnum from '@/Enums/SeverityEnum.js';
import {createTask, deleteTask, getTasks, takeTask, updateTask, updateTaskStatus} from '@/Services/TaskSevice';
import Table from '@/Components/Table.vue';
import Avatar from '@/Components/Avatar.vue';
import { computed, onMounted, ref, watch } from 'vue';
import FloatingButton from '@/Components/Buttons/FloatingButton.vue';
import Panel from '@/Components/Panel.vue';
import CreateOrEditTaskModal from '@/Components/Modals/CreateOrEditTaskModal.vue';
import ViewTaskModal from '@/Components/Modals/ViewTaskModal.vue';
import TaskActionsDropdown from '@/Components/Dropdown/TaskActionsDropdown.vue';
import TaskStatusDropdown from '@/Components/Dropdown/TaskStatusDropdown.vue';
import {ToastService} from "@/Services/ToastService.js";
import {getStatusLabel} from "@/Helpers/LabelHelper.js";
import StatusEnum from "@/Enums/StatusEnum.js";

const loading = ref(false);
const loadingCreateTask = ref(false);
const loadingDeleteTask = ref(false);
const loadingEditTask = ref(false);
const loadingTakeOwnership = ref(false);

const isEditing = ref(false);
const data = ref([]);
const selectedRow = ref();
const headers = [
    'Owner',
    'name',
    'description',
    'status',
    '',
];

onMounted(async () => {
    await fetchTasks();
});

const fetchTasks = async () => {
    loading.value = true;

    const tasks = await getTasks();
    data.value = tasks;

    loading.value = false;
}

const onTakeOwnershipSuccess = async () => {
    ToastService.success('Good! This task is your\'s');
    await fetchTasks();
}

const onDeleteTaskSuccess = async () => {
    ToastService.success('Good! Task deleted');
    await fetchTasks();
}

const onChangeStatusSuccess = async (status) => {
    ToastService.success(`Good! Task status updated to "${getStatusLabel(status)}"`);
    await fetchTasks();
}

const showViewModal = ref(false);
const showEditOrCreateModal = ref(false);

const onRowClick = async (item) => {
    showEditOrCreateModal.value = false;

    selectedRow.value = item;
    isEditing.value = true;

    showViewModal.value = true;
}

const onShowEditModal = async (item) => {
    showViewModal.value = false;

    selectedRow.value = item;
    isEditing.value = true;
    
    showEditOrCreateModal.value = true;
}

const onCreateTaskClick = () => {
    isEditing.value = false;
    selectedRow.value = null;
    showViewModal.value = false;

    showEditOrCreateModal.value = true;
}

const onCreateTask = async (task) => {
    loadingCreateTask.value = true;

    if (task) {
        await createTask(task);
        await fetchTasks();

        showEditOrCreateModal.value = false;
    }

    loadingCreateTask.value = false;
}

const onDeleteTask = async (taskId) => {
    loadingDeleteTask.value = true;

    if (taskId) {
        const success = await deleteTask(taskId);

        if (success) {
            await fetchTasks();

            showEditOrCreateModal.value = false;
            showViewModal.value = false;
        }
    }

    loadingDeleteTask.value = false;
}

const onEditTask = async (task) => {
    loadingEditTask.value = true;

    if (task) {
        const success = await updateTask(task);

        if (success) {
            await fetchTasks();

            showEditOrCreateModal.value = false;
        }
    }

    loadingEditTask.value = false;
}

const onTakeOwnershipTask = async (taskId) => {
    loadingTakeOwnership.value = true;

    if (taskId) {
        await takeTask(taskId);
        await fetchTasks();

        showViewModal.value = false
    }

    loadingTakeOwnership.value = false;
}

const onCompleteEditModal = async (taskId) => {
    loadingEditTask.value = true;

    if (taskId) {
        await updateTaskStatus(taskId, StatusEnum.COMPLETED);
        await fetchTasks();
    }

    showViewModal.value = false;
    loadingEditTask.value = false;
}

const onCloseEditModal = () => {
    showEditOrCreateModal.value = false;
    selectedRow.value = null;
}

const onCloseViewModal = async () => {
    isEditing.value = false;
    showViewModal.value = false;
    showEditOrCreateModal.value = false;
    selectedRow.value = null;
}

const changedTask = computed(() => {
    if (data.value) {
        const dataTask = data.value?.find((task) => task?.id === selectedRow.value?.id);

        if (
            dataTask?.status !== selectedRow.value?.status
            || dataTask?.priority !== selectedRow.value?.priority
            || dataTask?.id !== selectedRow.value?.id
        ) {
            return dataTask;
        }

        return selectedRow.value;
    }
});

watch(() => showViewModal.value, () => {
    if (showViewModal.value === false) {
        selectedRow.value = null;
        isEditing.value = false;
    }
})

watch(changedTask, (newTask) => {
    selectedRow.value = newTask;
});

const isLoadingSomenthing = computed(() => {
    return loading.value
        || loadingTakeOwnership.value
        || loadingDeleteTask.value
        || loadingDeleteTask.value
        || loadingCreateTask.value
        || loadingEditTask.value
});

</script>

<template>
    <div>
        <Head title="Dashboard" />

        <AuthenticatedLayout>
            <template #header>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
            </template>

            <section class="max-w-7xl mx-auto sm:px-6 lg:px-4 py-4 my-4">
                <Panel :loading="isLoadingSomenthing" class="relative min-h-[350px]">
                    <Table v-if="data" :headers="headers" :data="data" @row-click="onRowClick">
                        <template #row="{ item = {} }">
                            <td id="task-owner" class="w-24 p-4 text-sm font-medium text-gray-900">
                                <div class="flex flex-col items-center">
                                    <Avatar :user="item?.user" />
                                </div>
                            </td>

                            <td id="task-owner" class="p-4 text-sm font-medium text-gray-900">
                                <div class="flex flex-row items-center">
                                    <p class="ml-3.5">{{ item.name}}</p>
                                </div>
                            </td>

                            <td id="task-description" class="p-4 text-sm font-medium text-gray-900">
                                <p class="leading-tight text-ellipsis overflow-hidden line-clamp-3">{{ item?.description }}</p>
                            </td>

                            <td id="task-status" class="w-40 p-4 text-sm font-medium text-gray-900">
                                <TaskStatusDropdown
                                    :taskId="item.id"
                                    :status="item.status"
                                    @change-status="fetchTasks"
                                    @start-fetch="loadingEditTask = true"
                                    @end-fetch="loadingEditTask = false"
                                />
                            </td>

                            <td id="task-actions" class="w-48 p-4 text-right font-medium text-gray-900">
                                <TaskActionsDropdown
                                    :current-user-id="$page.props.auth.user.id"
                                    :task="item"
                                    :disabled-take-on="item.status === StatusEnum.IN_PROGRESS"
                                    @edit="onShowEditModal"
                                    @take="onTakeOwnershipSuccess"
                                    @delete="onDeleteTaskSuccess"
                                    @change-status="onChangeStatusSuccess"
                                    @start-fetch="loadingEditTask = true"
                                    @end-fetch="loadingEditTask = false"
                                />
                            </td>
                        </template>
                    </Table>
                </Panel>
            </section>

            <ViewTaskModal
                v-if="isEditing && selectedRow"
                :loading="loading || loadingDeleteTask || loadingCreateTask || loadingEditTask"
                :show="showViewModal"
                :task="selectedRow"
                :is-editing="isEditing"
                @close="onCloseViewModal"
                @delete="onDeleteTask"
                @take="onTakeOwnershipTask"
                @edit="onShowEditModal"
                @complete="onCompleteEditModal"
                @change-status="fetchTasks"
                @change-priority="fetchTasks"
            />

            <CreateOrEditTaskModal
                :key="`${isEditing && selectedRow ? 'edit-modal' : 'create-modal'}`"
                v-if="isEditing && selectedRow || !isEditing"
                :loading="loading || loadingCreateTask || loadingEditTask"
                :show="showEditOrCreateModal"
                :task="selectedRow"
                :is-editing="isEditing"
                @close="onCloseEditModal"
                @create="onCreateTask"
                @edit="onEditTask"
            />
        </AuthenticatedLayout>
    </div>

    <FloatingButton
        :disabled="loading"
        :severity="SeverityEnum.SUCCESS"
        @click="onCreateTaskClick"
    />
</template>
