import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import EditableTextField from "../../components/recipe-edit/EditableTextField";
import TimeField from "../../components/recipe-edit/TimeField";
import NutritionalField from "../../components/recipe-edit/NutritionalField";
import IngredientList from "../../components/recipe-edit/IngredientList";
import InstructionList from "../../components/recipe-edit/InstructionList";
import ImageField from "../../components/recipe-edit/ImageField";
import {
  useGetRecipeQuery,
  useUpdateRecipeMutation,
  useUpdatePrepTimeMutation,
  useUpdateCookTimeMutation,
  useUpdateNutritionalValuesMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
  useUpdateInstructionMutation,
  useDeleteInstructionMutation,
  useUpdateRecipeImageMutation,
} from "../../redux/hooks/recipeHook";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: recipe, isLoading } = useGetRecipeQuery(recipeId);
  const [updateRecipe] = useUpdateRecipeMutation();
  const [updatePrepTime] = useUpdatePrepTimeMutation();
  const [updateCookTime] = useUpdateCookTimeMutation();
  const [updateNutritionalValues] = useUpdateNutritionalValuesMutation();
  const [updateIngredient] = useUpdateIngredientMutation();
  const [deleteIngredient] = useDeleteIngredientMutation();
  const [updateInstruction] = useUpdateInstructionMutation();
  const [deleteInstruction] = useDeleteInstructionMutation();
  const [updateRecipeImage] = useUpdateRecipeImageMutation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        setIsAuthenticated(true);
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleUpdateRecipe = async (field, value) => {
    try {
      await updateRecipe({ recipeId, body: { [field]: value } });
      toast.success("Recipe updated successfully!");
    } catch (error) {
      toast.error("Failed to update recipe.");
    }
  };

  const handleUpdatePrepTime = async (name, value) => {
    try {
      await updatePrepTime({ recipeId, prepTime: value });
      toast.success("Preparation time updated successfully!");
    } catch (error) {
      toast.error("Failed to update preparation time.");
    }
  };

  const handleUpdateCookTime = async (name, value) => {
    try {
      await updateCookTime({ recipeId, cookTime: value });
      toast.success("Cooking time updated successfully!");
    } catch (error) {
      toast.error("Failed to update cooking time.");
    }
  };

  const handleUpdateNutritional = async (values) => {
    try {
      await updateNutritionalValues({ recipeId, nutritionalValues: values });
      toast.success("Nutritional values updated successfully!");
    } catch (error) {
      toast.error("Failed to update nutritional values.");
    }
  };

  const handleUpdateIngredient = async (id, value) => {
    try {
      await updateIngredient({ recipeId, ingredientId: id, value });
      toast.success("Ingredient updated successfully!");
    } catch (error) {
      toast.error("Failed to update ingredient.");
    }
  };

  const handleDeleteIngredient = async (id) => {
    try {
      await deleteIngredient({ recipeId, ingredientId: id });
      toast.success("Ingredient deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete ingredient.");
    }
  };

  const handleUpdateInstruction = async (id, value) => {
    try {
      await updateInstruction({ recipeId, instructionId: id, value });
      toast.success("Instruction updated successfully!");
    } catch (error) {
      toast.error("Failed to update instruction.");
    }
  };

  const handleDeleteInstruction = async (id) => {
    try {
      await deleteInstruction({ recipeId, instructionId: id });
      toast.success("Instruction deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete instruction.");
    }
  };

  const handleUpdateImage = async (formData) => {
    try {
      await updateRecipeImage({ recipeId, formData });
      toast.success("Image updated successfully!");
    } catch (error) {
      toast.error("Failed to update image.");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <div className="flex justify-between border-y px-4 lg:px-16 py-4">
        <h1 className="text-base lg:text-xl text-black font-semibold">Edit Recipe</h1>
      </div>

      <div className="py-4 px-4 lg:px-16 flex flex-col items-center justify-center gap-y-6 pb-[100px]">
        <EditableTextField
          label="Recipe Title"
          value={recipe?.title || ""}
          onSave={handleUpdateRecipe}
          name="title"
        />

        <ImageField
          image={recipe?.image}
          onSave={handleUpdateImage}
        />

        <EditableTextField
          label="Description"
          value={recipe?.description || ""}
          onSave={handleUpdateRecipe}
          name="description"
        />

        <IngredientList
          ingredients={recipe?.ingredients || []}
          onUpdate={handleUpdateIngredient}
          onDelete={handleDeleteIngredient}
        />

        <InstructionList
          instructions={recipe?.instructions || []}
          onUpdate={handleUpdateInstruction}
          onDelete={handleDeleteInstruction}
        />

        <EditableTextField
          label="Servings"
          value={recipe?.servings || ""}
          onSave={handleUpdateRecipe}
          name="servings"
        />

        <TimeField
          label="Preparation Time"
          value={recipe?.prepTime || { hours: "", minutes: "" }}
          onSave={handleUpdatePrepTime}
          name="prepTime"
        />

        <TimeField
          label="Cooking Time"
          value={recipe?.cookTime || { hours: "", minutes: "" }}
          onSave={handleUpdateCookTime}
          name="cookTime"
        />

        <NutritionalField
          value={recipe?.nutritionalValues || { calories: "", protein: "", fat: "", carbs: "" }}
          onSave={handleUpdateNutritional}
        />

        <EditableTextField
          label="Dietary Information"
          value={recipe?.dietaryInformation || ""}
          onSave={handleUpdateRecipe}
          name="dietaryInformation"
        />
      </div>
    </div>
  );
};

export default EditRecipe;