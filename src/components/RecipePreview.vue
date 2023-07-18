<template>
  <div class="recipe-preview">
    <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
       <div class="recipe-body">
         <img v-if="image_load" :src="recipe.image" class="recipe-image" />
        </div>
    

      <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title">
         {{ recipe.title }}
        
        </div>
      </div>
    </router-link>
    <b-row class="recipeWatch">
      <b-col>
            <img v-if="recipe.wasWatched" src="../assets/images/eyeLogo.png"/>
            <img v-else-if="!recipe.wasWatched" src="../assets/images/closedEyeLogo.png"/>
      </b-col>
      <b-col>
          <img v-if="!recipe.savedToFavourites" @click="busa(recipe.id)" :src="currentHeart"/>
          <img v-else-if="recipe.savedToFavourites" src="../assets/images/fullHeart.png"/>
      </b-col>
            
    </b-row>

    <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.popularity }} likes</li>
    </ul>
    <ul class="recipe-overview">
        <li v-if="recipe.vegan">vegan</li>
        <li v-else >not vegan</li>
        <li v-if="recipe.vegetarian">vegetarian</li>
        <li v-else >not vegetarian</li>
    </ul>
    <ul v-if="recipe.glutenFree" class="recipe-overview">
        <li >gluten free</li>
    </ul>
    <ul v-else-if="!recipe.glutenFree" class="recipe-overview">
        <li >contains gluten</li>
    </ul> 
  </div>
 
</template>

<script>
export default {
  name:"RecipePreview",
  created(){
    this.currentHeart = require("../assets/images/emptyHeart.png")
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
  display: inline-block;
  width: 95%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
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

.recipe-preview .recipe-footer ul.recipe-overview {
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

.recipe-preview .recipe-footer ul.recipe-overview li {
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

}

</style>
