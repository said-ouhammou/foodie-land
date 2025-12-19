import z from 'zod';

// Constants for file validation
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

// Validation schema
const ingredientSchema = z.object({
    title: z.string().min(1, 'Ingredient name is ').max(100),
    short_description: z.string().optional(),
});

const directionSchema = z.object({
    title: z.string().min(1, 'Direction title is ').max(100),
    short_description: z.string().min(1, 'Instructions are ').max(500),
});

export const createFormSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be at most 100 characters'),
    short_description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must be at most 500 characters'),
    image: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: 'Image size must be less than 5MB',
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: 'Only .jpg, .jpeg, .png and .webp formats are supported',
        })
        .optional()
        .or(z.literal('')),
    category_id: z.string().min(1, 'Please select a category'),
    prep_time: z
        .string()
        .regex(/^[0-9]+$/, 'Prep time must be a number')
        .transform(Number)
        .refine((num) => num >= 0, 'Prep time cannot be negative'),
    cook_time: z
        .string()
        .regex(/^[0-9]+$/, 'Cook time must be a number')
        .transform(Number)
        .refine((num) => num >= 0, 'Cook time cannot be negative'),
    ingredients: z
        .array(ingredientSchema)
        .min(1, 'Add at least one ingredient'),
    directions: z
        .array(directionSchema)
        .min(1, 'Add at least one direction step'),
});

// ---------------------------

export const editFormSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be at most 100 characters'),
    short_description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must be at most 500 characters'),
    image: z
        .union([
            z.instanceof(File),
            z.string(), // For existing image URLs
            z.null(),
        ])
        .refine(
            (value) => {
                if (!value || typeof value === 'string' || value === null)
                    return true;
                if (value instanceof File) {
                    return value.size <= MAX_FILE_SIZE;
                }
                return false;
            },
            {
                message: 'Image size must be less than 5MB',
            },
        )
        .refine(
            (value) => {
                if (!value || typeof value === 'string' || value === null)
                    return true;
                if (value instanceof File) {
                    return ACCEPTED_IMAGE_TYPES.includes(value.type);
                }
                return false;
            },
            {
                message:
                    'Only .jpg, .jpeg, .png and .webp formats are supported',
            },
        )
        .optional()
        .or(z.literal('')),
    category_id: z.string().min(1, 'Please select a category'),
    prep_time: z
        .string()
        .regex(/^[0-9]+$/, 'Prep time must be a number')
        .transform(Number)
        .refine((num) => num >= 0, 'Prep time cannot be negative'),
    cook_time: z
        .string()
        .regex(/^[0-9]+$/, 'Cook time must be a number')
        .transform(Number)
        .refine((num) => num >= 0, 'Cook time cannot be negative'),
    ingredients: z
        .array(ingredientSchema)
        .min(1, 'Add at least one ingredient'),
    directions: z
        .array(directionSchema)
        .min(1, 'Add at least one direction step'),
    remove_image: z.boolean().optional(),
});
