import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Direction, IngredientRecipe, Recipe } from '@/types/Recipe';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { ChefHat, Clock, Plus, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    ACCEPTED_IMAGE_TYPES,
    editFormSchema as formSchema,
} from './form-schema';

type FormValuesType = z.infer<typeof formSchema>;

// Enhanced ImagePreview component for edit mode
interface ImagePreviewProps {
    file: File | null;
    existingImageUrl?: string | null;
    onRemove: () => void;
    isEditMode: boolean;
}

const ImagePreview = ({
    file,
    existingImageUrl,
    onRemove,
    isEditMode,
}: ImagePreviewProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        } else if (existingImageUrl) {
            setPreviewUrl(existingImageUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [file, existingImageUrl]);

    if (!previewUrl) return null;

    return (
        <div className="relative mt-4">
            <div className="flex items-center gap-4">
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-20 w-20 rounded-lg border object-cover"
                />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                        {file ? file.name : 'Existing image'}
                    </p>
                    {file && (
                        <p className="text-sm text-gray-500">
                            {(file.size / 1024).toFixed(2)} KB
                        </p>
                    )}
                    {existingImageUrl && !file && isEditMode && (
                        <p className="text-sm text-gray-500">
                            Current recipe image
                        </p>
                    )}
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onRemove}
                    aria-label="Remove image"
                >
                    Remove
                </Button>
            </div>
        </div>
    );
};

interface EditRecipeFormProps {
    recipe: Recipe & {
        ingredients?: IngredientRecipe[];
        directions?: Direction[];
    };
    categories: Array<{ id: number; title: string }>;
}

