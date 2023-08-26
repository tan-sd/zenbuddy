<template>
    <div class="container-fluid d-flex">
        <div class="about-content">
            <div class="about-title mb-3">
                YOUR PERSONALISED JOURNAL COMPANION
            </div>
            <div>{{ aiPrompt }}</div>
            <textarea
                v-model="journalEntry"
                rows="10"
                cols="50"
                placeholder="Write your journal entry here..."
            ></textarea>
            <button @click="generatePrompt">Need help? Generate Prompt!</button>
            
            <!-- <div class="about-text mb-3">
                Immerse yourself in ZenBuddy, where artistry meets purpose, and
                individuality finds its sanctuary. Our meticulously crafted
                journaling app unites a diverse community with a common goal:
                nurturing mental well-being and fostering personal growth.
            </div>
            <button class="about-button">
                <router-link to="/login"> Begin your journey </router-link>
            </button>-->
        </div>
        <!-- <div class="canvas">
            Hello World
        </div>  -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      apiKey: process.env.VUE_APP_OPENAI_KEY, // my api key
      journalEntry: "",
      aiPrompt: "",
      emotionSelected: "happy",
      conversation: [
        { role: "system", content: "You are an ai assistant for a journalling app. Your job is to give prompts to the user to guide them with writing their daily journal entry. this journalling app aims to enhance mental well-being and to monitor personal development. You need to generate the first prompt based on the mood the user input: sad, angry, neutral, happy, euphoric. Then you would need to generate follow up prompts based on what the user inputs. The prompts should strictly be one question (no more than 30 words) and should help guide the user on writing their journal. Lets give this a try. I will give you one of those emotions and you will give me a prompt to start my journal entry. Only return the prompts in a question format."}
    ]
    };
  },
  methods: {
    async generatePrompt() {
        var journalEntryTemp

        if (this.journalEntry == "") {
            journalEntryTemp = this.emotionSelected;
        } else {
            journalEntryTemp = this.journalEntry
        }

        this.conversation.push({ role: "user", content: journalEntryTemp})

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
                model: "gpt-3.5-turbo",
                }),
            }
            );

        const data = await response.json();
        console.log(data);

        // Access the generated text from the API response
        const prompt = data.choices[0].message.content;
        this.conversation.push({ role: "assistant", content: prompt})

        this.aiPrompt = `AI Prompt: ${prompt}`;
      } catch (error) {
        console.error("Error generating prompt:", error);
      }
    },
  }
};
</script>

<style>
.about-title {
    letter-spacing: 1.5px;
}

.about-button {
    background: none;
    padding: 10px;
    border-radius: 3.5rem;
}
</style>
