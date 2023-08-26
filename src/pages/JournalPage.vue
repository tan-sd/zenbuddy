<template>
    <div class="container border border-primary mt-3">
        <div class="row border border-dark">
            <!-- Quote & Calendar Column -->
            <div class="col-4 border border-secondary">
                <div class="row border border-dark fw-bold fs-3 lh-lg my-3"> Welcome John!</div>
                <!-- Quote -->
                <div class="row fw-light fst-italic my-3 fs-5">“ The bad thing is that the time is short… and the good thing is that there is still some time..” </div>
                
                <!-- Calendar -->
                <div class="row border border-dark">
                    <div class="vue-root">
                        <smart-calendar id="calendar"></smart-calendar>
                        <div class="options">
                            <div class="caption">Events</div>
                            <div class="option" id="log"></div>
                        </div>
                    </div>

                </div>
            </div>



            <!-- Journal Column -->
            <div class="col-8 border border-warning">hellox  </div>
        </div>

    </div>
</template>

<script>
import { onMounted } from "vue";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.calendar.js";
export default {
  name: "JournalPage",
  setup() {
    onMounted(() => {
      const calendar = document.querySelector("smart-calendar");
      calendar.addEventListener("change", function(event) {
        document.getElementById(
          "log"
        ).innerHTML = event.detail.value.toString();
      });
    });
  },

  data() {
        return {

        }
    },
    methods(){

    }
};




</script>
