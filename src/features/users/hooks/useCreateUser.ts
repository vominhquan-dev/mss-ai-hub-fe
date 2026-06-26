import { useState } from "react";
import type { User } from "../types/user";

interface UseCreateUserReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  createUser: (user: Omit<User, "lastActive" | "status">) => void;
}

export function useCreateUser(): UseCreateUserReturn {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    createUser: (user) => {
      // TODO: integrate with API
      console.log("Create user:", user);
      setIsOpen(false);
    },
  };
}
