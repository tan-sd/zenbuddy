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

@font-face {
  font-family: sf-pro-display-regular;
  src: url("./assets/fonts/sf-display-pro/sf-pro-display-regular.otf");
}

* {
    padding: 0;
    margin: 0;
}

a {
    text-decoration: none !important;
    color: #000000 !important;
}

html {
  --bs-body-font-family: sf-pro-display-regular !important; 
}

</style>
