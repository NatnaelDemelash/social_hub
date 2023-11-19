import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Loader from "@/components/shared/Loader";

import { Input } from "@/components/ui/input";
import { SignupFormValidation } from "@/lib/validation";
import { z } from "zod";
import { createUserAccount } from "@/lib/appwrite/api";

const signupForm = () => {
  const isLoading = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupFormValidation>>({
    resolver: zodResolver(SignupFormValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupFormValidation>) {
    // Create a user
    const newUser = await createUserAccount(values);
    console.log(newUser);
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="./assets/images/logo.png" alt="logo" width={50} />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-4">
          Create a new Account
        </h2>
        <p className="text-light-4 small-medium md:base-regular mt-2">
          To use SocialHub please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Username"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your paswword"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4">
            {isLoading ? <Loader /> : "Sign up"}
          </Button>
          <p className="text-small-regular mt-4 text-light-3 text-center">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 font-bold">
              {" "}
              LogIn
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default signupForm;
