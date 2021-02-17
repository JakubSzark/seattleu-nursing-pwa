import AppointmentForm from "../components/AppointmentForm.js";

export default {
    template: `
        <div class="booking-page">
            <img src="./images/icons/back.svg" alt="back" 
                        width="42px" class="back-button" @click="onBackPressed">

            <h2 v-if="loggedIn && !timeSelected">
                Book an Appointment
            </h2>
            <p v-if="loggedIn && !timeSelected">
                Please select a date and time
            </p>

            <h2 v-if="!loggedIn && !timeSelected" class="login-text">
                Please Login to Make an Appointment
            </h2>
            <button v-if="!loggedIn && !timeSelected" class="login-button" @click="onLoginPressed">
                Login
            </button>

            <div class="booking-dates" v-if="loggedIn && !timeSelected">
                <div class="booking-date" @click="selectDate(0)">
                    <div class="date-day">Mon</div>
                    <div class="date-number">{{ startDate }}</div>
                </div>
                <div class="booking-date" @click="selectDate(1)">
                    <div class="date-day">Tue</div>
                    <div class="date-number">{{ startDate + 1 }}</div>
                </div>
                <div class="booking-date" @click="selectDate(2)">
                    <div class="date-day">Wed</div>
                    <div class="date-number">{{ startDate + 2 }}</div>
                </div>
                <div class="booking-date" @click="selectDate(3)">
                    <div class="date-day">Thu</div>
                    <div class="date-number">{{ startDate + 3 }}</div>
                </div>
                <div class="booking-date" @click="selectDate(4)">
                    <div class="date-day">Fri</div>
                    <div class="date-number">{{ startDate + 4 }}</div>
                </div>
            </div>

            <img src="./images/icons/loading.gif" alt="loading..." v-if="isLoading">

            <div class="booking-hours" v-if="loggedIn && !isLoading && !timeSelected">
                <button 
                    class="booking-timeslot"
                    v-for="(timeslot, index) in Object.values(timeslots)"
                    :disabled="timeslot.taken"
                    :key="timeslot.time"
                    @click="onTimeSelected(index)"
                >
                    {{ timeslot.time }}
                    <button 
                        class="remove-button" 
                        v-if="timeslot.isOwner" 
                        @click="cancelAppointment(index)"
                    >
                    x
                    </button>
                </button>
            </div>

            <AppointmentForm v-if="timeSelected" 
                :time="times[selectedTime]"
                :day="selectedDay"
                :timeslot="selectedTime"
            />
        </div>
    `,
    components: {
        AppointmentForm,
    },
    data: function() {
        return {
            selectedDay: 0,
            selectedTime: 0,
            startDate: 0,
            timeslots: {},
            timeSelected: false,
            isLoading: false,
            times: [
                "9:00 AM",
                "10:00 AM",
                "11:00 AM",
                "12:00 PM",
                "1:00 PM",
                "2:00 PM",
                "3:00 PM",
                "4:00 PM",
            ],
        };
    },
    mounted: function() {
        this.$store.dispatch("setFullscreen", true);

        const now = new Date();
        this.startDate = new Date(now.getFullYear(), 
            now.getMonth(), now.getDate() - now.getDay() + 1 + 7)
            .getDate();

        this.selectDate(0);
    },
    computed: {
        loggedIn: function() {
            return this.$store.getters.isLoggedIn;
        },
    },
    methods: {
        generateTimeSlots: function() {
            for (let i = 0; i < 8; i++) {
                this.timeslots[i] = {
                    taken: false,
                    time: this.times[i],
                    isOwner: false,
                    id: '',
                };
            }
        },

        getDateAppointments: function() {
            this.isLoading = true;
            firebase.firestore()
                .collection("appointments")
                .where("day", "==", this.selectedDay)
                .get()
                .then(snapshot => {
                    this.isLoading = false;
                    this.generateTimeSlots();
                    snapshot.docs.forEach((doc) => {
                        const data = doc.data();
                        const timeslot = data.timeslot;
                        this.timeslots[timeslot].taken = true;
                        this.timeslots[timeslot].isOwner = 
                            data.user == this.$store.state.user.uid
                        this.timeslots[timeslot].id = doc.id;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },

        selectDate: function(number) {
            if (!this.loggedIn) return;

            this.selectedDay = number;
            const dates = document.getElementsByClassName('booking-date');
            dates[number].classList.add("selected");

            for (let i = 0; i < dates.length; i++) {
                if (i !== number) {
                    dates[i].classList.remove("selected");
                }
            }

            this.getDateAppointments();
        },

        onTimeSelected: function(timeslot) {
            this.timeSelected = true;
            this.selectedTime = timeslot;
        },
        
        onBackPressed: function() {
            if (this.timeSelected) {
                this.timeSelected = false;
            } else {
                this.$store.dispatch("changePage", 0);
            }
        },

        onLoginPressed: function() {
            this.$store.dispatch("changePage", 3);
        },

        cancelAppointment: function(index) {
            this.isLoading = true;
            firebase.firestore()
                .collection("appointments")
                .doc(this.timeslots[index].id)
                .delete()
                .then(() => {
                    this.isLoading = false;
                    this.selectDate(0);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};