import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/myRecipes",
    name: "MyRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/familyRecipes",
    name: "FamilyRecipes",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "/favouriteRecipes",
    name: "FavouriteRecipes",
    component: () => import("./pages/FavouriteRecipesPage"),
  },
  {
    path: "/createRecipes",
    name: "createRecipes",
    component: () => import("./pages/CreateRecipesPage"),
  },
  
];

export default routes;
