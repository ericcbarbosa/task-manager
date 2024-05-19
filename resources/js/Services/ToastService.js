import { reactive } from 'vue'
import SeverityEnum from "@/Enums/SeverityEnum.js";

export const ToastService = reactive({
    notifications: [],
    delay: 2000,
    push(message, severity, context) {
        const length = this.notifications.push({
            context,
            message,
            severity,
        });

        setTimeout(() => {
            this.dismiss(length - 1);
        }, this.delay)
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