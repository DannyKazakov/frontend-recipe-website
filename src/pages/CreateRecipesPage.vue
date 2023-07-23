<template>
  <div class="container">      
    <div class="newRecipe"> 
      <b-form @submit.prevent="onAdd" @reset.prevent="onReset">
        <!-- Recipe name -->
        <b-form-group
          id="input-group-recipeName"
          label-cols-sm="3"
          label= "Recipe Name:"
          label-for="recipeName">
          <b-form-input
            id="recipeName"
            v-model="$v.newCreatedRecipe.newRecipePreview.title.$model"
            type="text"
            :state="validateStatePreviewRecipe('title')">
          </b-form-input>
          <b-form-invalid-feedback v-if="!$v.newCreatedRecipe.newRecipePreview.title.required">
          Recipe name is required
          </b-form-invalid-feedback>
        </b-form-group>
        
        <!-- Preperation time -->
        <b-form-group
          id="input-group-prepTime"
          label-cols-sm="3"
          label="Preperation Time In Minutes:"
          label-for="preperationTime">
          <b-form-input
            id="preperationTime"
            v-model="$v.newCreatedRecipe.newRecipePreview.readyInMinutes.$model"
            type="text"
            :state="validateStatePreviewRecipe('readyInMinutes')">
          </b-form-input>
          <b-form-invalid-feedback v-if="!$v.newCreatedRecipe.newRecipePreview.readyInMinutes.required">
          Preperation time is required 
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.newCreatedRecipe.newRecipePreview.readyInMinutes.number">
          Preperation time must be a number 
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Amount of dishes -->
        <b-form-group
          id="input-group-amount"
          label-cols-sm="3"
          label="Amount Of Dishes (number):"
          label-for="dishesAmount">
          <b-form-input
            id="dishesAmount"
            v-model="$v.newCreatedRecipe.servings.$model"
            type="text"
            :state="validateState('servings')">
          </b-form-input>
          <b-form-invalid-feedback v-if="!$v.newCreatedRecipe.servings.required">
          Servings are required 
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.newCreatedRecipe.servings.number">
          Servings must be a number 
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Gluten free -->
        <b-form-group
        id="input-group-gluten"
        label-cols-sm="3"
        label="Gluten Free?:"
        label-for="glutenFree">
          <b-form-select
            id="gluten"
            v-model="newCreatedRecipe.newRecipePreview.glutenFree"
            :options="[{value:true,text:'Yes'},{value:false,text:'No'}]"
            @change="checkGlutenFree">
          </b-form-select>
        </b-form-group>

        <!-- Vegetarian -->
        <b-form-group
        id="input-group-vegetarian"
        label-cols-sm="3"
        label="Vegetarian?:"
        label-for="vegetarian">
          <b-form-select
            id="vegetarian"
            v-model="newCreatedRecipe.newRecipePreview.vegetarian"
            :options="[{value:true,text:'Yes'},{value:false,text:'No'}]"
            @change="vegetarianCheck">
          </b-form-select>
        </b-form-group>
        
        <!-- Vegan -->
        <b-form-group
        id="input-group-vegan"
        label-cols-sm="3"
        label="Vegan?:"
        label-for="vegan">
          <b-form-select
            id="vegan"
            v-model="newCreatedRecipe.newRecipePreview.vegan"
            :options="[{value:true,text:'Yes'},{value:false,text:'No'}]"
            @change="veganCheck">
          </b-form-select>
        </b-form-group>
        
        
        <b-form-group>
          <!-- Ingredients -->
          <div style="display: inline-flex;">
          <div style="padding-right:50px;"><b>Ingredients:</b></div>
              <b-form-input placeholder="Ingredient name" id="ingredient name" v-model="ingredient"></b-form-input>
              <b-form-input placeholder="Ingredient amount" id="ingredient amount" v-model="amount"></b-form-input>
          </div>        
          <b-button class="mt-2" 
            variant="primary" @click="addIngredient">Add Ingredient</b-button>
          <br><br>       
          <!-- Instructions -->
          <!-- <div style="display: inline-flex;"> -->
            <div style="padding-right:50px;"><b>Instructions:</b></div>
            <br>
            <b-form-input
              id="instructions"
              v-model="newCreatedRecipe.instructions"
              placeholder="Please insert the preperation instructions for your recipe.">
            </b-form-input>
          <!-- </div> -->   
        </b-form-group>

        <div class="rightScreenSide">
          <div class="image">
            <h5>Add an image url:<br></h5>        
            <input v-model="newCreatedRecipe.newRecipePreview.image" style="width: 250px;">
          </div>           
        </div>
        <br>
        
        <b-button type="reset" variant="danger">Clean</b-button>
        <b-button
          type="submit"
          variant="primary"
          style="width:250px; margin-left: 10%;"
          class="w-75">
          Apply
        </b-button>

      <br>
      <br>
      </b-form>
    </div>
    
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";
export default {
  
  name:"CreateRecipesPage",
  data() {
    return {
      addButtonPressed: false,
      ingredient: "",
      amount: "",
      newCreatedRecipe: {
        newRecipePreview: {
          image:"",
          id: null,
          title:"",
          readyInMinutes: "",
          glutenFree: false, 
          vegan: false,
          vegetarian: false,
          popularity: false,
          wasWatched: false,
          savedToFavourites: false,
        },
        ingredients: [],
        instructions:"",
        servings: "",
      }
    }
  },
  validations: {
    newCreatedRecipe: {
      newRecipePreview:
      {
        title: {
        required
      },
      readyInMinutes: {
        required,
        number: (p) => /^[0-9]*$/.test(p) 
      }
      },
      servings:{
      required,
      number: (p) => /^[0-9]*$/.test(p)
    }
      
    }

  },
  methods: {
    validateStatePreviewRecipe(param) {
      const { $dirty, $error } = this.$v.newCreatedRecipe.newRecipePreview[param];
      return $dirty ? !$error : null;
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.newCreatedRecipe[param];
      return $dirty ? !$error : null;
    },
    checkGlutenFree(){
      if (this.newCreatedRecipe.newRecipePreview.glutenFree === true) {
        this.$root.toast("Info"
        ,'Please pay attention!\n'+
        ' We would appreciate it if you would check again that the recipe is indeed gluten free!', "info");
      }
    },

    veganCheck(){
      if (this.newCreatedRecipe.newRecipePreview.vegan === true) {
        this.$root.toast("Info"
        ,'Please pay attention!\n'+
        ' We would appreciate it if you would check again that the recipe is indeed vegan!', "info");
        //this.newCreatedRecipe.vegan = "yes";
      }
      // else{
      //   this.newCreatedRecipe.vegan = "no";
      // }
      
    },

    vegetarianCheck(){
      if (this.newCreatedRecipe.newRecipePreview.vegetarian === true) {
        this.$root.toast("Info"
        ,'Please pay attention!\n'+
        ' We would appreciate it if you would check again that the recipe is indeed vegetarian!', "info");
      }
    },

    validateRecipeNameState(){
      if (this.addButtonPressed == true){
        if (this.newCreatedRecipe.newRecipePreview.title != '')
          return true;
      }
      return null;
    },
    
    validateIngredientsState(){
      if (this.addButtonPressed == true){
        if (this.newCreatedRecipe.ingredients != '')
          return true;
      }
      return null;
    },

    validateInstructionsState(){
      if (this.addButtonPressed == true){
        if (this.newCreatedRecipe.instructions != '')
          return true;
      }
      return null;
    },

    validatePrepTimeState(){
      if (this.addButtonPressed == true){
        if (this.newCreatedRecipe.newRecipePreview.readyInMinutes != '' &&  !isNaN(this.newCreatedRecipe.newRecipePreview.readyInMinutes))
          return true;
      }
      return null;
    },

    validateAmountState(){
      if (this.addButtonPressed == true){
        if (this.newCreatedRecipe.servings != '' &&  !isNaN(this.newCreatedRecipe.servings))
          return true;
      }
      return null;
    },

    addIngredient(){
      if(!(this.ingredient == "" || this.amount == "")){
        const newIngredient = {
          ingredientName: this.ingredient,
          quantity: this.amount,
        };
        this.newCreatedRecipe.ingredients.push(newIngredient);
        //this.newCreatedRecipe.ingredients += this.amount + this.ingredient + " | ";
        this.ingredient = "";
        this.amount = "";
      }
      return;
    },
    onAdd(){
      this.$v.newCreatedRecipe.$touch();
      if (this.$v.newCreatedRecipe.$anyError) {
        this.$root.toast("Status", "Illegal Fields entered", "warning");
        return;
      }
      this.Add();
    },
    
    async Add(){
      this.addButtonPressed = true;
      // let recipeName_state = this.validateRecipeNameState();
      // let ingredient_state = this.validateIngredientsState();
      // let instructions_state = this.validateInstructionsState();
      // let preperationTime_state = this.validatePrepTimeState();
      // let dishesAmount_state = this.validateAmountState();
      // if(recipeName_state && ingredient_state && instructions_state && preperationTime_state && dishesAmount_state){
      this.axios.defaults.withCredentials = true
      const response = await this.axios.post(this.$root.store.server_domain + "/users/myRecipes", this.newCreatedRecipe);
      const recipeId = response.data[0].recipe_id;
      this.newCreatedRecipe.newRecipePreview.id = recipeId;
      this.axios.defaults.withCredentials = false
      this.$root.toast("Recipe Creation", "Recipe created successfully", "success");

      // }
  
      this.$emit('close');      // this.onReset();
    },

    onReset(){
      this.addButtonPressed = false;
      this.ingredient = "";
      this.amount = "";
      this.newCreatedRecipe = {
        newRecipePreview: {
          image:"",
          id: null,
          title:"",
          readyInMinutes: "",
          glutenFree: "", 
          vegan: "",
          vegetarian: "",
          popularity: null,
          wasWatched: null,
          savedToFavourites: null,
        },
        ingredients: [],
        instructions:"",
        servings: ""
      }
    },

  },
}

</script>


<style lang="scss">
  .newRecipe{
    font-weight: bold;
  }

  /* Your existing styles */
  .newRecipe {
    font-weight: bold;
  }

</style>