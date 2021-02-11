export default {
    template: `
        <div class="card">
            <img v-if="imageUrl && imageUrl.length > 0" :src="imageUrl" alt="card">
            <h2 class="card-title" v-if="title && title.length > 0">{{ title }}</h2>
            <div class="card-desc">
                <slot></slot>
            </div>
        </div>
    `,
    props: {
        imageUrl: "",
        title: "",
    },
};
