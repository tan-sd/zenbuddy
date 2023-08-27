<template>
    <div class="container-fluid mt-1">
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
                <!-- Journal Entry Page -->
                <!-- Prompt Message -->
                <img
                    class="journal-overlay"
                    src="../assets/images/overlays/bookRedOverlay.png"
                />

                <div class="" v-if="confirmedMood">
                    <div class="">
                        <h3>Prompt for the day</h3>
                        <p>
                            Describe a moment from today that brought a smile to
                            your face. Dive into the details of what made this
                            moment so joyful, and explore the positive emotions
                            it stirred within you.
                        </p>
                        <button class="btn btn-primary" @click="generatePrompt">
                            Regenerate a prompt
                        </button>
                    </div>
                    <div class="text-container mt-3">
                        <label class="label" for="journalEntry"
                            >Start your journal entry for the day!</label
                        >
                        <p>{{ aiPrompt }}</p>
                        <textarea id="journalEntry" v-model="journalEntry">
ABC</textarea
                        >
                        <div class="d-flex justify-content-center mt-2">
                            <button
                                type="button"
                                class="btn btn-secondary mt-2"
                            >
                                Save Entry
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Mood Selection Page -->
                <div class="moods-container" v-else>
                    <h2 class="moods-title mt-3 text-center">
                        How are you feeling today?
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
                            @click="confirmMood()"
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
import { onMounted } from "vue";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.calendar.js";
import { fetchUserName } from "../firebase/index";

export default {
    name: "JournalPage",
    data() {
        return {
            importantDates: [
                "2023-08-01",
                "2023-08-03",
                "2023-08-04",
                "2023-08-05",
                "2023-08-06",
                "2023-08-07",
                "2023-08-08",
                "2023-08-09",
            ],
            selectedMood: "neutral",
            confirmedMood: false,
            username: "",
            apiKey: process.env.VUE_APP_OPENAI_KEY, // my api key
            journalEntry: "",
            aiPrompt: "",
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

                this.aiPrompt = `ZenBuddy: ${prompt}`;
            } catch (error) {
                console.error("Error generating prompt:", error);
            }
        },
    },
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
    },
    async mounted() {
        this.username = await fetchUserName();
    },
};
</script>

<style scoped>
.journal-overlay {
    position: absolute;
    width: 65%;
    height: 89%;
    margin: 0;
    right: 0;
    z-index: -1;
}

.button {
    background-color: transparent;
}

#moods {
    width: 60%;
    margin-left: 15%;
}

.moods-container {
    top: 40%;
    position: relative;
}

.moods-title {
    width: 60%;
    margin-left: 15%;
}

.moods-confirm {
    width: 60%;
    margin-left: 39%;
}
.faces {
    height: 60px;
    width: auto;
}
</style>
