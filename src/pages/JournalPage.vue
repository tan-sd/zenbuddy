<template>
    <div class="container border border-primary mt-1">
        <div class="row border border-dark">
            <!-- Quote & Calendar Column -->
            <div class="col-4 border border-secondary">
                <div class="row border border-dark fw-bold fs-3 lh-lg my-3"> Welcome John!</div>
                <!-- Quote -->
                <div class="row fw-light fst-italic my-3 fs-5">“ The bad thing is that the time is short… and the good thing is that there is still some time..” </div>
                
                <!-- Calendar -->
                <div class="row border border-dark mx-auto mt-1">
                    <div class="vue-root">
                        <smart-calendar id="calendar"></smart-calendar>
                    </div>

                </div>
            </div>

            <!-- Journal Column -->
            <div class="col-8 border border-warning">hellox  </div>
        </div>

    </div>
</template>

<script>
import { onMounted} from "vue";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.calendar.js";
export default {
    name: "JournalPage",
    setup() {
    onMounted(() => {
        const calendar = document.querySelector("smart-calendar");

        // Get today's date to set maximum date
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayFormattedDate = `${year}-${month}-${day}`
        calendar.max = todayFormattedDate;

        // Set important dates
        // ASYNC DATES HERE
        const importantDates = ["2023-08-01", "2023-08-03", "2023-08-04", "2023-08-05", "2023-08-06", "2023-08-07", "2023-08-08","2023-08-09"];
        calendar.importantDates = importantDates;

        // Set importantDatesTemplate
        calendar.whenRendered(() => {
					const template = document.createElement('template');

					template.id = "importantDatesTemplate";
					template.innerHTML = `<span>{{day}}</span><span>📒</span>`;

					document.body.appendChild(template);
					calendar.importantDatesTemplate = "importantDatesTemplate";


                });        
    });
},
    computed: {

    },
    created() {

    },

    data() {
            return {

            };
        },
    methods(){
    },
    mounted(){

    }
};


</script>

