import { RecipeCollection } from "@/components/recipe-collection";

export const metadata = {
  title: "Reseptit — SuomiKoti",
  description: "Коллекция рецептов национальных блюд",
};

export default function RecipesPage() {
  return <RecipeCollection />;
}
