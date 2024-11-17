import { ActionType } from "../../molecules/actionables";
import { UnlistedPackageModel } from "src/models/unlistedPackageCollectionModel";
import { UnlistedPackagePermissionsEnum } from "src/permission/permissionsEnum/UnlistedPackagePermissionsEnum";
import { IUnlistedPackageModalType } from "src/types/unlistedPackageCollection";
import { filterActions } from "src/utils/helpers/permissions/filterActions";

interface IProps {
  unlisted_package: UnlistedPackageModel;
  setModalOpen: React.Dispatch<
    React.SetStateAction<IUnlistedPackageModalType | undefined>
  >;
  setSelectedRow: React.Dispatch<
    React.SetStateAction<UnlistedPackageModel | undefined>
  >;
}

const useUnlistedPackageActions = ({
  setModalOpen,
  unlisted_package,
  setSelectedRow,
}: IProps) => {
  const handleUpdate = () => {
    setModalOpen("Update");
    setSelectedRow(unlisted_package);
  };

  const getActions = (): ActionType[] => [
    {
      permission: UnlistedPackagePermissionsEnum.UPDATE,
      label: "Update",
      onClick: handleUpdate,
    },
  ];

  return filterActions(getActions());
};

export default useUnlistedPackageActions;
