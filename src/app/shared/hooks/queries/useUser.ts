import { useQuery } from '@tanstack/react-query';
import api from '@app/shared/services/api';
import e from '@app/shared/constants/endpoints';

async function fetchUsers() {
  const data = await api.get(e.USERS);
  return data;
}

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export { useUsers, fetchUsers };
