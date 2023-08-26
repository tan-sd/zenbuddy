<template>
    <div class="container mt-1">
        <div class="row">
            <!-- Quote & Calendar Column -->
            <div class="col-4">
                <div class="row">
                    <h2 class="text-center">Welcome {{ username }}</h2>
                </div>
                <!-- Quote -->
                <div class="row fw-light fst-italic my-3 fs-5">
                    <p class="text-center">
                        “ The bad thing is that the time is short… and the good
                        thing is that there is still some time..”
                    </p>
                </div>

                <!-- Calendar -->
                <div class="row mx-auto mt-1">
                    <div class="vue-root">
                        <smart-calendar id="calendar"></smart-calendar>
                    </div>
                </div>
            </div>

            <!-- Journal Column -->
            <div class="col-8">
                <!-- Mood Selection Page -->
                <!-- <div class="">
                    <h2 class="mt-3 text-center">How are you feeling today?</h2>
                    <div id="moods" class="">
                        <button
                            class="button"
                            id="angry"
                            :class="{ selected: selectedMood === 'angry' }"
                            @click="selectMood('angry')"
                        >
                            <img
                                class="faces"
                                :style="{
                                    border:
                                        selectedMood === 'angry'
                                            ? '4px solid #AED0FF'
                                            : 'none',
                                    borderRadius:
                                        selectedMood === 'angry' ? '10%' : '0',
                                }"
                                src="../assets/images/moods/angry.png"
                            />
                            <h5>Angry</h5>
                        </button>
                        <button
                            class="button"
                            id="sad"
                            :class="{ selected: selectedMood === 'sad' }"
                            @click="selectMood('sad')"
                        >
                            <img
                                class="faces"
                                :style="{
                                    border:
                                        selectedMood === 'sad'
                                            ? '4px solid #AED0FF'
                                            : 'none',
                                    borderRadius:
                                        selectedMood === 'sad' ? '10%' : '0',
                                }"
                                src="../assets/images/moods/sad.png"
                            />
                            <h5>Sad</h5>
                        </button>
                        <button
                            class="button"
                            id="neutral"
                            :class="{ selected: selectedMood === 'neutral' }"
                            @click="selectMood('neutral')"
                        >
                            <img
                                class="faces"
                                :style="{
                                    border:
                                        selectedMood === 'neutral'
                                            ? '4px solid #AED0FF'
                                            : 'none',
                                    borderRadius:
                                        selectedMood === 'neutral'
                                            ? '10%'
                                            : '0',
                                }"
                                src="../assets/images/moods/neutral.png"
                            />
                            <h5>Neutral</h5>
                        </button>
                        <button
                            class="button"
                            id="happy"
                            :class="{ selected: selectedMood === 'happy' }"
                            @click="selectMood('happy')"
                        >
                            <img
                                class="faces"
                                :style="{
                                    border:
                                        selectedMood === 'happy'
                                            ? '4px solid #AED0FF'
                                            : 'none',
                                    borderRadius:
                                        selectedMood === 'happy' ? '10%' : '0',
                                }"
                                src="../assets/images/moods/happy.png"
                            />
                            <h5>Happy</h5>
                        </button>
                        <button
                            class="button"
                            id="euphoric"
                            :class="{ selected: selectedMood === 'euphoric' }"
                            @click="selectMood('euphoric')"
                        >
                            <img
                                class="faces"
                                :style="{
                                    border:
                                        selectedMood === 'euphoric'
                                            ? '4px solid #AED0FF'
                                            : 'none',
                                    borderRadius:
                                        selectedMood === 'euphoric'
                                            ? '10%'
                                            : '0',
                                }"
                                src="../assets/images/moods/euphoric.png"
                            />
                            <h5>Euphoric</h5>
                        </button>
                    </div>
                    <div class="d-flex justify-content-center mt-2">
                        <button type="button" class="btn btn-primary mt-2">
                            Select Mood
                        </button>
                    </div>
                </div> -->


                <!-- Journal Entry Page -->
                <div class="">
                    <!-- Prompt Message -->
                    <div class="">
                        <h3>Prompt for the day</h3>
                        <p>Describe a moment from today that brought a smile to your face. Dive into the details of what made this moment so joyful, and explore the positive emotions it stirred within you.</p>
                        <button>Regenerate a prompt</button>
                    </div>
                    <div class = "text-container mt-3" >
                        <label class="label" for="journalEntry">Start your journal entry for the day!</label>
                        <textarea id="journalEntry">ABC</textarea>
                        <div class="d-flex justify-content-center mt-2">
                            <button type="button" class="btn btn-primary mt-2">Save Entry</button>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.calendar.js";
import { fetchUserName } from "../firebase/index";

export default {
    name: "JournalPage",
    setup() {
        onMounted(() => {
            const calendar = document.querySelector("smart-calendar");

            // Get today's date to set maximum date
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const todayFormattedDate = `${year}-${month}-${day}`;
            calendar.max = todayFormattedDate;

            // Set important dates
            // ASYNC DATES HERE
            const importantDates = [
                "2023-08-01",
                "2023-08-03",
                "2023-08-04",
                "2023-08-05",
                "2023-08-06",
                "2023-08-07",
                "2023-08-08",
                "2023-08-09",
            ];
            calendar.importantDates = importantDates;

            // Set importantDatesTemplate
            calendar.whenRendered(() => {
                const template = document.createElement("template");

                template.id = "importantDatesTemplate";
                template.innerHTML = `<span>{{day}}</span><span>📒</span>`;

                document.body.appendChild(template);
                calendar.importantDatesTemplate = "importantDatesTemplate";
            });
        });

        const selectedMood = ref(null);

        const selectMood = (id) => {
            selectedMood.value = id;
        };
        return {
            selectedMood,
            selectMood,
        };
    },
    created() {},

    data() {
        return {
            username: "",
        };
    },
    methods() {
        // function selectMood(id){
        //     this.selectedMood = id;
        // }
    },
    async mounted() {
        this.username = await fetchUserName();
    },
};
</script>

<style></style>
