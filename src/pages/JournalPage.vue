<template>
    <div class="container-fluid mt-1">
        <div class="row">
            <!-- Quote & Calendar Column -->
            <div class="col-4">
                <div class="row mt-3 mx-3">
                    <h2 class="text-center text-truncate">
                        Welcome {{ username }}!
                    </h2>
                </div>
                <!-- Quote -->
                <div class="row fw-light fst-italic m-3 fs-5">
                    <p id="dailyQuoteText" class="text-center text-primary">
                        {{ quote }}
                    </p>
                </div>

                <!-- Calendar -->
                <div id="calendarContainer" class="row mx-auto mb-3">
                    <div class="vue-root">
                        <smart-calendar
                            id="calendar"
                            class="mx-auto width-100"
                        ></smart-calendar>
                    </div>
                </div>
            </div>

            <!-- Journal Column -->
            <div class="col-8 position-relative">
                <!-- Journal Entry Page -->
                <!-- Prompt Message -->
                <img class="journal-overlay" :src="selectedColor" />

                <div class="m-5" v-if="confirmedMood">
                    <div>
                        <div class="p-2 mb-3">
                            <h5 class="text-primary">
                                <span class="fw-bold text-dark">ZenBuddy:</span>
                                {{ aiPrompt }}
                            </h5>
                        </div>
                    </div>
                    <div class="text-container mt-3">
                        <textarea
                            placeholder="Start your journal entry for the day!..."
                            id="journalEntry"
                            class="rounded"
                            v-model="journalEntry"
                        >
ABC</textarea
                        >
                        <div class="d-flex justify-content-between mt-2">
                            <button
                                class="btn btn-primary"
                                @click="generatePrompt"
                            >
                                Help me ZenBuddy!
                            </button>

                            <button
                                type="button"
                                class="btn btn-warning"
                                @click="sendJournalEntry"
                            >
                                Save Entry
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Mood Selection Page -->
                <div
                    class="d-flex h-100 flex-column align-items-center justify-content-center"
                    v-else
                >
                    <h2 class="mt-3 text-center text-dark fw-bold">
                        Hey! How are you feeling today?
                    </h2>
                    <div id="moods" class="">
                        <button
                            class="button"
                            id="angry"
                            :class="{ selected: selectedMood === 'angry' }"
                            @click="chooseMood('angry')"
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
                            @click="chooseMood('sad')"
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
                            @click="chooseMood('neutral')"
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
                            @click="chooseMood('happy')"
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
                            @click="chooseMood('euphoric')"
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
                    <div class="moods-confirm mt-5">
                        <button
                            type="button"
                            class="btn btn-primary mt-2"
                            @click="
                                confirmMood();
                                generateQuote();
                                generatePrompt();
                            "
                        >
                            Select Mood
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// DATABASE STUFF
import { onMounted } from "vue";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.calendar.js";
import { fetchUserName, readJournalData, fetchUserID } from "../firebase/index";
import { auth, storeJournalData } from "../firebase/index";
import { getDatabase, ref, get, child } from "firebase/database";

