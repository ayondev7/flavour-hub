import React from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import { useCreateRecipeMutation } from "@redux/hooks/recipeHook";
import { useRecipeForm } from "@hooks/useRecipeForm";
import RecipeBasicInfo from "@components/recipe-form/RecipeBasicInfo";
import IngredientsSection from "@components/recipe-form/IngredientsSection";
import InstructionsSection from "@components/recipe-form/InstructionsSection";
import TimeSection from "@components/recipe-form/TimeSection";
import NutritionalInfo from "@components/recipe-form/NutritionalInfo";
import RecipeMetadata from "@components/recipe-form/RecipeMetadata";

const CreateNewRecipe = () => {
  const navigate = useNavigate();
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();

  const handleRecipeSubmit = async (formData) => {
    await createRecipe(formData).unwrap();
    setTimeout(() => {
      navigate("/my-recipes");
    }, 2000);
  };

  const {
    methods,
    ingredients,
    instructions,
    imageUpload,
    errors,
    onSubmit,
  } = useRecipeForm(handleRecipeSubmit);

  return (
    <div className="min-h-screen">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="flex justify-between border-y px-4 lg:px-16 py-4">
            <h1 className="text-xl text-black font-semibold">Create New Recipe</h1>
            <button
              type="submit"
              className="px-6 font-medium py-2 rounded-md bg-hotPink text-white border-none text-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner text-sm text-white"></span>
              ) : (
                "Save"
              )}
            </button>
          </div>

          <div className="py-4 px-4 lg:px-16 flex flex-col items-center justify-center gap-y-6 pb-[100px]">
            <RecipeBasicInfo
              control={methods.control}
              errors={errors}
              imageUpload={imageUpload}
            />

            <IngredientsSection ingredients={ingredients} errors={errors} />

            <InstructionsSection instructions={instructions} errors={errors} />

            <RecipeMetadata errors={errors} />

            <TimeSection
              title="Preparation Time"
              name="prepTime"
              errors={errors}
            />

            <TimeSection
              title="Cooking Time"
              name="cookTime"
              errors={errors}
            />

            <NutritionalInfo errors={errors} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateNewRecipe;
