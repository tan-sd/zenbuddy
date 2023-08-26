<template>
    <NavBar />
    <router-view></router-view>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
    name: "App",
    components: {
        NavBar,
    },
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

a {
    text-decoration: none !important;
    color: #000000 !important;
}
</style>
