declare type SignUpFormProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
};

declare type EditUserProps = {
  name: string;
  isAdmin: boolean;
};

declare type LoginFormProps = {
  email: string;
  password: string;
};

declare type UserProps = {
  name: string;
  email?: string;
  isAdmin?: boolean;
  uid?: string;
};

declare type UserTableProps = {
  name: string;
  email: string;
  isAdmin: string;
  uid: string;
  actions: JSX.Element;
};
