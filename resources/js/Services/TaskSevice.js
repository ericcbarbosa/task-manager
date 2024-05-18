import HttpService from '@/Services/HttpService';

export const getTasks = async () => {
    const resp = await HttpService.get('/api/tasks');

    return resp.data;
};

export const getTask = async (id) => {
    const resp = await HttpService.get(`/api/tasks/${id}`);

    return resp.data;
};

export const updateTask = async (id, task) => {
    const resp = await HttpService.post(`/api/tasks/${id}`, task);

    return resp.data;
};

export const createTask = async (task) => {
    const resp = await HttpService.post('/api/tasks/', task);

    return resp.data;
};

export const deleteTask = async (id) => {
    const resp = await HttpService.delete(`/api/tasks/${id}`);

    return resp.status === 201;
};

export const takeTask = async (id) => {
    const resp = await HttpService.patch(`/api/tasks/${id}/take`);

    return resp.status === 201;
};

export const updateTaskStatus = async (id, status) => {
    const resp = await HttpService.patch(`/api/tasks/${id}/status`, status);

    return resp.status === 201;
};

