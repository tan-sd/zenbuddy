<template>
    <div id="webWrapper" class="d-flex flex-column">
        <NavBar id="navbar" class="sticky-top" />
        <router-view id="restOfWebsite" class=""></router-view>
    </div>
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

#webWrapper {
    height: 100vh;
}

#navbar {
    flex: 0 0 auto;
}

#restOfWebsite {
    flex: 1 1 1px;
    overflow: auto;
}

</style>
