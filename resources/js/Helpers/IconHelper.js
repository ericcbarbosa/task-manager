import StatusEnum from "@/Enums/StatusEnum";
import PriorityEnum from "@/Enums/PriorityEnum";

export const STATUS_ICONS = {
    [StatusEnum.PENDING]: 'clock',
    [StatusEnum.IN_PROGRESS]: 'person-running',
    [StatusEnum.COMPLETED]: 'check',
};

export const getStatusIcon = (status = StatusEnum.PENDING)  => {
    return STATUS_ICONS[status];
}

export const PRIORITY_ICONS = {
    [PriorityEnum.LOW]: 'arrow-down',
    [PriorityEnum.MEDIUM]: 'square-minus',
    [PriorityEnum.HIGH]: 'triangle-exclamation',
};

export const getPriorityIcon = (priority = PriorityEnum.LOW)  => {
    return PRIORITY_ICONS[priority];
}