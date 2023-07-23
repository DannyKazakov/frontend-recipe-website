<template>
  <div class="container">
      <h1><b>My Recipes</b></h1>
      <RecipePreviewList title="My Recipes" source="/users/myRecipes" class="RandomRecipes" :my_recipes="myRecipes"/>
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
    myRecipes:[]
  }
},async mounted(){
  this.axios.defaults.withCredentials = true
  const response = await this.axios.get(
        this.$root.store.server_domain + "/users/myRecipes",
        // "https://test-for-3-2.herokuapp.com/recipes/random"
      );
      this.axios.defaults.withCredentials = false
      this.myRecipes = response.data
}

}
</script>

<style>

</style>










