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
    }
  },
  data() {
    return {
      randomRecipes: [],
      lastRecipes:[]
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
}
  },
  
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
