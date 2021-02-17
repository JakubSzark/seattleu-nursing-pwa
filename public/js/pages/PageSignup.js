export default {
    template: `
        <div class="signup-page">
            <img src="./images/icons/back.svg" alt="back" 
                    width="42px" class="back-button" @click="onBackPressed">
            <div class="login-page-title">
                Create an Account
            </div>
            <form class="login-page-form" @submit="onSubmit">
                <div class="form-entry">
                    <label for="email">Email Address</label>
                    <input
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="johnsmith@gmail.com"
                        v-model="email"
                        required
                    > 
                </div>
                <div class="form-entry">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="*********"
                        v-model="password"
                        required
                    > 
                </div>
                <div class="form-entry">
                    <label for="password">Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirm-password" 
                        id="confirm-password" 
                        placeholder="*********"
                        v-model="passwordConfirm"
                        required
                    > 
                </div>
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    `,
    data: function() {
        return {
            email: "",
            password: "",
            passwordConfirm: "",
        };
    },
    mounted: function() {
        this.$store.dispatch("setFullscreen", true);
    },
    methods: {
        onBackPressed: function() {
            this.$store.dispatch('changePage', 3);
        },

        onSubmit: function(e) {
            if (this.email.length > 0 && this.password.length > 0 && 
                this.password == this.passwordConfirm) {
                    this.$store.dispatch('signUp', { 
                        email: this.email, 
                        password: this.password 
                    });
                }

            e.preventDefault();
        }
    }
};