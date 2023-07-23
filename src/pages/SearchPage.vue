<template>
  <div class="container">
    <div>
      <br>
      <h2>Search for Recipes</h2>
        <b-form-input placeholder="Search here" v-model="search" id="querystring" ></b-form-input>
      <b-row>
        <b-col>
          <b-form-text>Filter by diets:</b-form-text>
          <multiselect class="multiselect" v-model="selected.diets" :preserve-search="true" 
                      :options="options.diets" 
                    :multiple="true"
                    :show-labels="false" 
                    :close-on-select="false" placeholder="Select diets">
                    <template slot="tag">{{ '' }}</template>
         </multiselect>
        </b-col>
        <b-col>
          <b-form-text>Filter by intolerance:</b-form-text>
      <multiselect class="multiselect" v-model="selected.intolerance" 
              :options="options.intolerance" 
              :multiple="true" :show-labels="false"
              :close-on-select="false" placeholder="Select intolerances">
              <template slot="tag">{{ '' }}</template>
            </multiselect>
        </b-col>
        <b-col>
          <b-form-text>Filter by cuisine:</b-form-text>
          <multiselect class="multiselect" v-model="selected.cuisine" 
                :options="options.cuisine" 
                :multiple="true" 
                :show-labels="false"
              :close-on-select="false" 
              placeholder="Select cuisines">
              <template slot="tag">{{ '' }}</template>
            </multiselect>
        </b-col>
        <b-col>
          
          <b-form-text>Number of results:</b-form-text>
         <multiselect class="multiselect" v-model="amount" :show-labels="false"
                :options="[5, 10, 15]" 
              :close-on-select="true" placeholder="Select amount" :preselect-first="true">
         </multiselect>
        </b-col>
        <b-col>
          <b-form-text>Sort by:</b-form-text>
         <multiselect class="multiselect" v-model="selected.sortby" :show-labels="false"
      :options="['Popularity','meal prep']"
      placeholder="sort by"
      :allowEmpty="true"
      > 
     </multiselect>
        </b-col>
      </b-row><br>
      <b-row>
        <b-col><b-button
        @click="searchRecipes"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Search</b-button></b-col>
        <b-col>        
          <b-button
        @click="clear"
        variant="secondary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Clear all Fields</b-button></b-col>
      </b-row>





    </div>
    <div class="filtered options" v-if="useFilter">
      <RecipePreviewList title="Search Results" :searchResults="searchResults"></RecipePreviewList>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue';
import Multiselect from 'vue-multiselect'
export default {

  components: {RecipePreviewList, Multiselect},
  data() {
    return {
      options:{
        diets:["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", 
    "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"],
      cuisine:["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European",
    "European","French", "German", "Greek","Indian", "Irish", "Italian", "Japanese", "Jewish","Korean",
  "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", 
"Vietnamese" ],
      intolerance:["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", 
    "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"]
  },
      searchResults:[],
      selected:
      {
        diets:[],
        intolerance:[],
        cuisine:[],
        sortby:[]
      },
      amount:5,
      search:"",
      searchQuery:"",
      result:false,
      useFilter:false
    };
  },
  watch:{
    amount(newamount, oldamount){
      if (newamount < 5){
        this.amount = 5
      }
    }
  },async mounted(){
    if(this.$root.store.username){
      this.searchQuery = localStorage.getItem("results")
      if(this.searchQuery != null) this.getRecipesFromServer()
    }

  },
  methods:{
    async getRecipesFromServer(){
      this.searchResults = []
      if(this.$root.store.username) this.axios.defaults.withCredentials = true
      const response = await this.axios.get(this.$root.store.server_domain + this.searchQuery)
      this.axios.defaults.withCredentials = false
      for (let recipe in response.data){
        this.searchResults.push(response.data[recipe].recipePreview)
      }
      if(this.searchResults.length == 0)
      {
        this.useFilter = false;
        this.$root.toast("Search results", "Results not found", "warning");
      }
      else{
        this.sortResults()
        this.useFilter = true;
        this.$root.toast("Search results", "Results retrieved successfully", "success");
        if(this.$root.store.username){
          localStorage.setItem("results", this.searchQuery)
        } 
      }
    },
    async searchRecipes(){
      this.searchResults = []
      this.searchQuery = "/recipes/search?recipeName="+this.search+"&cuisine="+this.selected.cuisine+
      "&diet="+this.selected.diets+"&intolerance="+this.selected.intolerance+"&amount="+this.amount;
      // if(this.$root.store.username){
      //     this.axios.defaults.withCredentials = true
      //   }
      //   else{
      //     this.axios.defaults.withCredentials = false

      //   }
      this.getRecipesFromServer()
  
     
    },
    sortResults()
    {
      if(this.selected.sortby === "Popularity"){
        this.searchResults.sort(function(recipeA, recipeB){
          let popularityA = recipeA.popularity
          let popularityB = recipeB.popularity
          if(popularityA > popularityB) return -1;
          else return 1;
        });
      }
      else{
        this.searchResults.sort(function(recipeA, recipeB){
          let mealTimeA = recipeA.readyInMinutes
          let mealTimeB = recipeB.readyInMinutes
          if(mealTimeA > mealTimeB) return 1;
          else return -1;
        });
      }
    },
    clear(){
      this.selected.diets = []
      this.selected.cuisine = []
      this.selected.intolerance = []
      this.selected.sortby = []
      this.amount = 5
      this.useFilter = false
      this.search = ""
      this.$root.toast("Fields Status", "Fields are cleared", "success");
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">

.multiselect{
  overflow: visible; 
  white-space: nowrap;
  max-width: 200px;
  max-height: 50px;

}
.multiselect__option--selected{
  background:#41b883;color:#f6f8fb;
  }
</style>
