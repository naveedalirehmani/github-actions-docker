import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className='bg-slate-100 dark:bg-slate-900 p-10 rounded-md'>{children}</div>;
};

export default AuthLayout;
