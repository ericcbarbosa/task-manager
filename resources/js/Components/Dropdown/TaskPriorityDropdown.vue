<script setup>
import { defineProps, defineEmits } from 'vue';
import Dropdown from '@/Components/Dropdown/Dropdown.vue';
import DropdownLink from '@/Components/Dropdown/DropdownLink.vue';
import Tag from '@/Components/Tag.vue';
import Icon from '@/Components/Icon.vue';

import { updateTaskPriority } from '@/Services/TaskSevice';
import { getPriorityLabel } from '@/Helpers/LabelHelper';
import { getPriorityToSeverity } from '@/Helpers/SeverityMapperHelpers';

import {getPriorityIcon} from '@/Helpers/IconHelper';
import PriorityEnum from '@/Enums/PriorityEnum.js';

const props = defineProps({
    priority: {
        type: String,
        default: PriorityEnum.LOW,
        validator(value) {
            return Object.keys(PriorityEnum).includes(value);
        }
    },
    taskId: {
        type: [Number, null],
        required: true,
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

const emit = defineEmits(['change-status', 'start-fetch', 'end-fetch', 'change-priority'])

const onChangePriority = async (taskId, status) => {
    emit('start-fetch');

    if (taskId && props.makeRequest) {
        await updateTaskPriority(taskId, status);
    }

    emit('change-priority', taskId, status);
    emit('end-fetch');
}
</script>

<template>
    <div class="relative">
        <Dropdown :align="props.align" :width="props.width">
            <template #trigger>
                <Tag :severity="getPriorityToSeverity(props.priority)">
                  <Icon :icon="getPriorityIcon(props.priority)" class="mr-2" />
                    {{ getPriorityLabel(props.priority) }}
                </Tag>
            </template>

            <template #content>
                <DropdownLink
                    class="text-blue-600"
                    :severity="getPriorityToSeverity(PriorityEnum.LOW)"
                    @click="onChangePriority(props.taskId, PriorityEnum.LOW)">
                    <Icon :icon="getPriorityIcon(PriorityEnum.LOW)" class="mr-1" />
                    {{ getPriorityLabel(PriorityEnum.LOW) }}
                </DropdownLink>

                <DropdownLink
                    class="text-yellow-600"
                    :severity="getPriorityToSeverity(PriorityEnum.MEDIUM)"
                    @click="onChangePriority(props.taskId, PriorityEnum.MEDIUM)">
                    <Icon :icon="getPriorityIcon(PriorityEnum.MEDIUM)" class="mr-1" />
                    {{ getPriorityLabel(PriorityEnum.MEDIUM) }}
                </DropdownLink>

                <DropdownLink
                    class="text-red-600"
                    :severity="getPriorityToSeverity(PriorityEnum.HIGH)"
                    @click="onChangePriority(props.taskId, PriorityEnum.HIGH)">
                    <Icon :icon="getPriorityIcon(PriorityEnum.HIGH)" class="mr-1" />
                    {{ getPriorityLabel(PriorityEnum.HIGH) }}
                </DropdownLink>
            </template>
        </Dropdown>
    </div>
</template>