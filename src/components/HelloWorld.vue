<template>
  
</template>

<script>
export default {
  name: 'HelloWorld',

  props: {
    msg: String
  },

  data() {
    return {
      firebaseData: null // Initialize a data property to store the fetched data
    };
  },

  methods: {
    // Define your custom methods here
    async getFirebaseData() {
      try {
        const snapshot = await database().ref('yourDatabasePath').once('value');
        this.firebaseData = snapshot.val(); // Assign the fetched data to your data property
      } catch (error) {
        console.error("Error fetching Firebase data:", error);
      }
    }
  },

  created() {
    // Your code to run when the component is created
    this.getFirebaseData(); // Fetch the Firebase data when the component is created
  },

  mounted() {
    // Your code to run after the component is mounted in the DOM
  },

  // You can add more component lifecycle hooks and properties here
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
