export type Category =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "Test";

export type Status = "To do" | "In progress" | "Done";

export type Priority = "Low" | "Medium" | "Hight";

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: Category;
  status: Status;
  priority: Priority;
};
