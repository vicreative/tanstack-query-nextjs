export default Object.freeze({
  USERS: `/users`,
  RECIPES: `/recipes/complexSearch`,
  RECIPE_DETAILS: (id: string) => `/recipes/${id}/information`,
  SIMILAR_RECIPE: (id: string) => `/recipes/${id}/similar`,
});
