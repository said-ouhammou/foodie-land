// import z from 'zod';

// // Constants for file validation
// export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// export const ACCEPTED_IMAGE_TYPES = [
//     'image/jpeg',
//     'image/jpg',
//     'image/png',
//     'image/webp',
// ];

// // Validation schema
// const ingredientSchema = z.object({
//     title: z.string().min(1, 'Ingredient name is required').max(100),
//     short_description: z.string().optional(),
// });

// const directionSchema = z.object({
//     title: z.string().min(1, 'Direction title is required').max(100),
//     short_description: z.string().min(1, 'Instructions are required').max(500),
// });

// // Nutritional info schema
// const nutritionalInfoSchema = z.object({
//     calories: z
//         .string()
//         .regex(/^[0-9]+$/, 'Calories must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Calories cannot be negative')
//         .optional(),
//     total_fats: z
//         .string()
//         .regex(/^[0-9]+$/, 'Total fats must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Total fats cannot be negative')
//         .optional(),
//     proteins: z
//         .string()
//         .regex(/^[0-9]+$/, 'Proteins must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Proteins cannot be negative')
//         .optional(),
//     carbs: z
//         .string()
//         .regex(/^[0-9]+$/, 'Carbs must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Carbs cannot be negative')
//         .optional(),
//     cholesterol: z
//         .string()
//         .regex(/^[0-9]+$/, 'Cholesterol must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Cholesterol cannot be negative')
//         .optional(),
// });

// export const createFormSchema = z.object({
//     title: z
//         .string()
//         .min(3, 'Title must be at least 3 characters')
//         .max(100, 'Title must be at most 100 characters'),
//     short_description: z
//         .string()
//         .min(10, 'Description must be at least 10 characters')
//         .max(500, 'Description must be at most 500 characters'),
//     image: z
//         .instanceof(File)
//         .refine((file) => file.size <= MAX_FILE_SIZE, {
//             message: 'Image size must be less than 5MB',
//         })
//         .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
//             message: 'Only .jpg, .jpeg, .png and .webp formats are supported',
//         })
//         .optional()
//         .or(z.literal('')),
//     category_id: z.string().min(1, 'Please select a category'),
//     prep_time: z
//         .string()
//         .regex(/^[0-9]+$/, 'Prep time must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Prep time cannot be negative'),
//     cook_time: z
//         .string()
//         .regex(/^[0-9]+$/, 'Cook time must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Cook time cannot be negative'),
//     ingredients: z
//         .array(ingredientSchema)
//         .min(1, 'Add at least one ingredient'),
//     directions: z
//         .array(directionSchema)
//         .min(1, 'Add at least one direction step'),
//     // Add nutritional info
//     calories: z
//         .string()
//         .regex(/^[0-9]+$/, 'Calories must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Calories cannot be negative')
//         .optional()
//         .or(z.literal('')),
//     total_fats: z
//         .string()
//         .regex(/^[0-9]+$/, 'Total fats must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Total fats cannot be negative')
//         .optional()
//         .or(z.literal('')),
//     proteins: z
//         .string()
//         .regex(/^[0-9]+$/, 'Proteins must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Proteins cannot be negative')
//         .optional()
//         .or(z.literal('')),
//     carbs: z
//         .string()
//         .regex(/^[0-9]+$/, 'Carbs must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Carbs cannot be negative')
//         .optional()
//         .or(z.literal('')),
//     cholesterol: z
//         .string()
//         .regex(/^[0-9]+$/, 'Cholesterol must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Cholesterol cannot be negative')
//         .optional()
//         .or(z.literal('')),
// });

