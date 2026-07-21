export interface User {
  _id: string;
  fullname: string;
  email: string;
  contact: number;
  city: string;
  country: string;
  profilePicture: string;
  isAdmin: boolean;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpiresAt: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}
