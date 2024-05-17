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

const getAllowedColumns = (data) => {
    const rawData = toRaw(data);

    if (rawData) {
        return rawData?.map(item => {
            const keys = props.headers || [];
            const finalItem = {};

            Object.keys(item)
                .filter((key) => key && keys?.indexOf(key) > -1)
                .forEach((key) => {
                    if (item[key]) {
                        finalItem[key] = item[key];
                    }
                });

            return finalItem;
        });
    }

    return [];
}

const tableRows = computed(() => {
    const rawData = toRaw(props.data);

    if (rawData) {
        return rawData?.map(item => {
            const keys = props.headers || [];
            const finalItem = {};

            Object.keys(item)
                .filter((key) => key && keys?.indexOf(key) > -1)
                .forEach((key) => {
                    if (item[key]) {
                        finalItem[key] = item[key];
                    }
                });

            return finalItem;
        });
    }

    return [];
});

console.log(tableRows.value)

</script>

<template>
    <table class="min-w-full divide-y divide-gray-300 border-collapse">
        <thead class="bg-gray-50">
            <slot name="header" />

            <th v-for="header in headers" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                {{header}}
            </th>
        </thead>

        <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(row, rowIndex) in tableRows">
                <slot name="row" :item="row" :index="rowIndex" />
            </tr>
        </tbody>
    </table>
</template>