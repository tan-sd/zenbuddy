<template>
    <nav class="navbar">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">
                <img
                    class="logo"
                    src="../assets/images/logo/zenbuddy-logo.png"
                />
            </router-link>
            <div>
                <ul class="navbar-nav me-4">
                    <li class="nav-item">
                        <router-link
                            v-if="signInStatus"
                            to="/"
                            class="nav-item"
                            @click="handleSignOut"
                        >
                            Sign out
                        </router-link>
                        <router-link v-else to="/Login" class="nav-item">
                            Login
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { auth, signOutUser } from "../firebase/index";
export default {
    data() {
        return {
            signInStatus: false,
        };
    },
    methods: {
        handleSignOut() {
            signOutUser();
        },
    },
    created() {
        auth.onAuthStateChanged((user) => {
            this.signInStatus = user !== null;
        });
    },
};
</script>

<style>
.logo {
    height: 60px;
    width: auto;
}
</style>
