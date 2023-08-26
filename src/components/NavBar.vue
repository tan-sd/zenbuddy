<template>
    <nav class="navbar">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">
                <img class="logo" src="../assets/images/logo/zenbuddy-logo.png" />
            </router-link>
            <div>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/Login" class="nav-item">
                            Login
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style>
    .logo {
        height: 60px;
        width: auto;
    }
</style>