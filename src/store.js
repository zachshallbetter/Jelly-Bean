import { reactive } from 'vue'

const state = reactive({
    widgetPosition: {
        top: 100,
        left: 100,
    },
})

export default {
    state,
}
