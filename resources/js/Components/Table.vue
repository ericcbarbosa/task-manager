<script setup>
import { computed, defineProps, toRaw } from 'vue';

const props = defineProps({
    headers: {
        type: Array,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['rowClick']);

</script>

<template>
    <table class="table-component min-w-full divide-y divide-gray-300 border-collapse">
        <thead class="table-component__header bg-white">
            <slot name="header" />

            <th v-for="header in headers" class="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 capitalize sm:pl-6">
                {{header}}
            </th>
        </thead>

        <tbody class="table-component__body divide-y divide-gray-100 bg-white">
            <tr v-for="(row, rowIndex) in props.data" @click="emit('rowClick', row, rowIndex)" class="table-component__body__td">
                <slot name="row" :item="row" :index="rowIndex" />
            </tr>
        </tbody>
    </table>
</template>