import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useMessages = defineStore('messages', {
  
    state: () => ({
        notifications : [
            { type: "primary", message: "primary notification" },
            { type: "link", message: "link notification" },
            { type: "success", message: "success notification" },
            { type: "warning", message: "warning notification" },
            { type: "danger", message: "danger notification" },
          ]
    }),
    actions: {
        close(index: number) {
            this.notifications.splice(index, 1);
        }
    }
}) 