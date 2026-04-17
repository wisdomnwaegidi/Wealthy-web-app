import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

interface LogOutButtonProps {
  color: string;
  fontBold?: string;
}

const LogOutButton: React.FC<LogOutButtonProps> = ({ color, fontBold }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate(`/login`);
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      type='button'
      className={`${color} ${fontBold}`}
      onClick={handleClick}
    >
      Logout
    </button>
  );
};

export default LogOutButton;
