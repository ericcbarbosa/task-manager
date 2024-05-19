import { reactive } from 'vue'
import SeverityEnum from "@/Enums/SeverityEnum.js";

export const ToastService = reactive({
    notifications: [],
    timers: [],
    delay: 1500,
    push(message, severity, context) {
        const length = this.notifications.push({
            context,
            message,
            severity,
        });

        this.timers.push(setTimeout(() => {
            console.log('==> dismiss: ', length - 1);
            this.dismiss(length - 1);
        }, this.delay));
    },
    dismiss(index) {
        this.notifications = this.notifications
            .filter((toast, currentIndex) => {
                console.log('==> currentIndex, index: ', currentIndex, index);
                return index !== currentIndex;
            });
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