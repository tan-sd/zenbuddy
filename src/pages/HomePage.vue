<template>
    <div class="container-fluid d-flex">
        <div class="about-content">
            <div class="about-title mb-3">
                YOUR PERSONALISED JOURNAL COMPANION
            </div>
            <div class="about-text mb-3">
                Immerse yourself in ZenBuddy, where artistry meets purpose, and
                individuality finds its sanctuary. Our meticulously crafted
                journaling app unites a diverse community with a common goal:
                nurturing mental well-being and fostering personal growth.
            </div>
            <button class="about-button">
                <router-link to="/login"> Begin your journey </router-link>
            </button>
        </div>
        <div class="canvas">
            Hello World
        </div>
    </div>
</template>

<style>
@font-face {
    font-family: sf-pro-display-bold;
    src: url("../assets/fonts/sf-display-pro/sf-pro-display-bold.otf");
}
.about-title {
    font-family: sf-pro-display-bold !important;
    letter-spacing: 1.5px;
}

.about-button {
    font-family: sf-pro-display-bold !important;
    background: none;
    padding: 10px;
    border-radius: 3.5rem;
}
</style>
