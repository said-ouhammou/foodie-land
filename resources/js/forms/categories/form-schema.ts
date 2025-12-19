import z from 'zod';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

export const createFormSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title must be at most 50 characters'),
    color: z.string(),
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
});

export const editFormSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title must be at most 50 characters'),
    color: z.string(),
    image: z
        .union([
            z.instanceof(File),
            z.string(), // For existing image URLs
            z.null(),
        ])
        .refine(
            (value) => {
                if (!value || typeof value === 'string') return true;
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
                if (!value || typeof value === 'string') return true;
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
});
