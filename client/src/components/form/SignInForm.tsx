'use client';

import Link from 'next/link';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from "@/components/ui/use-toast"

import GoogleSignInButton from '../GoogleSignInButton';
import { signInFormSchema } from '../../schema/zod';
import axios from 'axios';

const SignInForm = () => {
  
  const {toast} = useToast()

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: 'naveedalirehmani123@gmail.com',
      password: 'passpass',
    },
  });

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:4000/v1/authentication/local/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      toast({
        variant:'success',
        description: "Signed in Success!",
      })
      console.log(response, "signupResponse");
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.response.data,
      })
      console.log(error, "signupResponseError");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage className='mt-2'/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='mt-2'/>
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6 dark:bg-slate-100' type='submit'>
          Sign in
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
