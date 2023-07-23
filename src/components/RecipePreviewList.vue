<template>
  <b-container>
    <h3>
      {{ title }}:
         
        <slot></slot>
    </h3>
    <b-row v-if="title=='Explore this recipes'">
      <b-col v-for="r in randomRecipes" :key="r.id">
        <RecipePreview v-on:addFave="addToFavourites" class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
    <b-row v-if="title=='Last Viewed Recipes'">
      <b-col v-for="r in lastRecipes" :key="r.id">
        <RecipePreview v-on:addFave="addToFavourites" class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>

    <div v-if="title=='Favourite Recipes'">
      <b-row v-for="index in favoritesRange" :key="index">
        <b-col v-for="r in recipesForFavorites(index)" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
      </b-row> 
    </div>
    <div v-if="title=='Search Results'">
      <b-row v-for="index in searchResultsRange" :key="index">
        <b-col v-for="r in recipesForSearchResults(index)" :key="r.id">
        <RecipePreview v-on:addFave="addToFavourites" class="recipePreview" :recipe="r" />
      </b-col>
      </b-row> 
    </div>
    <div v-if="title=='My Recipes'">
      <b-row v-for="index in myRecipesRange" :key="index">
        <b-col v-for="r in recipesFormyRecipes(index)" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
      </b-row> 
    </div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    searchResults:{
      type:Array,
      required: false
    },
    favorites:{
      type:Array,
      required:false
    },
    my_recipes:{
      type:Array,
      required:false
    }
  },
  data() {
    return {
      randomRecipes: [],
      lastRecipes:[],
      rangeOfSearchResults:0,
      
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    
    async updateRecipes() {
      try {
        if(this.$root.store.username){
          this.axios.defaults.withCredentials = true
        }
        else{
          this.axios.defaults.withCredentials = false

        }
        const response = await this.axios.get(
          this.$root.store.server_domain + "/home",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        this.axios.defaults.withCredentials = false; 
        // alert(response.data)
        // console.log(response);
        const recipes = response.data;
        this.randomRecipes = [];
        this.lastRecipes = [];
        if(recipes.length <= 3){
          this.randomRecipes.push(...recipes);
        }
        else{
          this.randomRecipes = recipes.slice(0, 3)
          this.lastRecipes = recipes.slice(3, 6)
        }
        
        
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
async addToFavourites(id){
  try{
    if(this.$root.store.username){
          this.axios.defaults.withCredentials = true
        }
        else{
          this.axios.defaults.withCredentials = false

        }
    const response = await this.axios.post(
    this.$root.store.server_domain + "/users/favorites",
    {recipeId:id
    })
    this.axios.defaults.withCredentials = false; 

  }catch(error){
    console.log(error.data)
  }
},
    recipesForSearchResults(index){
      return this.searchResults.slice((index - 1)*3, index*3)
    },
    recipesForFavorites(index){
      return this.favorites.slice((index - 1)*3, index*3)
    },
    recipesFormyRecipes(index){
      return this.my_recipes.slice((index - 1)*3, index*3)
    }
  },
  computed:{
    searchResultsRange(){
      if(this.searchResults.length < 3){
        return this.searchResults.length
      }
      return Math.ceil(this.searchResults.length/3)
    },
    favoritesRange(){
      if(this.favorites.length < 3){
        return this.favorites.length
      }
      return Math.ceil(this.favorites.length/3)
    },
    myRecipesRange(){
      if(this.my_recipes.length < 3){
        return this.my_recipes.length
      }
      return Math.ceil(this.my_recipes.length/3)
    }
  }
  
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
