const AppNav = {
    name: 'app-nav',
    template: `
        <nav class="app-nav">
            <img 
                class="app-nav-logo"
                src="./images/logo.svg" 
                alt="logo" 
                width="42px" 
                @click="onLogoPressed"
            >
            <div class="app-nav-name">
                Polonez Automotive
            </div>
            <img
                class="app-nav-account"
                src="./images/account.svg"
                alt="account"
                width="42px"
                @click="onAccountPressed"
            >
        </nav>
    `,
    methods: {
        onLogoPressed: function() {
            console.log("nav: logo pressed");
        },

        onAccountPressed: function() {
            console.log("nav: account pressed");
        }
    }
};

export default AppNav;