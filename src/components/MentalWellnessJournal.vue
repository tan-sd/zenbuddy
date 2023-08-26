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
              messages: [{ role: "user", content: this.journalEntry }],
              max_tokens: 10,
              model: "gpt-3.5-turbo",
            }),
          }
        );

        const data = await response.json();
        console.log(data);

        // Access the generated text from the API response
        const prompt = data.choices[0].text;

        this.aiPrompt = `AI Prompt: ${prompt}`;
      } catch (error) {
        console.error("Error generating prompt:", error);
      }
    },
  },
};
</script>
