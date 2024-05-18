import StatusEnum from "@/Enums/StatusEnum";
import PriorityEnum from "@/Enums/PriorityEnum";
import SeverityEnum from "@/Enums/SeverityEnum";

const STATUS_TO_SEVERITY = {
    [StatusEnum.PENDING]: SeverityEnum.DEFAULT,
    [StatusEnum.IN_PROGRESS]: SeverityEnum.INFO,
    [StatusEnum.COMPLETED]: SeverityEnum.SUCCESS,
};

export const getStatusToSeverity = (status = StatusEnum.PENDING) => {
    return STATUS_TO_SEVERITY[status];
};

const PRIORITY_TO_SEVERITY = {
    [PriorityEnum.LOW]: SeverityEnum.DEFAULT,
    [PriorityEnum.MEDIUM]: SeverityEnum.WARNING,
    [PriorityEnum.HIGH]: SeverityEnum.DANGER,
};

export const getPriorityToSeverity = (priority = PriorityEnum.LOW) => {
    return PRIORITY_TO_SEVERITY[priority];
};