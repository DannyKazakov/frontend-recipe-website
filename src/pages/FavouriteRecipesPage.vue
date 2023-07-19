<template>
    <div class="container">
        <h1><b>Favourite Recipes</b></h1>
        <RecipePreviewList title="Favourite Recipes" source="/Users/favoriterecipes" class="RandomRecipes"/>
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
  }
  
  }
  </script>
  
  <style>
  
  </style>