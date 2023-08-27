<template>
    <div id="homePageContainer" class="d-flex">
        <div id="home-title-container" class="about-content d-flex align-items-center mx-5">
            <div>
                <div class="mb-3">
                    YOUR PERSONALISED JOURNAL COMPANION
                </div>
                <div class="mb-3">
                    Immerse yourself in ZenBuddy, where artistry meets purpose, and
                    individuality finds its sanctuary. Our meticulously crafted
                    journaling app unites a diverse community with a common goal:
                    nurturing mental well-being and fostering personal growth.
                </div>
                <button class="btn btn-primary">
                    <router-link to="/login">
                        <div class="about-button">Begin your journey</div>
                    </router-link>
                </button>
            </div>
        </div>
        <div id="book-3d-container" class="canvas w-100">
            <Renderer ref="renderer" alpha antialias resize>
                <Camera :position="{ z: 7 }" />
                <Scene>
                    <AmbientLight />
                    <GltfModel
                        ref="books"
                        src="/models/books.glb"
                        :position="{ y: -1 }"
                    />
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

<style scoped>

#homePageContainer {
    overflow: hidden;
    height: 1px;
}
#home-title-container {
    height: 100%;
    overflow: hidden;
}
#book-3d-container {
    height: 100%;
    overflow: hidden;
}
.about-button{
    color: white;
}
</style>
