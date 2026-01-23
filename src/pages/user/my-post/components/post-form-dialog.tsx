import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2 } from "lucide-react";
import type { Post, CreatePostInput } from "@/types/post.type";
import { uploadFileToCloudinary } from "@/config/cloudinary";

interface PostFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: Post;
  onSubmit: (data: CreatePostInput, isDraft: boolean) => Promise<void>;
}

const topics = [
  "Technology",
  "Lifestyle",
  "Travel",
  "Food",
  "Health",
  "Business",
  "Education",
  "Entertainment",
  "Sports",
  "Other",
];

export function PostFormDialog({
  open,
  onOpenChange,
  post,
  onSubmit,
}: PostFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!post;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreatePostInput>({
    defaultValues: {
      title: "",
      description: "",
      topic: "Technology",
      imageUrl: "",
      status: "DRAFT",
    },
  });

  const selectedTopic = watch("topic");

  useEffect(() => {
    if (post) {
      const formStatus: "DRAFT" | "PENDING" =
        post.status === "APPROVED" || post.status === "REJECTED"
          ? "PENDING"
          : post.status;

      reset({
        title: post.title,
        description: post.description,
        topic: post.topic,
        imageUrl: post.imageUrl || "",
        status: formStatus,
      });
    } else {
      reset({
        title: "",
        description: "",
        topic: "Technology",
        imageUrl: "",
        status: "DRAFT",
      });
    }
  }, [post, reset]);

  const handleFormSubmit = async (data: CreatePostInput, isDraft: boolean) => {
    setIsSubmitting(true);
    try {
      await onSubmit(
        {
          ...data,
          status: isDraft ? "DRAFT" : "PENDING",
        },
        isDraft,
      );
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Post" : "Create New Post"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Make changes to your post here."
              : "Fill in the details to create a new post."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              id="title"
              placeholder="Enter post title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 10,
                  message: "Title must be at least 10 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title must not exceed 100 characters",
                },
              })}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="description"
              placeholder="Write a brief description of your post"
              rows={5}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 50,
                  message: "Description must be at least 50 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Description must not exceed 500 characters",
                },
              })}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium">
              Topic <span className="text-destructive">*</span>
            </label>
            <Select
              value={selectedTopic}
              onValueChange={(value) => setValue("topic", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="imageUrl" className="text-sm font-medium">
              Cover Image URL (Optional)
            </label>
            <Input
              id="imageUrl"
              placeholder="https://example.com/image.jpg or https://picsum.photos/..."
              {...register("imageUrl", {
                validate: (value) => {
                  if (!value || value.trim() === "") return true;

                  // Check if it's a valid URL
                  try {
                    new URL(value);
                  } catch {
                    return "Please enter a valid URL";
                  }

                  // Check if URL starts with http/https
                  if (!/^https?:\/\//i.test(value)) {
                    return "URL must start with http:// or https://";
                  }

                  // Accept common image services and extensions
                  const isImageService =
                    /picsum\.photos|unsplash\.com|imgur\.com|cloudinary\.com/i.test(
                      value,
                    );
                  const hasImageExtension =
                    /\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(value);

                  if (!isImageService && !hasImageExtension) {
                    return "URL should be from an image service or end with image extension";
                  }

                  return true;
                },
              })}
              className={errors.imageUrl ? "border-destructive" : ""}
            />
            {errors.imageUrl && (
              <p className="text-sm text-destructive">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image Upload</label>
            <ImageUpload
              value={watch("imageUrl")}
              onChange={(url) => setValue("imageUrl", url)}
              onUpload={uploadFileToCloudinary}
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              Or enter image URL manually above
            </p>
          </div>
        </form>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit((data) => handleFormSubmit(data, true))}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save as Draft
          </Button>
          <Button
            type="button"
            onClick={handleSubmit((data) => handleFormSubmit(data, false))}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isEditMode ? "Update Post" : "Submit for Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
