<template>
    <div class="container d-flex justify-content-center align-items-center">
        <form class="flex-column">
            <div class="row mb-3">
                <div class="col-sm-3"></div>
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                    >Email</label
                >
                <div class="col-sm-7">
                    <input type="email" class="form-control" id="inputEmail3" />
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-2"></div>
                <label for="inputPassword3" class="col-sm-3 col-form-label"
                    >Password</label
                >
                <div class="col-sm-7">
                    <input
                        type="password"
                        class="form-control"
                        id="inputPassword3"
                    />
                </div>
            </div>
            <div class="row mb-3 mt-5">
                <div class="col text-center">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "LoginPage",
    components: {},
    data() {
        return {};
    },
    methods() {},
};
</script>

<style>
    .container {
        margin-top: 250px;
    }
    </style>
