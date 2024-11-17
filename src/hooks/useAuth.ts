// useAuth.ts
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEYS } from "src/constants/storage";

interface UserRole {
  id: number;
  name: string;
  label: string;
  guard_name: string;
  access: string;
  agent_company_id: number;
  permissions: Array<{
    id: number;
    name: string;
    label: string;
    group_name: string;
    guard_name: string;
    access: string;
  }>;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  agent_company_id: number;
  shipping_mark: string;
  roles: UserRole[];
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem(LOCAL_STORAGE_KEYS.AGENT_USER);
    if (userData) {
      setUser(JSON.parse(userData));
      // set permissions
      const userRoles = JSON.parse(userData).roles;
      const userPermissions = userRoles.reduce(
        (acc: string[], role: UserRole) => {
          return acc.concat(
            role.permissions.map((permission) => permission.name),
          );
        },
        [],
      );



      setPermissions(userPermissions);
    }
    setLoading(false);
  }, []);




  return { user, permissions, loading };
};

export default useAuth;
