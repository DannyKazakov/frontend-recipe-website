<template>
    <div class="container">
        <h1><b>Favourite Recipes</b></h1>
        <RecipePreviewList title="Favourite Recipes" source="/users/favorites" class="RandomRecipes" :favorites="favouriteRecipes"/>
        <br>
        <br>
        <br>
        <br>
        <router-link to="/" exact>ET Go Home</router-link>
      </div>
  </template>
  
  <script>
  import RecipePreviewList from "../components/RecipePreviewList";
  export default {
    components: {
        RecipePreviewList
  },
  data(){
    return{
      favouriteRecipes:[]
    }
  },async mounted(){
    this.axios.defaults.withCredentials = true
    const response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        this.axios.defaults.withCredentials = false

        this.favouriteRecipes = response.data
  }
  
  }
  </script>
  
  <style>
  
  </style>