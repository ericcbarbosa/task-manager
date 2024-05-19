import { reactive } from 'vue'
import SeverityEnum from "@/Enums/SeverityEnum.js";

export const ToastService = reactive({
    notifications: [],
    timers: [],
    delay: 2000,
    push(message, severity, context) {
        const index = this.notifications.push({
            context,
            message,
            severity,
        });

        this.timers.push(setTimeout(() => {
            this.dismiss(index);
        }, this.delay));
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