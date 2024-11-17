import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS } from "src/constants/storage";
import useNotification from "src/hooks/use-notification";
import { useGetLoginUserPermissionsAndSetLocalStorage } from "src/lib/core-react/hooks/private/useAcl";
import { getAgentCompanyId } from "src/utils/get-agent-company-id";

export enum ClearCacheActionsEnum {
  REFETCH_PERMISSION = "REFETCH_PERMISSION",
  AGENT_STORE_REMOVE = "agent_store_remove",
}

const useClearCache = () => {
  const [isCacheClear, setIsCacheClear] = useState(false);
  const notification = useNotification();
  const navigate = useNavigate();

  const { handleGetAndSetUserPermissions } =
    useGetLoginUserPermissionsAndSetLocalStorage();

  const onClearCache = async (actions?: ClearCacheActionsEnum) => {
    try {
      setIsCacheClear(true);
      if (actions === ClearCacheActionsEnum.REFETCH_PERMISSION) {
        if (
          window.location.pathname.includes("dashboard/agent/semi-fulfilment")
        ) {
          setIsCacheClear(true);
          localStorage.removeItem(LOCAL_STORAGE_KEYS.STORE_ACCOUNT_ID);
          notification("success", "Successfully Clear the cache", "success");
          setTimeout(() => {
            setIsCacheClear(false);
          }, 1000);
        }
        setIsCacheClear(true);
        const data = await handleGetAndSetUserPermissions(
          Number(getAgentCompanyId()),
        );

        if (data) {
          if (
            !window.location.pathname.includes(
              "dashboard/agent/semi-fulfilment",
            )
          ) {
            notification(
              "Success",
              "Successfully cleared the cache",
              "success",
            );
            navigate("/dashboard/home");
            window.location.reload();
            setTimeout(() => {
              setIsCacheClear(false);
            }, 1000);
          }
        } else {
          notification("Fail", "Failed to clear the cache", "error");
          setIsCacheClear(false);
        }
      }
    } catch (_error) {
      notification("Fail", "Failed to clear the cache", "error");
      setIsCacheClear(false);
    }
  };

  return { onClearCache, isCacheClear };
};

export default useClearCache;
