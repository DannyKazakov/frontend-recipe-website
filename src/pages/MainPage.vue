<template>
  <div class="container">
    <h1 class="title">Busa's Recipes</h1>
          <RecipePreviewList title="Explore this recipes" class="RandomRecipes" ref="refresh"/>
          <b-button id="refreshButton"
        variant="info"
        @click="updateRecipes">Refresh recipes</b-button>  
          <div class="showLogin" v-if="!$root.store.username">
            <h2 class="loginOption"> Login for more content!</h2>
            <Login></Login>
          </div>
          <div class="showLastViewed" v-else-if="$root.store.username">
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
          
    
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Login from "./LoginPage.vue"
export default {
  components: {
    RecipePreviewList,
    Login
  },
  methods:{
    async updateRecipes(){
      this.$refs.refresh.updateRecipes();
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
#refreshButton{
  margin-left:30px;
}
#refreshButton:hover{
  background-color: silver;
}
.loginOption{
  margin-left:18px;
  margin-top:10px
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
