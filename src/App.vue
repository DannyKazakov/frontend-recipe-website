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
        <b-button id="logoutButton"
        variant="outline-danger"
        @click="Logout">Logout</b-button>
        <!-- <router-link :to="{ name: 'main' }">later change</router-link> -->
      </span>
      
       
    </b-navbar>
    
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
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
  margin-left:500px;
}

</style>
