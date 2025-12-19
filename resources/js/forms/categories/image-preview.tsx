import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

// Type definitions
export interface ImagePreviewBaseProps {
    onRemove: () => void;
}

export interface CreateModeProps extends ImagePreviewBaseProps {
    mode: 'create';
    file: File | null;
}

export interface EditModeProps extends ImagePreviewBaseProps {
    mode: 'edit';
    file?: File | null;
    existingImageUrl?: string | null;
}

// Union type for props
export type ImagePreviewProps = CreateModeProps | EditModeProps;

export const ImagePreview = (props: ImagePreviewProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Determine if we're in create mode
    const isCreateMode = props.mode === 'create';

    // Extract file and existingImageUrl based on mode
    const file = isCreateMode ? props.file : props.file;
    const existingImageUrl = !isCreateMode ? props.existingImageUrl : null;

    // Handle preview URL updates
    useEffect(() => {
        let objectUrl: string | null = null;

        if (file instanceof File) {
            objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        } else if (existingImageUrl) {
            setPreviewUrl(existingImageUrl);
        } else {
            setPreviewUrl(null);
        }

        // Cleanup function
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [file, existingImageUrl]);

    // If no preview URL, don't render anything
    if (!previewUrl) return null;

    // Helper function to get display text
    const getDisplayInfo = () => {
        if (isCreateMode && props.file) {
            return {
                name: props.file.name,
                size: `Size: ${(props.file.size / 1024).toFixed(2)} KB`,
                description: 'New image to upload',
            };
        } else {
            if (file instanceof File) {
                return {
                    name: file.name,
                    size: `Size: ${(file.size / 1024).toFixed(2)} KB`,
                    description: 'New image to upload',
                };
            } else if (existingImageUrl) {
                return {
                    name: 'Existing image',
                    size: '',
                    description: 'Current category image',
                };
            }
        }
        return {
            name: '',
            size: '',
            description: '',
        };
    };

    const displayInfo = getDisplayInfo();

    return (
        <div className="relative mt-4 animate-in duration-300 fade-in">
            <div className="flex items-center gap-4 rounded-lg border bg-gray-50 p-3">
                {/* Image */}
                <div className="relative">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-20 w-20 rounded-lg border object-cover"
                        onError={() => {
                            console.error('Failed to load image');
                            setPreviewUrl(null);
                        }}
                    />
                    {/* Badge indicating mode */}
                    <div className="absolute -top-2 -right-2">
                        <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${isCreateMode ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'} `}
                        >
                            {isCreateMode ? 'New' : 'Existing'}
                        </span>
                    </div>
                </div>

                {/* File info */}
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                        {displayInfo.name}
                    </p>
                    {displayInfo.size && (
                        <p className="text-sm text-gray-500">
                            {displayInfo.size}
                        </p>
                    )}
                    <p className="mt-1 text-xs text-gray-400">
                        {displayInfo.description}
                    </p>
                </div>

                {/* Remove button */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={props.onRemove}
                    aria-label="Remove image"
                    className="text-gray-500 hover:bg-red-50 hover:text-red-600"
                >
                    Remove
                </Button>
            </div>
        </div>
    );
};

// Convenience components for specific modes
export const CreateImagePreview = ({
    file,
    onRemove,
}: {
    file: File | null;
    onRemove: () => void;
}) => <ImagePreview mode="create" file={file} onRemove={onRemove} />;

export const EditImagePreview = ({
    file,
    existingImageUrl,
    onRemove,
}: {
    file?: File | null;
    existingImageUrl?: string | null;
    onRemove: () => void;
}) => (
    <ImagePreview
        mode="edit"
        file={file}
        existingImageUrl={existingImageUrl}
        onRemove={onRemove}
    />
);

// Helper hook for managing preview state
export const useImagePreview = (
    initialFile?: File | null,
    initialUrl?: string | null,
) => {
    const [file, setFile] = useState<File | null>(initialFile || null);
    const [existingUrl, setExistingUrl] = useState<string | null>(
        initialUrl || null,
    );

    const handleFileChange = (newFile: File | null) => {
        setFile(newFile);
        if (newFile) {
            // Clear existing URL when a new file is selected
            setExistingUrl(null);
        }
    };

    const handleRemove = () => {
        setFile(null);
        // In edit mode, we might want to keep the existing URL for reference
        // but mark it as to be removed
    };

    const handleClear = () => {
        setFile(null);
        setExistingUrl(null);
    };

    return {
        file,
        existingUrl,
        setFile: handleFileChange,
        removeFile: handleRemove,
        clearAll: handleClear,
        setExistingUrl,
        hasImage: !!(file || existingUrl),
        isNewFile: !!file,
    };
};
