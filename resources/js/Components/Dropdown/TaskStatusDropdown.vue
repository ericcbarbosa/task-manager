<script setup>
import { defineProps, defineEmits } from 'vue';
import Dropdown from '@/Components/Dropdown/Dropdown.vue';
import DropdownLink from '@/Components/Dropdown/DropdownLink.vue';
import Tag from '@/Components/Tag.vue';

import StatusEnum from '@/Enums/StatusEnum';
import SeverityEnum from '@/Enums/SeverityEnum';
import { updateTaskStatus } from '@/Services/TaskSevice';
import { getStatusLabel } from '@/Helpers/LabelHelper';
import { getStatusToSeverity } from '@/Helpers/SeverityMapperHelpers';
import Icon from '../Icon.vue';
import { getStatusIcon } from '@/Helpers/IconHelper';

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['change-status'])

const onChangeStatus = async (taskId, status) => {
    if (taskId) {
        await updateTaskStatus(taskId, status);
    }

    emit('change-status');
}

console.log('==> props', props);
</script>

<template>
    <div class="relative">
        <Dropdown align="right" width="40">
            <template #trigger>
                <Tag :severity="getStatusToSeverity(props.task.status)">
                    <button class="flex flex-row justify-center items-center w-full">
                        <Icon :icon="getStatusIcon(props.task.status)" class="mr-2" />
                        {{ getStatusLabel(props.task.status) }}
                    </button>
                </Tag>
            </template>

            <template #content>
                <DropdownLink
                    class="text-slate-600"
                    :severity="SeverityEnum.DEFAULT"
                    @click="onChangeStatus(props.task.id, StatusEnum.PENDING)">
                    <Icon :icon="getStatusIcon(StatusEnum.PENDING)" class="mr-1" />
                    {{ getStatusLabel(StatusEnum.PENDING) }}
                </DropdownLink>

                <DropdownLink
                    class="text-blue-600"
                    :severity="SeverityEnum.DEFAULT"
                    @click="onChangeStatus(props.task.id, StatusEnum.IN_PROGRESS)">
                    <Icon :icon="getStatusIcon(StatusEnum.IN_PROGRESS)" class="mr-1" />
                    {{ getStatusLabel(StatusEnum.IN_PROGRESS) }}
                </DropdownLink>

                <DropdownLink
                    class="text-green-600"
                    :severity="SeverityEnum.DEFAULT"
                    @click="onChangeStatus(props.task.id, StatusEnum.COMPLETED)">
                    <Icon :icon="getStatusIcon(StatusEnum.COMPLETED)" class="mr-1" />
                    {{ getStatusLabel(StatusEnum.COMPLETED) }}
                </DropdownLink>
            </template>
        </Dropdown>
    </div>
</template>