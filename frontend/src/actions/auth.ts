import { z } from "zod";
const API_URL = import.meta.env.VITE_API_URL;

const RegisterSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
});

type RegisterFormState =
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
  state: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const rawFormData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
  };

  const validatedFields = RegisterSchema.safeParse(rawFormData);
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
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: rawFormData.username,
        email: rawFormData.email,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      let errorMessage = "Registration failed";

      if (data?.non_field_errors && Array.isArray(data.non_field_errors)) {
        errorMessage = data.non_field_errors[0];
      } else if (data?.email && Array.isArray(data.email)) {
        errorMessage = data.email[0];
      } else if (data?.username && Array.isArray(data.username)) {
        errorMessage = data.username[0];
      } else if (data?.error) {
        errorMessage = data.error;
      }

      return {
        message: errorMessage,
        errors: data?.details || {},
        formData: {
          username: rawFormData.username,
          email: rawFormData.email,
        },
      };
    }

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
    };
  }
}
