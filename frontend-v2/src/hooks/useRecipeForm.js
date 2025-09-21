import { useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { IMAGE_VALIDATION, TIME_VALIDATION } from '../constants/recipeConstants';

// Validation schema
const recipeSchema = yup.object({
  title: yup.string().required('Recipe title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  ingredients: yup.array().of(
    yup.object({
      value: yup.string().required('Ingredient cannot be empty')
    })
  ).min(1, 'At least one ingredient is required'),
  instructions: yup.array().of(
    yup.object({
      value: yup.string().required('Instruction cannot be empty')
    })
  ).min(1, 'At least one instruction is required'),
  servings: yup.string().required('Number of servings is required'),
  prepTime: yup.object({
    hours: yup.number().min(0).max(TIME_VALIDATION.HOURS.max),
    minutes: yup.number().min(0).max(TIME_VALIDATION.MINUTES.max),
  }),
  cookTime: yup.object({
    hours: yup.number().min(0).max(TIME_VALIDATION.HOURS.max),
    minutes: yup.number().min(0).max(TIME_VALIDATION.MINUTES.max),
  }),
  cuisineType: yup.string().required('Cuisine type is required'),
  mealType: yup.string().required('Meal type is required'),
  image: yup.mixed().required('Recipe image is required'),
});

// Custom hook for dynamic fields (ingredients/instructions)
export const useDynamicFields = (name, control, defaultValue = { value: '' }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const addField = useCallback(() => {
    append(defaultValue);
  }, [append, defaultValue]);

  const removeField = useCallback((index) => {
    if (fields.length > 1) {
      remove(index);
    }
  }, [fields.length, remove]);

  return {
    fields,
    addField,
    removeField,
    canRemove: fields.length > 1,
  };
};

// Custom hook for image upload validation
export const useImageUpload = () => {
  const [preview, setPreview] = useState(null);

  const validateImage = useCallback((file) => {
    if (!file) return { isValid: false, error: 'No file selected' };

    if (!IMAGE_VALIDATION.ALLOWED_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: 'Invalid file format. Only JPEG, JPG, PNG, or WEBP are allowed.'
      };
    }

    if (file.size > IMAGE_VALIDATION.MAX_SIZE) {
      return {
        isValid: false,
        error: 'Image size must be less than or equal to 5MB.'
      };
    }

    return { isValid: true };
  }, []);

  const handleImageChange = useCallback((file, onChange) => {
    const validation = validateImage(file);

    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    onChange(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }, [validateImage]);

  return {
    preview,
    handleImageChange,
    setPreview,
  };
};

// Main recipe form hook
export const useRecipeForm = (onSuccess) => {
  const methods = useForm({
    resolver: yupResolver(recipeSchema),
    defaultValues: {
      title: '',
      description: '',
      ingredients: [{ value: '' }],
      instructions: [{ value: '' }],
      servings: '',
      prepTime: { hours: '', minutes: '' },
      cookTime: { hours: '', minutes: '' },
      cuisineType: '',
      mealType: '',
      nutritionalValues: { calories: '', protein: '', fat: '', carbs: '' },
      dietaryInformation: '',
      image: null,
    },
  });

  const { control, handleSubmit, formState: { errors }, setValue, watch } = methods;

  const ingredients = useDynamicFields('ingredients', control);
  const instructions = useDynamicFields('instructions', control);
  const imageUpload = useImageUpload();

  const onSubmit = useCallback(async (data) => {
    try {
      const formData = new FormData();

      // Handle complex fields
      const complexFields = ['nutritionalValues', 'ingredients', 'instructions', 'prepTime', 'cookTime'];

      Object.entries(data).forEach(([key, value]) => {
        if (complexFields.includes(key)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      await onSuccess(formData);

      toast.success('Recipe created successfully!');
    } catch (error) {
      toast.error('Failed to create recipe. Please try again.');
      console.error('Recipe creation error:', error);
    }
  }, [onSuccess]);

  return {
    methods,
    ingredients,
    instructions,
    imageUpload,
    errors,
    onSubmit: handleSubmit(onSubmit),
    setValue,
    watch,
  };
};