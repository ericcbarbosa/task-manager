import { reactive } from 'vue'
import SeverityEnum from "@/Enums/SeverityEnum.js";

export const ToastService = reactive({
    notifications: [],
    push(message, severity, context) {
        this.notifications.push({
            context,
            message,
            severity,
        });
    },
    dismiss(index) {
        this.notifications = this.notifications
            .filter((toast, currentIndex) => index !== currentIndex);
    },
    error(message, context = '') {
        this.push(message, SeverityEnum.DANGER, context);
    },
    success(message, context = '') {
        this.push(message, SeverityEnum.SUCCESS, context);
    },
    info(message, context = '') {
        this.push(message, SeverityEnum.INFO, context);
    },
    warn(message, context = '') {
        this.push(message, SeverityEnum.WARNING, context);
    },
    default(message, context = '') {
        this.push(message, SeverityEnum.DEFAULT, context);
    },
});