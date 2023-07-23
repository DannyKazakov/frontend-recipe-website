<template>
  <div id="app">
    <b-navbar type="dark" id="nav" class="navbar navbar-dark bg-dark">
      <div id="navStyle">
      <router-link :to="{ name: 'main' }">Home</router-link>
      <router-link :to="{ name: 'search' }">Search</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
      </div>
      
      <!-- <router-link :to="{ name: 'main' }">Home</router-link> -->
      <!-- <router-link :to="{ name: 'search' }">Search</router-link>
      <router-link :to="{ name: 'about' }">About</router-link> -->
      {{ !$root.store.username }}
      <span class="guestSpan" v-if="!$root.store.username">
        Hello Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>
        |
        <router-link :to="{ name: 'login' }">Login</router-link>
      </span>
      <span class="userSpan" v-else-if="$root.store.username">
        Welcome "{{ $root.store.username }}"!
      </span>
        <span class="userNavItems" v-if="$root.store.username">
          <b-dropdown text="Personal">
            <b-dropdown-item>
              <router-link :to="{ name: 'FavouriteRecipes' }">Favourite Recipes</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'MyRecipes' }">My Recipes</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'FamilyRecipes' }">Family Recipes</router-link>
            </b-dropdown-item>
          </b-dropdown>
          <b-button v-if="$root.store.username" id="createRecipesPage" @click="showCreateRecipeModal">create new recipe</b-button>
          <b-button id="logoutButton" variant="outline-danger" @click="Logout">Logout</b-button>
        </span>       
    </b-navbar>
    
    <router-view />
    

    <!-- <b-modal ref="newRecipe-modal" hide-footer title="Create a recipe">
      <div class="d-block text-center">
        <createRecipesPage v-on:close="hideCreateRecipeModal">
        </createRecipesPage>
      </div>
      <b-button class="mt-3" variant="outline-primary" block @click="hideCreateRecipeModal">Close</b-button>
    </b-modal> -->
  

    <b-modal ref="newRecipe-modal" hide-footer title="Create a Recipe" id="newRecipe-modal">
      <div class="modal-body">
        <createRecipesPage v-on:close="hideCreateRecipeModal">
        </createRecipesPage>
      <!-- Your existing form elements -->
      </div>
      <div class="modal-footer">
        <b-button class="mt-3" variant="outline-primary" block @click="hideCreateRecipeModal">Close</b-button>
      </div>
   </b-modal>



  </div>
</template>

<script>
import CreateRecipesPage from './pages/CreateRecipesPage.vue';
export default {
  components: { CreateRecipesPage },
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    
    showCreateRecipeModal(){
      this.$refs["newRecipe-modal"].show();
    },
        
    hideCreateRecipeModal(){
      this.$refs["newRecipe-modal"].hide();
    },
    
  
  }
};

</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  // background-image:url("assets/images/recipe_background3.jpg");
  // background-size: cover;

}

#nav {
  padding: 15px;
}

#navStyle a {
  font-weight: bold;
  color: whitesmoke;
  margin-right:75px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.guestSpan{
  color: whitesmoke;
  float:left;
  font-weight: bold;
  margin-left:750px;
}
.guestSpan a:hover{
  color: limegreen;
}
.userSpan{
  color: whitesmoke;
  margin-left:200px;
  font-weight: bold;
  
}
.userNavItems{
  color: whitesmoke;
  float:left;
  font-weight: bold;
  margin-left:400px;
}

#busa{
  color: whitesmoke;  
}


/* Custom styles for the modal */
#newRecipe-modal .modal-dialog {
    max-width: 800px; /* Adjust the width of the modal */
  }

#newRecipe-modal .modal-content {
  background-color: #f1f1f1; /* Light gray background for the modal content */
  border-radius: 10px; /* Rounded corners for the modal */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3); /* Add a subtle shadow to the modal */
}

#newRecipe-modal .modal-header {
  background-color: #5CDB95; /* A nice green color for the modal header */
  color: #FFF; /* White text color for the modal header */
  border-top-left-radius: 10px; /* Adjust the border radius for the top-left corner */
  border-top-right-radius: 10px; /* Adjust the border radius for the top-right corner */
}

#newRecipe-modal .modal-title {
  font-size: 1.5rem;
}

#newRecipe-modal .modal-body {
  padding: 20px; /* Add some padding to the modal body */
}

#newRecipe-modal .modal-footer {
  background-color: #f1f1f1; /* Light gray background for the modal footer */
  border-bottom-left-radius: 10px; /* Adjust the border radius for the bottom-left corner */
  border-bottom-right-radius: 10px; /* Adjust the border radius for the bottom-right corner */
}

</style>