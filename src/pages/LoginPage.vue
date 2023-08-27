<template>
    <div class="d-flex justify-content-center align-items-center">
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
                    type="password"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Password"
                    v-model="password"
                />
                <label for="floatingInput">Password</label>
            </div>
            <div class="row mb-3 mt-5">
                <div class="col text-center">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        @click.prevent="handleSignIn()"
                    >
                        Login
                    </button>
                </div>
            </div>
            <div class="text-center">
                <span class="me-2">Don't have an account?</span>
                <router-link to="/signup">Sign up</router-link>
            </div>
        </form>
    </div>
</template>

<script>
// import router from "@/router";
import router from "@/router";
import { auth, createUser, signInUser } from "../firebase/index";
import { getDatabase, ref, get, child, update } from "firebase/database";

export default {
    name: "LoginPage",
    components: {},
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        handleSignUp() {
            createUser(this.email, this.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user, " created successfully");
                })
                .catch((error) => {
                    console.error("Error creating user: ", error);
                });
        },
        handleSignIn() {
            signInUser(this.email, this.password)
                .then(() => {
                    const user = auth.currentUser;
                    const db = getDatabase();
                    const dbRef = ref(db);

                    get(child(dbRef, `users/${user.uid}`))
                        .then((snapshot) => {
                            if (snapshot.child("selectedColor").val() == null) {
                                update(ref(db, "users/" + user.uid), {
                                    selectedColor: "",
                                });
                                router.push("/customise");
                            } else {
                                router.push("/journal");
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error("Error signing in user: ", error);
                });
        },
    },
};
</script>

<style>

</style>
