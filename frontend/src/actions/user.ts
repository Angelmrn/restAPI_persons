import { z } from "zod";
import { updateUser, registerUser } from "../api/users";

const UserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
});

type UserFormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
      };
      message?: string;
      formData: {
        username: string;
        email: string;
      };
    }
  | undefined;

export async function register(
  state: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const rawFormData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
  };

  const validatedFields = UserSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData: {
        username: rawFormData.username,
        email: rawFormData.email,
      },
    };
  }
  try {
    await registerUser(
      validatedFields.data.username,
      validatedFields.data.email,
    );

    return {
      message:
        "Registration successful! Please check your email to verify your account.",
      formData: {
        username: rawFormData.username,
        email: rawFormData.email,
      },
    };
  } catch (error) {
    return {
      message: "An error occurred during registration. Please try again later.",
      formData: {
        username: rawFormData.username,
        email: rawFormData.email,
      },
      errors: {
        email: ["Email already registered."],
      },
    };
  }
}

export async function UpdateUser(
  userId: number,
  state: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const rawFormData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
  };

  const validatedFields = UserSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData: {
        username: rawFormData.username,
        email: rawFormData.email,
      },
    };
  }
  try {
    const response = await updateUser(userId, validatedFields.data);
    return {
      message: "User updated successfully",
      formData: {
        username: response.username,
        email: response.email,
      },
    };
  } catch (err) {
    return {
      message: (err as Error).message,
      formData: {
        username: rawFormData.username,
        email: rawFormData.email,
      },
    };
  }
}
