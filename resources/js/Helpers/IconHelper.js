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