// export const editFormSchema = z.object({
//     title: z
//         .string()
//         .min(3, 'Title must be at least 3 characters')
//         .max(100, 'Title must be at most 100 characters'),
//     short_description: z
//         .string()
//         .min(10, 'Description must be at least 10 characters')
//         .max(500, 'Description must be at most 500 characters'),
//     image: z
//         .union([z.instanceof(File), z.string(), z.null()])
//         .refine(
//             (value) => {
//                 if (!value || typeof value === 'string' || value === null)
//                     return true;
//                 if (value instanceof File) {
//                     return value.size <= MAX_FILE_SIZE;
//                 }
//                 return false;
//             },
//             {
//                 message: 'Image size must be less than 5MB',
//             },
//         )
//         .refine(
//             (value) => {
//                 if (!value || typeof value === 'string' || value === null)
//                     return true;
//                 if (value instanceof File) {
//                     return ACCEPTED_IMAGE_TYPES.includes(value.type);
//                 }
//                 return false;
//             },
//             {
//                 message:
//                     'Only .jpg, .jpeg, .png and .webp formats are supported',
//             },
//         )
//         .optional()
//         .or(z.literal('')),
//     category_id: z.string().min(1, 'Please select a category'),
//     prep_time: z
//         .string()
//         .regex(/^[0-9]+$/, 'Prep time must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Prep time cannot be negative'),
//     cook_time: z
//         .string()
//         .regex(/^[0-9]+$/, 'Cook time must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Cook time cannot be negative'),
//     ingredients: z
//         .array(ingredientSchema)
//         .min(1, 'Add at least one ingredient'),
//     directions: z
//         .array(directionSchema)
//         .min(1, 'Add at least one direction step'),
//     remove_image: z.boolean().optional(),
//     // Add nutritional info for edit
//     calories: z
//         .string()
//         .regex(/^[0-9]+$/, 'Calories must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Calories cannot be negative')
//         .optional()
//         .or(z.literal('')),
//     total_fats: z
//         .string()
//         .regex(/^[0-9]+$/, 'Total fats must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Total fats cannot be negative')
//         .optional()
//         .or(z.literal('')),
//     proteins: z
//         .string()
//         .regex(/^[0-9]+$/, 'Proteins must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Proteins cannot be negative')
//         .optional()
//         .or(z.literal('')),
//     carbs: z
//         .string()
//         .regex(/^[0-9]+$/, 'Carbs must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Carbs cannot be negative')
//         .optional()
//         .or(z.literal('')),
//     cholesterol: z
//         .string()
//         .regex(/^[0-9]+$/, 'Cholesterol must be a number')
//         .transform(Number)
//         .refine((num) => num >= 0, 'Cholesterol cannot be negative')
//         .optional()
//         .or(z.literal('')),
// });

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
    title: z.string().min(1, 'Ingredient name is required').max(100),
    short_description: z.string().optional(),
});

const directionSchema = z.object({
    title: z.string().min(1, 'Direction title is required').max(100),
    short_description: z.string().min(1, 'Instructions are required').max(500),
});

// Helper function to handle both string and number input for time fields
const timeFieldSchema = z
    .union([
        z.string(), // Accept string input
        z.number(), // Accept number input
        z.literal(''), // Accept empty string
        z.null(), // Accept null
        z.undefined(), // Accept undefined
    ])
    .transform((value) => {
        // Convert to number
        if (value === '' || value === null || value === undefined) {
            return 0;
        }
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    })
    .refine((num) => num >= 0, {
        message: 'Time cannot be negative',
    });

// Helper function to handle both string and number input for nutritional fields
const nutritionalFieldSchema = z
    .union([
        z.string(), // Accept string input
        z.number(), // Accept number input
        z.literal(''), // Accept empty string
        z.null(), // Accept null
        z.undefined(), // Accept undefined
    ])
    .transform((value) => {
        // Convert to number or null
        if (value === '' || value === null || value === undefined) {
            return null;
        }
        const num = Number(value);
        return isNaN(num) ? null : num;
    })
    .refine((num) => num === null || num >= 0, {
        message: 'Value cannot be negative',
    })
    .optional()
    .default(null);

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
    prep_time: timeFieldSchema,
    cook_time: timeFieldSchema,
    ingredients: z
        .array(ingredientSchema)
        .min(1, 'Add at least one ingredient'),
    directions: z
        .array(directionSchema)
        .min(1, 'Add at least one direction step'),
    // Add nutritional info - accept both string and number
    calories: nutritionalFieldSchema,
    total_fats: nutritionalFieldSchema,
    proteins: nutritionalFieldSchema,
    carbs: nutritionalFieldSchema,
    cholesterol: nutritionalFieldSchema,
});

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
        .union([z.instanceof(File), z.string(), z.null()])
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
    prep_time: timeFieldSchema,
    cook_time: timeFieldSchema,
    ingredients: z
        .array(ingredientSchema)
        .min(1, 'Add at least one ingredient'),
    directions: z
        .array(directionSchema)
        .min(1, 'Add at least one direction step'),
    remove_image: z.boolean().optional(),
    // Add nutritional info for edit - accept both string and number
    calories: nutritionalFieldSchema,
    total_fats: nutritionalFieldSchema,
    proteins: nutritionalFieldSchema,
    carbs: nutritionalFieldSchema,
    cholesterol: nutritionalFieldSchema,
});

// Optional: Type inference for TypeScript
export type CreateRecipeFormData = z.infer<typeof createFormSchema>;
export type EditRecipeFormData = z.infer<typeof editFormSchema>;
