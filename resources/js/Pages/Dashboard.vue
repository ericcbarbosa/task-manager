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
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import FloatingButton from '@/Components/FloatingButton.vue';
import Panel from '@/Components/Panel.vue';
import CreateOrEditTask from '@/Components/Modals/CreateOrEditTaskModal.vue';
import ViewTaskModal from '@/Components/Modals/ViewTaskModal.vue';
import { getStatusToSeverity } from '@/Helpers/SeverityMapperHelpers';
import StatusEnum from '@/Enums/StatusEnum';
import { getTheme } from '@/Theme/ButtonsTheme';
import Icon from '@/Components/Icon.vue';

const loading = ref(false);
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
                    <Table v-if="data" :headers="headers" :data="data" @row-click="onRowClick">
                        <template #row="{ item = {} }">
                            <td id="task-owner" class="w-24 p-4 text-sm font-medium text-gray-900">
                                <div class="flex flex-col items-center">
                                    <Avatar
                                        :user="item?.user"
                                        :imageUrl="item?.user?.avatar"
                                    />
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

                            <td id="task-status" class="w-32 p-4 text-sm font-medium text-gray-900">
                                <div class="relative">
                                    <Dropdown align="right" width="48">
                                        <template #trigger>
                                            <Tag :severity="getStatusToSeverity(item.status)">
                                                <button>
                                                    {{ getStatusLabel(item.status) }}
                                                </button>
                                            </Tag>
                                        </template>

                                        <template #content>
                                            <DropdownLink
                                                :severity="SeverityEnum.DEFAULT"
                                                @click="onChangeStatus(item.id, StatusEnum.PENDING)">
                                                {{ getStatusLabel(StatusEnum.PENDING) }}
                                            </DropdownLink>

                                            <DropdownLink
                                                :severity="SeverityEnum.DEFAULT"
                                                @click="onChangeStatus(item.id, StatusEnum.IN_PROGRESS)">
                                                {{ getStatusLabel(StatusEnum.IN_PROGRESS) }}
                                            </DropdownLink>

                                            <DropdownLink
                                                :severity="SeverityEnum.DEFAULT"
                                                @click="onChangeStatus(item.id, StatusEnum.COMPLETED)">
                                                {{ getStatusLabel(StatusEnum.COMPLETED) }}
                                            </DropdownLink>
                                        </template>
                                    </Dropdown>
                                </div>
                            </td>

                            <td id="task-actions" class="w-32 p-4 text-right font-medium text-gray-900">
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
                                                v-if="$page.props.auth.user.id === item.user.id"
                                                @click="onTakeTask(item.id)"
                                                class="text-blue-600">
                                                <Icon icon="hand" class="mr-2" />
                                                Take
                                            </DropdownLink>

                                            <DropdownLink @click="onTakeTask(item.id)" class="text-green-600">
                                                <Icon icon="pencil" class="mr-2" />
                                                Edit
                                            </DropdownLink>

                                            <DropdownLink @click="onTakeTask(item.id)" class="text-red-600">
                                                <Icon icon="trash" class="mr-2" />
                                                Delete
                                            </DropdownLink>
                                        </template>
                                    </Dropdown>
                                </div>
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
