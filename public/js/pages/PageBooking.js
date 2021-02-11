import Card from "../components/Card.js";
import Calendar from "../components/Calendar.js";

export default {
    template: `
        <div class="booking-page">
            <Card>
                <h2 class="center">Schedule an Appointment</h2>
                <p class="center">
                    Select an available date
                </p>
            </Card>

            <Card>
                <h1 class="center">{{ monthToString }}</h1>
            </Card>

            <Card>
                <Calendar 
                    :currentMonth="currentDate.getMonth()"
                    @daySelect="onDaySelected"
                />
            </Card>
            
            <div class="booking-page-buttons">
                <button 
                    @click="onBackPressed"
                    :disabled="backDisabled"
                >
                    Back
                </button>
                <button 
                    @click="onNextPressed"
                    :disabled="nextDisabled"
                >
                    Next
                </button>
            </div>
        </div>
    `,
    components: {
        Card,
        Calendar
    },
    data: function() {
        return {
            currentDate: new Date(),
            selectedDay: 0,
            step: 0,
        };
    },
    computed: {
        monthToString: function() {
            return this.currentDate
                .toLocaleString('default', { month: 'long' });
        },

        backDisabled: function() {
            return this.step === 0;
        },

        nextDisabled: function() {
            return this.selectedDay === 0;
        }
    },
    methods: {
        onDaySelected: function(day) {
            this.selectedDay = day;
        },

        onBackPressed: function() {

        },

        onNextPressed: function() {

        }
    }
};