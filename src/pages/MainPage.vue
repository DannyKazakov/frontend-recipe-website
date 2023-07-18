<template>
  <div class="container">
    <h1 class="title">Busa's Recipes</h1>
    <b-container>
      <b-row>
        <b-col>
          <RecipePreviewList title="Explore this recipes" class="RandomRecipes" />
        </b-col>
        <b-col class="lastViewedRecipes">
          <div v-if="!$root.store.username">
            <Login></Login>
          </div>
          <div v-else-if="$root.store.username">
            <RecipePreviewList
            title="Last Viewed Recipes"
            :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
             center: true
              }"
             disabled
             ></RecipePreviewList>
          </div>
          
        </b-col>
    
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </b-row>
  </b-container>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Login from "./LoginPage.vue"
export default {
  components: {
    RecipePreviewList,
    Login
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-right:150px
}
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
