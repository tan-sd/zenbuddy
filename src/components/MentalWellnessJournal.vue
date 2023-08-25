import openai

<template>
  <div>
    <h1>Mental Wellness Journal</h1>

    <div>{{ aiPrompt }}</div>

    <textarea
      v-model="journalEntry"
      rows="10"
      cols="50"
      placeholder="Write your journal entry here..."
    ></textarea>

    <button @click="generatePrompt">Generate Prompt</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiKey: "API KEY HERE", // my api key
      journalEntry: "",
      aiPrompt: "",
    };
  },
  methods: {
    async generatePrompt() {
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
              prompt: this.journalEntry,
              max_tokens: 10,
              model: "text-davinci-003",
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        const prompt = data.choices[0].text.trim();

        this.aiPrompt = `AI Prompt: ${prompt}`;
      } catch (error) {
        console.error("Error generating prompt:", error);
      }
    },
  },
};
</script>
