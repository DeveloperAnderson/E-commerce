export interface User {
    username: string;
    password: string;
    email: string;
    locked: boolean;
    disabled: boolean;
    roles: string[];
  }
  