import HttpService from '@/Services/HttpService';

export const getTasks = async () => {
    const resp = await HttpService.get('/api/tasks');

    return resp.data;
};

export const getTask = async (id) => {
    const resp = await HttpService.get(`/api/tasks/${id}`);

    return resp.data;
};

export const updateTask = async (task) => {
    const resp = await HttpService.put(`/api/tasks/${task.id}`, task);

    return resp.data;
};

export const createTask = async (task) => {
    const resp = await HttpService.post('/api/tasks/', task);

    return resp.data;
};

export const deleteTask = async (id) => {
    return HttpService.delete(`/api/tasks/${id}`);
};

export const takeTask = async (id) => {
    return HttpService.patch(`/api/tasks/${id}/take`);
};

export const updateTaskStatus = async (id, status) => {
    return HttpService.patch(`/api/tasks/${id}/status`, { status });
};

export const updateTaskPriority = async (id, priority) => {
    return HttpService.patch(`/api/tasks/${id}/priority`, { priority });
};

