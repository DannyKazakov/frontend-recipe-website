<template>
  <div class="recipe-preview">
    <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
         <img v-if="image_load" :src="recipe.image" class="recipe-image" />
         {{ recipe.title }}
        </router-link>
         <div class = "recipe-body">
          <div class="text">
      <b-row>
      <b-col>
            <img class="recipeWatch" v-if="recipe.wasWatched" src="../assets/images/eyeLogo.png"/>
            <img class="recipeWatch" v-else-if="!recipe.wasWatched" src="../assets/images/closedEyeLogo.png"/>
      </b-col>
      <b-col>
          <img class="recipeWatch" v-if="!recipe.savedToFavourites" @click="busa(recipe.id)" :src="currentHeart"/>
          <img class="recipeWatch" v-else-if="recipe.savedToFavourites" src="../assets/images/fullHeart.png"/>
      </b-col>
            
    </b-row>

    <b-row>
        <b-col>{{ recipe.readyInMinutes }} minutes</b-col>
        <b-col>{{ recipe.popularity }} likes</b-col>
    </b-row>
    <b-row>
        <b-col v-if="recipe.vegan">vegan</b-col>
        <b-col v-else >not vegan</b-col>
        <b-col v-if="recipe.vegetarian">vegetarian</b-col>
        <b-col v-else >not vegetarian</b-col>
    </b-row>
    <b-row v-if="recipe.glutenFree">
        <b-col >gluten free</b-col>
    </b-row>
    <b-row v-else-if="!recipe.glutenFree">
        <b-col >contains gluten</b-col>
    </b-row>
          </div>
         </div>
  </div>
 
</template>

<script>
export default {
  name:"RecipePreview",
  created(){
    this.currentHeart = require("../assets/images/emptyHeart.png")
    if(this.recipe.image ==="" || this.recipe.image == null){
      this.recipe.image = require("../assets/images/image_not_available.png")
    }
  },
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
      currentHeart:""
    };
  },
  methods:{
    busa(id){
      if(!this.recipe.savedToFavourites && this.$root.store.username)
      {
        this.$emit('addFave', id)
        this.currentHeart = require("../assets/images/fullHeart.png")
      }
      
    }
  },

  props: {
    recipe: {
      type: Object,
      required: true
    }

  }
};
</script>

<style scoped>
.recipe-preview {
  position: relative;
  width: 50%;
}

.recipe-image {
  opacity: 1;
  display: block;
  width: 200%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.recipe-body {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 39%;
  left: 100%;
  width: 300px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.recipe-preview:hover .recipe-image {
  opacity: 0.3;
}

.recipe-preview:hover .recipe-body {
  opacity: 1;
}

.text {
  background-color: aliceblue;
  color: black;
  font-size: 15px;
  font:bold ;

  
}
.recipeWatch{
  opacity: 1;
  width: 50%;
  transition: .5s ease;
}

.recipe-overview{
  display: inline-block;
  list-style-type: none
}
/* .recipe-preview {
  display: inline-block;
  width: 95%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
} */
/* .recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 15%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 50px;
  display: table-cell;
  text-align: left;
}
.recipe-overview{
  display: inline-block;
  list-style-type: none
}
.recipeWatch{
  padding-right:3px;
  padding-top: 3px;

} */

</style>
