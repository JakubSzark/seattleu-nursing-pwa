export default {
    template: `
        <div class="appointment-form">
            <img src="./images/icons/loading.gif" alt="loading..." v-if="isLoading">
            <form class="appointment-form" @submit="onSubmit" v-if="!isLoading">
                <h2 class="form-title">{{ days[day] }} ({{ time }})</h2>
                <label for="vehicle">Vehicle</label>
                <input 
                    type="text" 
                    name="vehicle" 
                    id="vehicle" 
                    placeholder="bmw x3"
                    v-model="vehicle"
                    required
                > 
                <label for="reason">Reason</label>
                <input 
                    type="text" 
                    name="reason" 
                    id="reason" 
                    placeholder="smells bad"
                    v-model="reason"
                    required
                > 
                <input type="submit" value="Submit" />
            </form>
        </div>
    `,
    props: {
        time: "",
        timeslot: 0,
        day: 0,
    },
    data: function() {
        return {
            isLoading: false,
            vehicle: "",
            reason: "",
            days: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
        };
    },
    methods: {
        onSubmit: function(e) {
            const user = this.$store.state.user;
            if (this.vehicle.length > 0 && this.reason.length > 0 && user !== undefined) {
                this.isLoading = true;
                const doc = firebase.firestore()
                    .collection("appointments")
                    .doc();
                    
                doc.set({
                    day: this.day,
                    reason: this.reason,
                    timeslot: this.timeslot,
                    vehicle: this.vehicle,
                    user: user.uid,
                })
                .then(() => {
                    this.isLoading = false;
                    this.$store.dispatch('changePage', 0);
                })
                .catch(err => {
                    console.log(err);
                });
            }

            e.preventDefault();
        }
    }
};