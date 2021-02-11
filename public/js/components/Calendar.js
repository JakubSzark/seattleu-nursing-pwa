export default {
    template: `
        <div class="calendar">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>TH</span>
            <span>F</span>
            <span>S</span>
            <span>SU</span>
            <button
                v-for="day in daysInMonth"
                :key="day"
                :disabled="isDisabled(day)"
                :style="selectedStyle(day)"
                @click="onDayPressed(day)"
            >
                {{ day }}
            </button>
        </div>
    `,
    props: {
        currentMonth: 0,
    },
    data: function() {
        return {
            selectedDay: 0,
        };
    },
    computed: {
        daysInMonth: function() {
            const year = (new Date()).getFullYear();
            return new Date(year, this.currentMonth + 1, 0).getDate();
        }
    },
    methods: {
        isDisabled: function(day) {
            const now = new Date();
            const daysLeft = this.daysInMonth - now.getDate();
            const currentDay = this.daysInMonth - daysLeft;
            const d = (new Date(now.getFullYear(), now.getMonth(), day)).getDay();
            return day <= currentDay || (d === 0) || (d === 6);
        },

        onDayPressed: function(day) {
            if (this.selectedDay === day) {
                this.selectedDay = 0;
            } else {
                this.selectedDay = day;
            }

            this.$emit('daySelect', this.selectedDay);
        },

        selectedStyle: function(day) {
            if (this.selectedDay === day) {
                return {
                    background: 'var(--red)'
                };
            } else {
                return {};
            }
        }
    }
};