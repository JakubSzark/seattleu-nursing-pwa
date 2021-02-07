const ProfilePage = {
    name: 'profile-page',
    template: `
        <div class="profile-page">
            <img
                :src="profileImg"
                alt="profile-img"
                width="64px"
            >
            <div class="profile-page-info">
                <p class="profile-name">{{ email }}</p>
            </div>
            <button @click="onSignOutPressed">
                Sign out
            </button>
        </div>
    `,
    computed: {
        profileImg: function() {
            return this.$store.getters.profileImg;
        },

        email: function() {
            return this.$store.getters.isLoggedIn ?
                `${this.$store.state.user.email}` : "";
        }
    },
    methods: {
        onSignOutPressed: function() {
            this.$store.dispatch('signOut');
        }
    }
};

export default ProfilePage;