export default {
    name: "JournalPage",
    data() {
        return {
            // importantDates : ["2023-08-01", "2023-08-03", "2023-08-04", "2023-08-05", "2023-08-06", "2023-08-07", "2023-08-08","2023-08-09"],
            selectedColor: require("../assets/images/overlays/bookRedOverlay.png"),
            selectedMood: "neutral",
            confirmedMood: false,
            username: "",
            userID: "",
            apiKey: process.env.VUE_APP_OPENAI_KEY, // my api key
            journalEntry: "",
            aiPrompt: "",
            quote: "",
            conversation: [
                {
                    role: "system",
                    content:
                        "You are an ai assistant for a journalling app. Your job is to give prompts to the user to guide them with writing their daily journal entry. this journalling app aims to enhance mental well-being and to monitor personal development. You need to generate the first prompt based on the mood the user input: sad, angry, neutral, happy, euphoric. Then you would need to generate follow up prompts based on what the user inputs. The prompts should strictly be one question (no more than 30 words) and should help guide the user on writing their journal. Lets give this a try. I will give you one of those emotions and you will give me a prompt to start my journal entry. Only return the prompts in a question format.",
                },
            ],
        };
    },
    methods: {
        chooseMood(id) {
            this.selectedMood = id;
        },
        confirmMood() {
            this.confirmedMood = true;
        },
        async generatePrompt() {
            var journalEntryTemp;

            if (this.journalEntry == "") {
                journalEntryTemp = this.selectedMood;
            } else {
                journalEntryTemp = this.journalEntry;
            }

            this.conversation.push({ role: "user", content: journalEntryTemp });

            console.log(this.conversation);

            try {
                const response = await fetch(
                    "https://api.openai.com/v1/chat/completions",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.apiKey}`,
                        },

                        body: JSON.stringify({
                            messages: this.conversation,
                            max_tokens: 40,
                            temperature: 1,
                            model: "gpt-3.5-turbo",
                        }),
                    }
                );

                const data = await response.json();

                // Access the generated text from the API response
                const prompt = data.choices[0].message.content;
                this.conversation.push({ role: "assistant", content: prompt });

                this.aiPrompt = `${prompt}`;
            } catch (error) {
                console.error("Error generating prompt:", error);
            }
        },
        async generateQuote() {
            try {
                const response = await fetch(
                    "https://api.openai.com/v1/chat/completions",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.apiKey}`,
                        },

                        body: JSON.stringify({
                            messages: [
                                {
                                    role: "system",
                                    content:
                                        "You are an ai assistant for a journalling app. Your job is to give a random quote for the day that relates to the user's current mood. I will give you an emotion and you will generate a random quote of the day in relation to that emotion.",
                                },
                                { role: "user", content: this.selectedMood },
                            ],
                            max_tokens: 60,
                            temperature: 1,
                            model: "gpt-3.5-turbo",
                        }),
                    }
                );

                const data = await response.json();

                // Access the generated text from the API response
                const quote = data.choices[0].message.content;

                this.quote = `${quote}`;
            } catch (error) {
                console.error("Error generating quote:", error);
            }
        },
        async sendJournalEntry() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const todayFormattedDate = `${year}-${month}-${day}`;

            const userId = auth.currentUser.uid;
            const journalData = {
                journalEntry: this.journalEntry,
                message: this.conversation,
                mood: this.selectedMood,
            };
            storeJournalData(userId, todayFormattedDate, journalData);

            alert("Entry Saved!")
        },
    },
    setup() {
        onMounted(async () => {
            const calendar = document.querySelector("smart-calendar");

            // Get today's date to set maximum date
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const todayFormattedDate = `${year}-${month}-${day}`;
            calendar.max = todayFormattedDate;

            try {
                const uid1 = await fetchUserID();
                // console.log("userid", uid1);
                const journalData = await readJournalData(uid1);
                // console.log("JournalData", journalData);
                const journalDates = Object.keys(journalData);
                console.log("JournalDates", journalDates);
                calendar.importantDates = journalDates;

                calendar.whenRendered(() => {
                    const template = document.createElement("template");
                    template.id = "importantDatesTemplate";
                    template.innerHTML = `<span>{{day}}</span><span>📒</span>`;
                    document.body.appendChild(template);
                    calendar.importantDatesTemplate = "importantDatesTemplate";
                });
            } catch (error) {
                console.error("Error:", error);
            }
        });
    },
    async mounted() {
        console.log("mounted functions");
        this.username = await fetchUserName();
        this.userID = await fetchUserID();

        // // read journal data
        // const journalData = await readJournalData(this.userID);
        // console.log("JournalData",journalData);
        // const journalDates = Object.keys(journalData);

        // // change date format
        // const journalDatesFormatted = journalDates.map((date) => {
        //     const year = date.slice(0,4);
        //     const month = date.slice(4,6);
        //     const day = date.slice(6,8);
        //     return `${year}-${month}-${day}`;
        // });
        // console.log("JournalDatesFormatted",journalDatesFormatted);

        const user = auth.currentUser;
        const db = getDatabase();
        const dbRef = ref(db);

        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.child("selectedColor").val() === "#8e111d") {
                this.selectedColor = require("../assets/images/overlays/bookRedOverlay.png");
            } else if (snapshot.child("selectedColor").val() === "#32390f") {
                this.selectedColor = require("../assets/images/overlays/bookGreenOverlay.png");
            } else if (snapshot.child("selectedColor").val() === "#5f89cc") {
                this.selectedColor = require("../assets/images/overlays/bookBlueOverlay.png");
            } else {
                this.selectedColor = require("../assets/images/overlays/bookPurpleOverlay.png");
            }
        });

        get(child(dbRef, `users/${user.uid}` + "/journal")).then((snapshot) => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const todayFormattedDate = `${year}-${month}-${day}`;

            if (snapshot.child(todayFormattedDate).exists() == true) {
                this.confirmedMood = true;
                this.conversation = snapshot
                    .child(todayFormattedDate)
                    .val().message;
                this.journalEntry = snapshot
                    .child(todayFormattedDate)
                    .val().journalEntry;
                this.mood = snapshot.child(todayFormattedDate).val().mood;
                this.generatePrompt();
                this.generateQuote();
            }
        });
    },
};
</script>

<style scoped>
.journal-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    right: 0;
    z-index: -1;
}

.button {
    background-color: transparent;
}

#moods > button > h5 {
    color: #d8a824;
}

#dailyQuoteText {
    font-size: 0.8rem;
    font-weight: 500;
}

#calendarContainer {
    overflow: auto;
}

.moods-confirm {
    width: 60%;
    margin-left: 39%;
}
.faces {
    height: 6vw;
    width: auto;
}
.btn-primary,
.btn-warning {
    color: white;
}
.btn-primary:hover {
    background-color: #124030;
    color: white;
}
.btn-warning:hover {
    background-color: #bb8e14;
    color: white;
}
.btn {
    transition: all 200ms ease-in-out;
    font-weight: bold;
}
#journalEntry {
    background-color: white;
}
</style>
