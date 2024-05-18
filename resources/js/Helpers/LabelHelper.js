import StatusEnum from "@/Enums/StatusEnum";
import PriorityEnum from "@/Enums/PriorityEnum";

export const STATUS_LABELS = {
    [StatusEnum.PENDING]: 'Pending',
    [StatusEnum.IN_PROGRESS]: 'In Progress',
    [StatusEnum.COMPLETED]: 'Completed',
};

export const getStatusLabel = (status = StatusEnum.PENDING) => {
    return STATUS_LABELS[status];
};

export const PRIORITY_LABELS = {
    [PriorityEnum.HIGH]: 'High',
    [PriorityEnum.MEDIUM]: 'Pending',
    [PriorityEnum.LOW]: 'Pending',
};

export const getPriorityLabel = (priority = PriorityEnum.LOW) => {
    return PRIORITY_LABELS[priority];
};