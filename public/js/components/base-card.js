const BaseCard = {
    name: 'base-card',
    template: `
        <div class="base-card">
            <div class="base-card-image">
                <img :src="imageUrl" alt="card">
            </div>
            <div class="base-card-text">
                <h2>{{ title }}</h2>
                <div class="base-card-desc">
                    <slot></slot>
                </div>
            </div>
        </div>
    `,
    props: {
        imageUrl: String,
        title: String,
    },
};

export default BaseCard;
