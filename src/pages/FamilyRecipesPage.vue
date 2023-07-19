<template>
    <div class="container">
        <h1><b>Family Recipes</b></h1>
        <router-link to="/" exact>ET Go Home</router-link>
        <!-- <b-carousel id="family-recipes-carousel" controls indicators>
            <div v-for="(recipe, index) in familyRecipes" :key="index">
                <b-carousel-slide>
                    <div class="recipe-container">
                        <h2>{{ recipe.title }}</h2>
                        <p>{{ recipe.text }}</p>
                        <img :src="recipe.imageUrl" alt="Recipe Image" class="recipe-image" />
                        <ul>
                            <li v-for="(slide, slideIndex) in recipe.slides" :key="slideIndex">
                                <h3>{{ slide.caption }}</h3>
                                <p>{{ slide.text }}</p>
                            </li>
                        </ul>
                    </div>
                </b-carousel-slide>
            </div>
        </b-carousel> -->
        <div v-for="(recipe, index) in familyRecipes" :key="index" @click="toggleRecipeDetails(recipe)">
            <div class="recipe-container" 
            :style="{ cursor: isHover(recipe) ? 'pointer' : 'default', backgroundColor: recipe.showBackground ? '#f9f9f9' : 'transparent' }"
            @mouseover="setHover(recipe, true)" 
            @mouseleave="setHover(recipe, false)">
                <h2>{{ recipe.title }}</h2>
                <p v-if="!recipe.showDetails">{{ recipe.text }}</p>
                <img v-if="recipe.showDetails" :src="recipe.imageUrl" alt="Recipe Image" class="recipe-image" />
                <ul v-if="recipe.showDetails">
                    <li v-for="(slide, slideIndex) in recipe.slides" :key="slideIndex">
                        <h3>{{ slide.caption }}</h3>
                        <p>{{ slide.text }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
  export default {
    data(){
        return {
            //isHover: false,
            familyRecipes:[
                {
                    showDetails: false,
                    showBackground: false,
                    title: "Dani's famous asian-style chicken breast with soy-ginger glaze -",
                    text: `Usually prepared at the end of intensive study days at the university.
                           Preparation time: 10 minutes
                           Cooking time: 20 minutes
                           Serves: 4`,
                    imageUrl: "https://inquiringchef.com/wp-content/uploads/2021/01/Honey-Ginger-Chicken-StirFry-5-1097x1536.jpg",
                    slides: [{caption:"Ingredients", text: `4 boneless, skinless chicken breasts| 
                            1/4 cup soy sauce (or tamari for a gluten-free option)|
                            3 tablespoons honey or maple syrup for a vegan option|
                            2 tablespoons rice vinegar|
                            2 tablespoons fresh ginger, grated|
                            2 cloves garlic, minced|
                            1 tablespoon sesame oil|
                            2 green onions, thinly sliced (for garnish)|
                            Sesame seeds (for garnish)|
                            Steamed broccoli or rice (optional, for serving)`},
                            {caption:"Instructions", text:`1. In a small bowl, whisk together the soy sauce, honey (or maple syrup), rice vinegar, grated ginger, minced garlic, and sesame oil to create the marinade.
                            2. Place the chicken breasts in a resealable plastic bag or a shallow dish and pour the marinade over them. Seal the bag or cover the dish and marinate in the refrigerator for at least 30 minutes (or up to 2 hours) to let the flavors infuse.
                            3. Preheat the oven to 190°C.
                            4. Heat a large oven-safe skillet over medium-high heat. Remove the chicken breasts from the marinade and reserve the marinade for later.
                            5. Add a bit of oil to the skillet and sear the chicken breasts for about 2-3 minutes per side until they develop a golden-brown crust.
                            6. Pour the reserved marinade over the chicken breasts in the skillet and transfer the skillet to the preheated oven.
                            7. Bake the chicken in the oven for about 15 minutes or until the internal temperature reaches 165°F (74°C) and the chicken is fully cooked.
                            8. While the chicken cooks, you can simmer the leftover marinade in a small saucepan until it thickens slightly to create a glaze.
                            9. Once the chicken is done, brush the glaze over the chicken breasts and let it rest for a few minutes before serving.
                            10. Serve the Asian-style Chicken Breast over steamed broccoli or rice (if desired), and garnish with sliced green onions and sesame seeds for added texture and flavor.
                            
                            This Asian-inspired chicken dish is bursting with umami and the sweet-savory flavors that make it a delightful and healthy choice for any dinner occasion. Enjoy!`}]
                },
                {
                    showDetails: false,
                    showBackground: false,
                    title: "Itay's schnitzel - the most crispy schnitzel ever -",
                    text: `It is usually prepared for the popular friday sandwich.
                           Preparation time: 15 minutes
                           Cooking time: 10 minutes
                           Serves: 4`,
                    imageUrl: "https://www.thespruceeats.com/thmb/BS5BdyQsGh5qQyRiuZMannmcxoY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-wiener-schnitzel-recipe-1447089-hero-02-18827aac4cbd4aec926350d4f9778e70.jpg",
                    slides: [{caption:"Ingredients", text: `4 boneless chicken cutlets, about 4-6 (113-170g) each|
                            1 cup all-purpose flour|
                            2 large eggs|
                            1 cup breadcrumbs|
                            1 teaspoon paprika|
                            1/2 teaspoon salt|
                            1/4 teaspoon black pepper|
                            Vegetable oil, for frying|
                            Lemon wedges, for serving`},
                            {caption:"Instructions", text:`1. Tenderize the meat by pounding each cutlet with a meat mallet until they are about 1/4-inch thick. 
                            2. Set up a breading station with three shallow dishes. In the first dish, place the flour. In the second dish, beat the eggs. In the third dish, mix the breadcrumbs with paprika, salt, and black pepper.
                            3. Dredge each cutlet in the flour, shaking off any excess. Then dip it into the beaten eggs, making sure it's fully coated. Finally, press the cutlet into the breadcrumb mixture, ensuring it's evenly coated.
                            4. In a large skillet, heat enough vegetable oil to cover the bottom of the pan over medium-high heat.
                            5. Fry the breaded cutlets in batches for about 2-3 minutes per side until they turn golden brown and crispy. Transfer the cooked schnitzels to a plate lined with paper towels to drain any excess oil.
                            6. Serve the schnitzels hot with lemon wedges on the side. They can be accompanied by traditional sides like potato salad or a fresh green salad.`}],
                },
                {
                    showDetails: false,
                    showBackground: false,
                    title: "A family recipe for traditional Russian borscht soup -",
                    text: `It is usually prepared on cold winter days when you want something warm and tasty.
                           Preparation time: 25 minutes
                           Cooking time: 1 hour 15 minutes
                           Serves: 6-8`,
                    imageUrl: "https://www.chefspencil.com/wp-content/uploads/Borscht-1.jpg",
                    slides: [{caption:"Ingredients", text: `2 tablespoons vegetable oil|
                            1 large onion, finely chopped|
                            3 cloves garlic, minced|
                            3 medium beets, peeled and shredded|
                            2 carrots, peeled and shredded|
                            1/2 small head cabbage, shredded|
                            3 large potatoes, peeled and diced|
                            1 can (14 ounces/400g) diced tomatoes|
                            6 cups vegetable broth|
                            2 tablespoons tomato paste|
                            2 bay leaves|
                            2 tablespoons apple cider vinegar|
                            Salt and pepper to taste|
                            Fresh dill for garnish`},
                            {caption:"Instructions", text:`1. In a large pot, heat the vegetable oil over medium heat. Add the chopped onions and garlic. Sauté until the onions become translucent. 
                            2. Stir in the shredded beets and carrots, and cook for about 5 minutes until they soften slightly.
                            3. Add the shredded cabbage and diced potatoes to the pot. Cook for another 5 minutes, stirring occasionally.
                            4. Pour in the vegetable broth, diced tomatoes (with their juice), and tomato paste. Add the bay leaves, salt, and pepper. Stir well to combine all the ingredients.
                            5. Bring the mixture to a boil, then reduce the heat to low. Cover the pot and let the borscht simmer for about 1 hour or until the vegetables are tender and the flavors have melded together.
                            6. Stir in the apple cider vinegar to enhance the flavors.
                            7. Serve the Russian Borscht hot, garnished with fresh dill. The vibrant colors and hearty flavors of this soup will surely warm your soul.`}],
                }]
        }
    },
    methods: {
        toggleRecipeDetails(recipe) {
            recipe.showDetails = !recipe.showDetails;
        },
        setHover(recipe, value) {
            recipe.showBackground = value;
        },
        isHover(recipe) {
            return recipe.showBackground;
        },
    },
}
</script>
  
<style>
    .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    }

    h1 {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
    color: #4CAF50;
    }

    .router-link-exact-active {
    color: #4CAF50;
    }

    .recipe-container {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    }

    h2 {
    font-size: 24px;
    color: #4CAF50;
    margin-bottom: 10px;
    }

    .recipe-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
    }

    p {
    font-size: 16px;
    line-height: 1.6;
    }

    ul {
    list-style-type: disc;
    margin-left: 30px;
    }

    li {
    margin-bottom: 10px;
    }

    h3 {
    font-size: 20px;
    color: #4CAF50;
    margin-bottom: 5px;
    }
    .recipe-container:hover {
    background-color: #f9f9f9;
    }
    
</style>