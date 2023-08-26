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
        <div class="canvas w-100">
            <Renderer ref="renderer" alpha antialias resize>
                <Camera :position="{ z: 7 }" />
                <Scene>
                    <AmbientLight />
                    <GltfModel ref="books" src="/models/books.glb" :position="{y: -1}" />
                </Scene>
            </Renderer>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: 0,
        };
    },
    mounted() {
        const renderer = this.$refs.renderer;
        const books = this.$refs.books.scene;

        renderer.onBeforeRender(() => {
            books.rotation.y = Math.sin(this.time) * 0.5;

            const distance = 0.25;
            books.position.y = Math.sin(this.time) * distance;

            this.time += 0.01;
        });
    },
};
</script>

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
.canvas {
    height: 700px;
}
</style>