export default function EditRecipeForm({
    recipe,
    categories,
}: EditRecipeFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewFile, setPreviewFile] = useState<File | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(
        recipe.image ? `/storage/${recipe.image}` : null,
    );

    // Prepare default values for the form
    const defaultValues = {
        title: recipe.title || '',
        short_description: recipe.short_description || '',
        category_id: recipe.category_id.toString() || '',
        prep_time: recipe.prep_time || 0,
        cook_time: recipe.cook_time || 0,
        calories: recipe.calories?.toString() || '',
        total_fats: recipe.total_fats?.toString() || '',
        proteins: recipe.proteins?.toString() || '',
        carbs: recipe.carbs?.toString() || '',
        cholesterol: recipe.cholesterol?.toString() || '',
        image: recipe.image || undefined,
        ingredients: recipe.ingredients?.map((ing) => ({
            id: ing.id,
            title: ing.title || '',
            short_description: ing.short_description || '',
        })) || [{ title: '', short_description: '' }],
        directions: recipe.directions?.map((dir) => ({
            id: dir.id,
            title: dir.title || '',
            short_description: dir.short_description || '',
        })) || [{ title: '', short_description: '' }],
    };

    const {
        control,
        reset,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isDirty },
    } = useForm<FormValuesType>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    // Dynamic arrays for ingredients and directions
    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const {
        fields: directionFields,
        append: appendDirection,
        remove: removeDirection,
    } = useFieldArray({
        control,
        name: 'directions',
    });

    // Watch for image changes
    const imageValue = watch('image');

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue('image', file, { shouldValidate: true });
            setPreviewFile(file);
            setExistingImageUrl(null); // Clear existing image when new file is selected
            setValue('remove_image', false, { shouldValidate: true });
        }
    };

    // Handle file removal
    const handleRemoveImage = () => {
        setValue('image', null, { shouldValidate: true });
        setValue('remove_image', true, { shouldValidate: true });
        setPreviewFile(null);
        setExistingImageUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle form submission
    const onSubmit = async (data: FormValuesType) => {
        console.log('Updating recipe data:', data);

        // Create FormData for file upload
        const formData = new FormData();

        // Basic recipe info
        formData.append('title', data.title);
        formData.append('short_description', data.short_description);
        formData.append('category_id', data.category_id);
        formData.append('prep_time', data.prep_time.toString());
        formData.append('cook_time', data.cook_time.toString());
        formData.append('_method', 'PUT');

        // Nutritional info
        if (data.calories)
            formData.append('calories', data.calories.toString());
        if (data.total_fats)
            formData.append('total_fats', data.total_fats.toString());
        if (data.proteins)
            formData.append('proteins', data.proteins.toString());
        if (data.carbs) formData.append('carbs', data.carbs.toString());
        if (data.cholesterol)
            formData.append('cholesterol', data.cholesterol.toString());

        // Image handling
        if (data.image instanceof File) {
            formData.append('image', data.image);
        } else if (data.remove_image) {
            formData.append('remove_image', 'true');
        }

        // Ingredients and directions as JSON
        formData.append('ingredients', JSON.stringify(data.ingredients));
        formData.append('directions', JSON.stringify(data.directions));

        router.post(`/recipes/${recipe.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                console.log('Recipe updated successfully');
            },
            onError: (errors) => {
                console.log('Error updating recipe:', errors);
            },
        });
    };

    // Reset form to original recipe values
    const resetForm = () => {
        reset({
            title: recipe.title || '',
            short_description: recipe.short_description || '',
            category_id: recipe.category_id.toString() || '',
            prep_time: recipe.prep_time || 0,
            cook_time: recipe.cook_time || 0,
            calories: recipe.calories || null,
            total_fats: recipe.total_fats || null,
            proteins: recipe.proteins || null,
            carbs: recipe.carbs || null,
            cholesterol: recipe.cholesterol || null,
            image: recipe.image || undefined,
            ingredients: recipe.ingredients?.map((ing) => ({
                id: ing.id,
                title: ing.title || '',
                short_description: ing.short_description || '',
            })) || [{ title: '', short_description: '' }],
            directions: recipe.directions?.map((dir) => ({
                id: dir.id,
                title: dir.title || '',
                short_description: dir.short_description || '',
            })) || [{ title: '', short_description: '' }],
        });
        setPreviewFile(null);
        setExistingImageUrl(recipe.image ? `/storage/${recipe.image}` : null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Check if image is being changed
    const isImageChanged = imageValue !== (recipe.image || undefined);

    return (
        <Card className="mx-auto my-4 w-full max-w-4xl shadow-none">
            <CardHeader>
                <CardTitle>Edit Recipe</CardTitle>
                <p className="text-sm text-gray-500">Editing: {recipe.title}</p>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    id="edit-recipe-form"
                    className="space-y-8"
                >
                    {/* Basic Information Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">
                            Basic Information
                        </h3>

                        <FieldGroup>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="recipe-title">
                                            Recipe Title
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            id="recipe-title"
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                            placeholder="Spaghetti Carbonara..."
                                            className="w-full"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <FieldGroup>
                            <Controller
                                name="short_description"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="recipe-description">
                                            Description
                                        </FieldLabel>
                                        <Textarea
                                            id="recipe-description"
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                            placeholder="A classic Italian pasta dish..."
                                            className="min-h-[100px] w-full"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">
                                            {field.value?.length || 0}/500
                                            characters
                                        </p>
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <FieldGroup>
                                <Controller
                                    name="category_id"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel htmlFor="recipe-category">
                                                Category
                                            </FieldLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    id="recipe-category"
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                >
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={category.id.toString()}
                                                            >
                                                                {category.title}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <Controller
                                    name="prep_time"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel htmlFor="prep-time">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    Prep Time (minutes)
                                                </div>
                                            </FieldLabel>
                                            <Input
                                                type="number"
                                                id="prep-time"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                {...field}
                                                placeholder="15"
                                                min="0"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <Controller
                                    name="cook_time"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel htmlFor="cook-time">
                                                <div className="flex items-center gap-2">
                                                    <ChefHat className="h-4 w-4" />
                                                    Cook Time (minutes)
                                                </div>
                                            </FieldLabel>
                                            <Input
                                                type="number"
                                                id="cook-time"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                {...field}
                                                placeholder="30"
                                                min="0"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </div>

                        {/* Nutritional Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">
                                Nutritional Information (Optional)
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                                <FieldGroup>
                                    <Controller
                                        name="calories"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel htmlFor="calories">
                                                    Calories (kcal)
                                                </FieldLabel>
                                                <Input
                                                    type="number"
                                                    id="calories"
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    placeholder="250"
                                                    min="0"
                                                    step="1"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                <FieldGroup>
                                    <Controller
                                        name="total_fats"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel htmlFor="total_fats">
                                                    Total Fats (g)
                                                </FieldLabel>
                                                <Input
                                                    type="number"
                                                    id="total_fats"
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    placeholder="12"
                                                    min="0"
                                                    step="0.1"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                <FieldGroup>
                                    <Controller
                                        name="proteins"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel htmlFor="proteins">
                                                    Proteins (g)
                                                </FieldLabel>
                                                <Input
                                                    type="number"
                                                    id="proteins"
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    placeholder="20"
                                                    min="0"
                                                    step="0.1"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                <FieldGroup>
                                    <Controller
                                        name="carbs"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel htmlFor="carbs">
                                                    Carbs (g)
                                                </FieldLabel>
                                                <Input
                                                    type="number"
                                                    id="carbs"
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    placeholder="30"
                                                    min="0"
                                                    step="0.1"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                <FieldGroup>
                                    <Controller
                                        name="cholesterol"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel htmlFor="cholesterol">
                                                    Cholesterol (mg)
                                                </FieldLabel>
                                                <Input
                                                    type="number"
                                                    id="cholesterol"
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    placeholder="50"
                                                    min="0"
                                                    step="1"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="recipe-image">
                                    Recipe Image
                                </FieldLabel>
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ fieldState }) => (
                                        <>
                                            <input
                                                type="file"
                                                id="recipe-image"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                accept={ACCEPTED_IMAGE_TYPES.join(
                                                    ',',
                                                )}
                                                className="hidden"
                                            />
                                            <div
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                                className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors hover:border-gray-400 ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}`}
                                                role="button"
                                                tabIndex={0}
                                                aria-label="Upload recipe image"
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <svg
                                                        className="h-8 w-8 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {existingImageUrl &&
                                                            !previewFile
                                                                ? 'Click to change image'
                                                                : 'Click to upload or drag and drop'}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            PNG, JPG, WEBP up to
                                                            5MB
                                                        </p>
                                                        {existingImageUrl &&
                                                            !isImageChanged && (
                                                                <p className="mt-1 text-xs text-green-600">
                                                                    Current
                                                                    image will
                                                                    be preserved
                                                                </p>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                            <ImagePreview
                                                file={previewFile}
                                                existingImageUrl={
                                                    existingImageUrl
                                                }
                                                onRemove={handleRemoveImage}
                                                isEditMode={true}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </>
                                    )}
                                />
                            </Field>
                        </FieldGroup>
                    </div>

                    {/* Ingredients Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                Ingredients
                            </h3>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    appendIngredient({
                                        title: '',
                                        short_description: '',
                                    })
                                }
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Ingredient
                            </Button>
                        </div>

                        {ingredientFields.map((field, index) => (
                            <div
                                key={field.id}
                                className="space-y-4 rounded-lg border p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">
                                        Ingredient #{index + 1}
                                        {field.id && (
                                            <span className="ml-2 text-xs text-gray-500">
                                                (ID: {field.id})
                                            </span>
                                        )}
                                    </span>
                                    {ingredientFields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                removeIngredient(index)
                                            }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                                <FieldGroup>
                                    <Controller
                                        name={`ingredients.${index}.title`}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>
                                                    Ingredient Name
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    placeholder="e.g., Garlic, Olive Oil..."
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                <FieldGroup>
                                    <Controller
                                        name={`ingredients.${index}.short_description`}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>
                                                    Notes (Optional)
                                                </FieldLabel>
                                                <Textarea
                                                    {...field}
                                                    placeholder="e.g., finely chopped, extra virgin..."
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    className="min-h-[80px]"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </div>
                        ))}

                        {errors.ingredients && (
                            <FieldError errors={[errors.ingredients]} />
                        )}
                    </div>

                    {/* Directions Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                Directions
                            </h3>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    appendDirection({
                                        title: '',
                                        short_description: '',
                                    })
                                }
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Step
                            </Button>
                        </div>

                        {directionFields.map((field, index) => (
                            <div
                                key={field.id}
                                className="space-y-4 rounded-lg border p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            {index + 1}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            Step #{index + 1}
                                            {field.id && (
                                                <span className="ml-2 text-xs text-gray-500">
                                                    (ID: {field.id})
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    {directionFields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                removeDirection(index)
                                            }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                                <FieldGroup>
                                    <Controller
                                        name={`directions.${index}.title`}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>
                                                    Step Title (Optional)
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    placeholder="e.g., Prep the sauce..."
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                <FieldGroup>
                                    <Controller
                                        name={`directions.${index}.short_description`}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>
                                                    Instructions
                                                </FieldLabel>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Describe this step in detail..."
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    className="min-h-[100px]"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </div>
                        ))}

                        {errors.directions && (
                            <FieldError errors={[errors.directions]} />
                        )}
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <div className="flex w-full justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        disabled={!isDirty}
                        aria-label="Reset form to original values"
                    >
                        Reset Changes
                    </Button>
                    <Button
                        type="submit"
                        form="edit-recipe-form"
                        disabled={!isDirty || Object.keys(errors).length > 0}
                        aria-label="Update recipe"
                    >
                        Update Recipe
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
