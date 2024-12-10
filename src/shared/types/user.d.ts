declare type SignUpFormProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

declare type LoginFormProps = {
  email: string;
  password: string;
};

declare type UserProps = {
  name: string;
  isAdmin?: boolean;
  uid?: string;
};
