<template>
  <div class="full-recipe-container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div>
        <!-- <div class="wrapper"> -->
          <!-- <div class="wrapped"> -->
            <div class = "preview-recipe-details">
              <b-row>
              <b-col>
                <img class="fullrecipeWatch" v-if="recipe.wasWatched" src="../assets/images/eyeLogo.png"/>
                <img class="fullrecipeWatch" v-else-if="!recipe.wasWatched" src="../assets/images/closedEyeLogo.png"/>
              </b-col>
              <b-col>
                <img class="fullrecipeWatch" v-if="!recipe.savedToFavourites" @click="addFavourites(recipe.id)" :src="currentHeart"/>
                <img class="fullrecipeWatch" v-else-if="recipe.savedToFavourites" src="../assets/images/fullHeart.png"/>
              </b-col>
              <b-col>
                <img class="fullrecipeWatch" v-if="!recipe.glutenFree" src="../assets/images/gluten_free.png"/>
              </b-col>
            </b-row>
          </div>
          <div class="center">
            <h3>Meal Preperation</h3>
            <p>Ready in {{ recipe.readyInMinutes }} minutes</p>
            <p>Total number of servings: {{ recipe.servings }}</p>
          </div>
          <div class="center">
            <h3>Diet</h3>
            <p v-if="recipe.vegetarian">
              <img src="../assets/images/vegetarian_friendly.png" 
              style="margin-left:20px;height:90px;vertical-align: middle;">
              </p>
            <p v-else>Not vegetarian friendly
            </p>
            <p v-if="recipe.vegan">
              <img src="../assets/images/vegan_friendly.png" 
              style="margin-left:10px;height:125px;vertical-align: middle;"></p>
            <p v-else>Not vegan friendly
            </p>
          </div>
          <br>
          <div class="center">
            <h3>Popularity</h3>
            {{recipe.popularity}} people like this recipe!
          </div>
          <br>
          <div class="center">
            <h3>Ingredients</h3>
            <ul>
              <li
                v-for="ingredient in recipe.ingredients"
                :key="ingredient.ingredientName"
              >
                {{ ingredient.ingredientName }} - {{ ingredient.quantity }}
              </li>
            </ul>
          </div>
          <br>

          <!-- </div> -->
          <div class="center">
            <h3>Instructions</h3>
              <span v-for="s in instructionLength" :key="s">
                {{ recipe.instructions[s-1] }}.
              </span>
          </div>
        <!-- </div> -->
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      currentHeart:""
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        if(this.$root.store.username){
          this.axios.defaults.withCredentials = true
        }
        else{
          this.axios.defaults.withCredentials = false

        }
        this.currentHeart = require("../assets/images/emptyHeart.png")
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.server_domain + "/recipes/show_details/" + this.$route.params.recipeId
        );
        this.axios.defaults.withCredentials = false
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }


      let {
        id,
        title,
        readyInMinutes,
        image,
        popularity,
        vegan,
        vegetarian,
        glutenFree,
        wasWatched,
        savedToFavourites,
      } = response.data.recipePreview;
      if(image == null || image ===""){
        image = require("../assets/images/image_not_available.png")
      }
      let instructions = response.data.instructions.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '')
        .split('.').filter(s=>s !=="").filter(s=>s !==" ")
      let servings = response.data.servings
      let ingredients = response.data.ingredients
      // ingredient : {ingredientName : value, quantity:value}
      let _recipe = {
        id,
        instructions,
        servings,
        ingredients,
        popularity,
        vegan,
        vegetarian,
        glutenFree,
        wasWatched,
        savedToFavourites,  
        readyInMinutes,
        image,
        title
      };
      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },methods:
  {
    async addFavourites(id){
  try{
    if(this.$root.store.username)
    {
          this.axios.defaults.withCredentials = true
          const response = await this.axios.post(
          this.$root.store.server_domain + "/users/favorites", {recipeId:id})
          this.axios.defaults.withCredentials = false;
          this.currentHeart = require("../assets/images/fullHeart.png")
    }


  }catch(error){
    console.log(error.data)
  }
}
  },
  computed:{
    instructionLength(){
      return this.recipe.instructions.length
    }
  }
};
</script>

<style scoped>
    .full-recipe-container {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    }
    .full-recipe-container h1 {
    color: #4CAF50;
    text-align: center;
    margin-bottom: 10px;
    }
    .full-recipe-container h3 {
    font-size: 25px;
    color: #4CAF50;
    margin-bottom: 5px;
    }
    .full-recipe-container ul {
    list-style-type: disc;
    /* margin-left: 30px; */
    }
.fullrecipeWatch{
  opacity: 1;
  width: 50%;
  transition: .5s ease;
  margin-left: auto;
  
  display: block;

}
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  
}
.preview-recipe-details{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;

  font-size: 20px;
  font-weight: bold;
}
</style>
