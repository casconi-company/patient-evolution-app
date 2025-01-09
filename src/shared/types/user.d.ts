declare type SignUpFormProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
};

declare type LoginFormProps = {
  email: string;
  password: string;
};

declare type UserProps = {
  name: string;
  email?: string;
  isAdmin?: boolean | string;
  uid?: string;
};
