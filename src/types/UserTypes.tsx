export type UserType = {
  name: string;
  _id: string;
  number: string;
  email: string;
  balance: number;
  verified: boolean;
  parents: string[];
  transactions: any[];
  children: {
    level1: string[];
    level2: string[];
    level3: string[];
    level4: string[];
    level5: string[];
  };
};
