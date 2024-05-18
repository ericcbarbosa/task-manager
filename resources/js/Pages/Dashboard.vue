<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import SeverityEnum from '@/Enums/SeverityEnum.js';
import { getStatusLabel } from '@/Helpers/LabelHelper';
import { createTask, deleteTask, getTasks, takeTask, updateTaskStatus } from '@/Services/TaskSevice';
import Table from '@/Components/Table.vue';
import Avatar from '@/Components/Avatar.vue';
import Tag from '@/Components/Tag.vue';
import { onMounted, ref, nextTick } from 'vue';
import Button from '@/Components/Button.vue';
import FloatingButton from '@/Components/FloatingButton.vue';
import Panel from '@/Components/Panel.vue';
import CreateOrEditTask from '@/Components/Modals/CreateOrEditTask.vue';
import ViewTaskModal from '@/Components/Modals/ViewTaskModal.vue';
import { getStatusToSeverity } from '@/Helpers/SeverityMapperHelpers';

const loading = ref(false);
const isEditing = ref(false);
const data = ref([]);
const selectedRow = ref();
const headers = [
    'name',
    'description',
    'status',
    'actions',
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

const showViewModal = ref(false);
const showEditOrCreateModal = ref(false);

const onRowClick = async (item) => {
    showEditOrCreateModal.value = false;

    selectedRow.value = item;
    isEditing.value = true;

    showViewModal.value = true;
}

const onViewModalEditClick = async (item) => {
    showViewModal.value = false;

    selectedRow.value = item;
    isEditing.value = true;

    showEditOrCreateModal.value = true;
}

const onCreateTaskClick = () => {
    showViewModal.value = false;
    showEditOrCreateModal.value = true;
}

const onCreateTask = async (task) => {
    loading.value = true;

    if (task) {
        const tasks = await createTask(task);
        data.value = tasks;
    }

    fetchTasks();
}

const onDeleteTask = async (taskId) => {
    loading.value = true;

    if (taskId) {
        const tasks = await deleteTask(taskId);
        data.value = tasks;
    }

    fetchTasks();
}

const onEditTask = async (task) => {
    loading.value = true;

    if (task) {
        const tasks = await updateTask(task);
        data.value = tasks;
    }

    fetchTasks();
}

const onTakeTask = async (taskId) => {
    loading.value = true;

    if (taskId) {
        const tasks = await takeTask(taskId);
        data.value = tasks;
    }

    fetchTasks();
}

const onChangeStatus = async (taskId, status) => {
    loading.value = true;

    if (taskId) {
        const tasks = await updateTaskStatus(taskId, status);
        data.value = tasks;
    }

    fetchTasks();
}

</script>

<template>
    <div>
        <Head title="Dashboard" />

        <AuthenticatedLayout>
            <template #header>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
            </template>

            <section class="max-w-7xl mx-auto sm:px-6 lg:px-4 py-4 my-4">
                <Panel>
                    <Table :headers="headers" :data="data" @rowClick="onRowClick">
                        <template #row="{ item = {} }">
                            <td id="task-owner" class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <div class="flex flex-row items-center">
                                    <Avatar
                                        :user="item?.user"
                                        :imageUrl="item?.user?.avatar"
                                    />

                                    <p class="ml-3.5">{{ item.name}}</p>
                                </div>
                            </td>

                            <td id="task-description" class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p class="leading-tight text-ellipsis overflow-hidden line-clamp-3">{{ item?.description }}</p>
                            </td>

                            <td id="task-status" class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <Tag :severity="getStatusToSeverity(item.status)">{{ getStatusLabel(item.status) }}</Tag>
                            </td>

                            <td id="task-actions" class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <Button :severity="SeverityEnum.SUCCESS" @click="onTakeTask(item.id)">Take on</Button>
                                <Button :severity="SeverityEnum.INFO" @click="onChangeStatus(item)">Change status</Button>
                            </td>
                        </template>
                    </Table>
                </Panel>
            </section>

            <ViewTaskModal
                v-if="isEditing && selectedRow"
                :show="showViewModal"
                :task="selectedRow"
                :is-editing="isEditing"
                @close="showViewModal = false"
                @delete="onDeleteTask"
                @take="onTakeTask"
                @edit="onViewModalEditClick"
            />

            <CreateOrEditTask
                v-if="isEditing && selectedRow || !isEditing"
                :show="showEditOrCreateModal"
                :task="selectedRow"
                :is-editing="isEditing"
                @close="showEditOrCreateModal = false"
                @create="onCreateTask"
                @edit="onEditTask"
            />
        </AuthenticatedLayout>
    </div>

    <FloatingButton
        :severity="SeverityEnum.SUCCESS"
        @click="onCreateTaskClick"
    />
</template>
