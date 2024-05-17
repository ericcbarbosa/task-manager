<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import HttpService from '@/Services/HttpService';
import Table from '@/Components/Table.vue';
import { Head } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const data = ref([]);
const headers = [
    'name',
    'description',
    'status',
    'actions',
];

onMounted(async () => {
    const resp = await HttpService.get('/api/tasks');
    data.value = resp.data

    console.log('result', resp.data);
});

/**
 * TODO:
 * 1. Adicionar botoes de ação na tabela (Take, Change status)
 * 2. Adicionar visualização de detalhe com modal
 *  - Info adicional deadline, priority
 *  - Complete
 *  - Update status
 * 
 */

</script>

<template>
    <div>
        <Head title="Dashboard" />
    
        <AuthenticatedLayout>
            <template #header>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
            </template>
    
            <section class="max-w-7xl mx-auto sm:px-6 lg:px-4 py-4 my-4">
                <section class="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <Table :headers="headers" :data="data">
                        <template #row="{ item = {} }">
                            <td v-for="(key) in Object.keys(item)" class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p v-if="item[key]" class="fit-content max-w-lg">{{ item[key] }}</p>
                            </td>

                            <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 inline-flex">
                                <button>Take On</button> 

                                <button>Change status</button> 
                            </td>
                        </template>
                    </Table>
                </section>
            </section>
        </AuthenticatedLayout>
    </div>
</template>
