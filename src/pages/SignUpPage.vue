<template>
    <div class="container d-flex justify-content-center align-items-center">
        <form class="flex-column">
            <div class="form-floating mb-3">
                <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Email"
                    v-model="email"
                />
                <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Username"
                    v-model="username"
                />
                <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    type="password"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Password"
                    v-model="password"
                />
                <label for="floatingInput">Password</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    type="password"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Confirm Password"
                    v-model="confirmPassword"
                />
                <label for="floatingInput">Confirm Password</label>
            </div>
            <div class="row mb-3 mt-5">
                <div class="col text-center">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        @click.prevent="handleSignUp()"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
            <div class="text-center">
                <span class="me-2">Already have an account?</span>
                <router-link to="/login">Login</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import router from "@/router";
import { createUser, storeUserData } from "../firebase/index";

export default {
    name: "LoginPage",
    components: {},
    data() {
        return {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        };
    },
    methods: {
        handleSignUp() {
            createUser(this.email, this.password)
                .then((userCredential) => {
                    console.log(this.username);
                    storeUserData(userCredential.user.uid, this.username);
                    console.log(userCredential.user.uid);
                    const user = userCredential.user;
                    console.log(user, " created successfully");
                    router.push("/login");
                })
                .catch((error) => {
                    console.error("Error creating user: ", error);
                });
        },
    },
};
</script>

<style>
.container {
    margin-top: 250px;
}

.form-floating {
    width: 400px;
}
</style>
