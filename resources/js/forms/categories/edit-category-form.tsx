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
import { Category } from '@/types/Category';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    ACCEPTED_IMAGE_TYPES,
    editFormSchema as formSchema,
} from './form-schema';
import { EditImagePreview } from './image-preview';

type FormValuesType = z.infer<typeof formSchema>;

interface EditCategoryFormProps {
    category: Category;
    onSuccess?: () => void;
}

export default function EditCategoryForm({
    category,
    onSuccess,
}: EditCategoryFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewFile, setPreviewFile] = useState<File | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(
        category.image_url || null,
    );

    const {
        control,
        reset,
        handleSubmit,
        setValue,
        watch,
        formState: { isDirty },
    } = useForm<FormValuesType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: category.title || '',
            color: category.color || '#3b82f6',
            image: category.image_url || undefined,
        },
    });

    const imageFile = watch('image');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue('image', file, { shouldValidate: true });
            setPreviewFile(file);
            setExistingImageUrl(null);
        }
    };

    // Handle file removal
    const handleRemoveImage = () => {
        setValue('image', null, { shouldValidate: true });
        setPreviewFile(null);
        setExistingImageUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle form submission
    const onSubmit = async (data: FormValuesType) => {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('color', data.color);
        formData.append('_method', 'PUT');

        if (data.image instanceof File) {
            formData.append('image', data.image);
        } else if (data.image === null) {
            formData.append('remove_image', 'true');
        }

        router.post(`/categories/${category.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            preserveScroll: true,
            onSuccess: () => {
                console.log('Category updated successfully');
                if (onSuccess) onSuccess();

                reset({
                    title: data.title,
                    color: data.color,
                    image: data.image,
                });

                if (data.image instanceof File) {
                    setExistingImageUrl(URL.createObjectURL(data.image));
                } else if (data.image === null) {
                    setExistingImageUrl(null);
                }
            },
            onError: (errors) => {
                console.log('Error updating category:', errors);
            },
        });
    };

    const resetForm = () => {
        reset({
            title: category.title || '',
            color: category.color || '#3b82f6',
            image: category.image_url || undefined,
        });
        setPreviewFile(null);
        setExistingImageUrl(category.image_url || null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const isImageChanged = imageFile !== (category.image_url || undefined);

    return (
        <Card className="mx-auto my-4 w-full max-w-3xl shadow-none">
            <CardHeader>
                <CardTitle>Edit Category</CardTitle>
                <p className="text-sm text-gray-500">
                    Editing: {category.title}
                </p>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    id="edit-category-form"
                    className="space-y-6"
                >
                    {/* Title Field */}
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="category-title">
                                        Category Title
                                    </FieldLabel>
                                    <Input
                                        type="text"
                                        id="category-title"
                                        aria-invalid={fieldState.invalid}
                                        aria-describedby={
                                            fieldState.error
                                                ? 'title-error'
                                                : undefined
                                        }
                                        {...field}
                                        placeholder="Fish, Pizza, Desserts..."
                                        className="w-full"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            id="title-error"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    {/* Color Field */}
                    <FieldGroup>
                        <Controller
                            name="color"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="category-color">
                                        Category Color
                                    </FieldLabel>
                                    <div className="flex items-center gap-3">
                                        <Input
                                            type="color"
                                            id="category-color"
                                            aria-invalid={fieldState.invalid}
                                            aria-describedby={
                                                fieldState.error
                                                    ? 'color-error'
                                                    : undefined
                                            }
                                            {...field}
                                            className="h-10 w-20 cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-600">
                                            {field.value}
                                        </span>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError
                                            id="color-error"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    {/* Image Upload Field */}
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="category-image">
                                Category Image (Optional)
                            </FieldLabel>
                            <Controller
                                name="image"
                                control={control}
                                render={({ fieldState }) => (
                                    <>
                                        {/* Hidden file input for actual file handling */}
                                        <input
                                            type="file"
                                            id="category-image"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept={ACCEPTED_IMAGE_TYPES.join(
                                                ',',
                                            )}
                                            className="hidden"
                                            aria-describedby={
                                                fieldState.error
                                                    ? 'image-error'
                                                    : undefined
                                            }
                                        />

                                        {/* Custom file upload area */}
                                        <div
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors hover:border-gray-400 ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'} `}
                                            role="button"
                                            tabIndex={0}
                                            aria-label="Upload category image"
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'Enter' ||
                                                    e.key === ' '
                                                ) {
                                                    fileInputRef.current?.click();
                                                }
                                            }}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <svg
                                                    className="h-8 w-8 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <div className="text-center">
                                                    <p className="text-sm font-medium">
                                                        {existingImageUrl &&
                                                        !previewFile
                                                            ? 'Click to change image'
                                                            : 'Click to upload or drag and drop'}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        PNG, JPG, WEBP up to 5MB
                                                    </p>
                                                    {existingImageUrl &&
                                                        !isImageChanged && (
                                                            <p className="mt-1 text-xs text-green-600">
                                                                Current image
                                                                will be
                                                                preserved
                                                            </p>
                                                        )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Image preview */}
                                        <EditImagePreview
                                            file={previewFile}
                                            existingImageUrl={existingImageUrl}
                                            onRemove={handleRemoveImage}
                                        />

                                        {/* Error message */}
                                        {fieldState.invalid && (
                                            <FieldError
                                                id="image-error"
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </>
                                )}
                            />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>

            {/* Form Actions */}
            <CardFooter>
                <div className="flex w-full justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        disabled={!isDirty && !isImageChanged}
                        aria-label="Reset form to original values"
                    >
                        Reset Changes
                    </Button>
                    <Button
                        type="submit"
                        form="edit-category-form"
                        disabled={!isDirty && !isImageChanged}
                        aria-label="Update category"
                    >
                        Update Category
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
