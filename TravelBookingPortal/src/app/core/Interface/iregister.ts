export interface IRegister {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
  image: string;
  phoneNumber: string;
  state: string;
  city: string;
  dateOfBirth: string; // ISO 8601 format (e.g., "2025-04-08T00:35:32.308Z")
  street: string;
  createdAt: string; // ISO 8601 format (e.g., "2025-04-08T00:35:32.308Z")
}
