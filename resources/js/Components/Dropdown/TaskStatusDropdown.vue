<script setup>
import {defineProps, defineEmits, ref} from 'vue';
import Dropdown from '@/Components/Dropdown/Dropdown.vue';
import DropdownLink from '@/Components/Dropdown/DropdownLink.vue';
import Tag from '@/Components/Tag.vue';

import StatusEnum from '@/Enums/StatusEnum';
import SeverityEnum from '@/Enums/SeverityEnum';
import { updateTaskStatus } from '@/Services/TaskSevice';
import { getStatusLabel } from '@/Helpers/LabelHelper';
import { getStatusToSeverity } from '@/Helpers/SeverityMapperHelpers';
import Icon from '@/Components//Icon.vue';
import { getStatusIcon } from '@/Helpers/IconHelper';

const loading = ref(false);

const props = defineProps({
    status: {
        type: String,
        default: StatusEnum.PENDING,
        validator(value) {
            return Object.keys(StatusEnum).includes(value);
        }
    },
    taskId: {
        type: Number,
    },
    width: {
        type: String,
        default: '40',
    },
    align: {
        type: String,
        default: 'right',
    },
    makeRequest: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['change-status', 'start-fetch', 'end-fetch'])

const onChangeStatus = async (taskId, status) => {
    loading.value = true;
    emit('start-fetch');

    if (taskId && props.makeRequest) {
        await updateTaskStatus(taskId, status);
    }

    emit('change-status', taskId, status);

    loading.value = false;
    emit('end-fetch');
}
</script>

<template>
    <div class="relative">
        <Dropdown :align="props.align" :width="props.width">
            <template #trigger>
                <Tag :disabled="loading" :severity="getStatusToSeverity(props.status)">
                    <Icon :icon="getStatusIcon(props.status)" class="mr-2" />
                    {{ getStatusLabel(props.status) }}
                </Tag>
            </template>

            <template #content>
                <DropdownLink
                    :disabled="loading"
                    class="text-slate-600"
                    :severity="SeverityEnum.DEFAULT"
                    @click="onChangeStatus(props.taskId, StatusEnum.PENDING)">
                    <Icon :icon="getStatusIcon(StatusEnum.PENDING)" class="mr-1" />
                    {{ getStatusLabel(StatusEnum.PENDING) }}
                </DropdownLink>

                <DropdownLink
                    :disabled="loading"
                    class="text-blue-600"
                    :severity="SeverityEnum.DEFAULT"
                    @click="onChangeStatus(props.taskId, StatusEnum.IN_PROGRESS)">
                    <Icon :icon="getStatusIcon(StatusEnum.IN_PROGRESS)" class="mr-1" />
                    {{ getStatusLabel(StatusEnum.IN_PROGRESS) }}
                </DropdownLink>

                <DropdownLink
                    :disabled="loading"
                    class="text-green-600"
                    :severity="SeverityEnum.DEFAULT"
                    @click="onChangeStatus(props.taskId, StatusEnum.COMPLETED)">
                    <Icon :icon="getStatusIcon(StatusEnum.COMPLETED)" class="mr-1" />
                    {{ getStatusLabel(StatusEnum.COMPLETED) }}
                </DropdownLink>
            </template>
        </Dropdown>
    </div>
</template>