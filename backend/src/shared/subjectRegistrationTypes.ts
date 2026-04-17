export type SubjectRegistrationType = {
  _id: string,
  user: string; // user ObjectId reference
  term: "First Term" | "Second Term" | "Third Term";
  childClass:
    | "Primary 1"
    | "Primary 2"
    | "Primary 3"
    | "Primary 4"
    | "Primary 5"
    | "Primary 6";
  subjects: string[]; 
  createdAt?: Date;
  updatedAt?: Date;
};
