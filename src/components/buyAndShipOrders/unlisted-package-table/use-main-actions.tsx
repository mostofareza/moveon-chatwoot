import { NotificationTypes } from "src/components/atoms/notification";
import { ActionType } from "src/components/molecules/actionables";
import { UnlistedPackageModel } from "src/models/unlistedPackageCollectionModel";
import { UnlistedPackagePermissionsEnum } from "src/permission/permissionsEnum/UnlistedPackagePermissionsEnum";
import { IUnlistedPackageModalType } from "src/types/unlistedPackageCollection";
import { filterActions } from "src/utils/helpers/permissions/filterActions";

interface IProps {
  selectedRowIds: Record<string, boolean>;
  setSelectedRowsToStatusChange: React.Dispatch<
    React.SetStateAction<UnlistedPackageModel[] | undefined>
  >;
  data: UnlistedPackageModel[] | undefined;
  setModalOpen: React.Dispatch<
    React.SetStateAction<IUnlistedPackageModalType | undefined>
  >;
  notification: (
    title: string,
    message: string,
    type: NotificationTypes,
  ) => void;
}

export const getMainActions = ({
  selectedRowIds,
  setSelectedRowsToStatusChange,
  data,
  setModalOpen,
  notification,
}: IProps) => {
  const getActions = (): ActionType[] => [
    {
      permission: UnlistedPackagePermissionsEnum.UPDATE,
      label: <span>Update Status</span>,
      disabled: Object.keys(selectedRowIds)?.length === 0,
      onClick: () => {
        if (data && selectedRowIds && Object.keys(selectedRowIds).length) {
          const selectedRows = data.filter((d) =>
            Object.keys(selectedRowIds).includes(d.id.toString()),
          );
          // check if all selected rows have the same status
          const status = selectedRows[0].status;
          const allSameStatus = selectedRows.every(
            (row) => row.status === status,
          );

          if (!allSameStatus) {
            notification(
              "Error",
              "Please select rows with the same status",
              "error",
            );
            return;
          }

          setSelectedRowsToStatusChange(selectedRows);
          setModalOpen("BulkChangeStatus");
        }
      },
    },
  ];

  return filterActions(getActions());
};
