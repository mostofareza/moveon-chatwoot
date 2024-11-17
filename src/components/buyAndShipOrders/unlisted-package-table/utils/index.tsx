import { UseMutateFunction } from "@tanstack/react-query";
import { NotificationTypes } from "src/components/atoms/notification";
import {
  ShipmentProductMeasurementPackagesCbmUnitEnum,
  ShipmentProductMeasurementPackagesHeightUnitEnum,
  ShipmentProductMeasurementPackagesLengthUnitEnum,
  ShipmentProductMeasurementPackagesWeightUnitEnum,
  ShipmentProductMeasurementPackagesWidthUnitEnum,
} from "src/enums/shipmentProductCollectionEnums";
import {
  IUnlistedPackageBulkStatusUpdateFormData,
  IUnlistedPackageStatusUpdateFormData,
} from "src/types/unlistedPackageCollection";
import { getErrorMessage } from "src/utils/error-messages";
import { IShipmentProductUpdateStatusFormData } from "src/types/shipmentProductCollection";

export const measurementWeightOptions: {
  value: ShipmentProductMeasurementPackagesWeightUnitEnum;
  label: string;
}[] = [
  { value: ShipmentProductMeasurementPackagesWeightUnitEnum.KG, label: "KG" },
  { value: ShipmentProductMeasurementPackagesWeightUnitEnum.LB, label: "LB" },
];

export const measurementWidthOptions: {
  value: ShipmentProductMeasurementPackagesWidthUnitEnum;
  label: string;
}[] = [
  { value: ShipmentProductMeasurementPackagesWidthUnitEnum.CM, label: "CM" },
  {
    value: ShipmentProductMeasurementPackagesWidthUnitEnum.In,
    label: "IN",
  },
];

export const measurementLengthOptions: {
  value: ShipmentProductMeasurementPackagesLengthUnitEnum;
  label: string;
}[] = [
  { value: ShipmentProductMeasurementPackagesLengthUnitEnum.CM, label: "CM" },
  {
    value: ShipmentProductMeasurementPackagesLengthUnitEnum.In,
    label: "IN",
  },
];

export const measurementHeightOptions: {
  value: ShipmentProductMeasurementPackagesHeightUnitEnum;
  label: string;
}[] = [
  { value: ShipmentProductMeasurementPackagesHeightUnitEnum.CM, label: "CM" },
  {
    value: ShipmentProductMeasurementPackagesHeightUnitEnum.In,
    label: "IN",
  },
];

export const measurementCbmOptions: {
  value: ShipmentProductMeasurementPackagesCbmUnitEnum;
  label: string;
}[] = [
  { value: ShipmentProductMeasurementPackagesCbmUnitEnum.CM, label: "CM" },
  {
    value: ShipmentProductMeasurementPackagesCbmUnitEnum.In,
    label: "IN",
  },
];

interface IProps {
  package_id: number;
  status: string;
  mutate: UseMutateFunction<
    any,
    null,
    {
      package_id: number;
      payload: IUnlistedPackageStatusUpdateFormData;
    },
    undefined
  >;
  notification: (
    title: string,
    message: string,
    type: NotificationTypes,
  ) => void;
}

export const onSubmitUpdateStatus = ({
  package_id,
  status,
  mutate,
  notification,
}: IProps) => {
  const payload: IShipmentProductUpdateStatusFormData = {
    status,
  };

  mutate(
    {
      package_id,
      payload,
    },
    {
      onSuccess: (data) => {
        notification("Success", data.message, "success");
      },
      onError: (error) => {
        notification("Error", getErrorMessage(error), "error");
      },
    },
  );
};

interface IChangeStatusBulkProps {
  unlisted_package_ids: number[];
  status: {
    label: string;
    value: string;
  };
  mutateBulk: UseMutateFunction<
    any,
    null,
    {
      payload: IUnlistedPackageBulkStatusUpdateFormData;
    },
    undefined
  >;
  notification: (
    title: string,
    message: string,
    type: NotificationTypes,
  ) => void;
  resetAndCloseModal: () => void;
}

export const onSubmitChangeStatusBulk = ({
  unlisted_package_ids,
  status,
  mutateBulk,
  notification,
  resetAndCloseModal,
}: IChangeStatusBulkProps) => {
  mutateBulk(
    {
      payload: {
        unlisted_package_ids,
        status: status.value,
      },
    },
    {
      onSuccess: () => {
        notification("Success", `Status changed to ${status.label}`, "success");
        resetAndCloseModal();
      },
      onError: (error) => {
        notification("Error", getErrorMessage(error), "error");
      },
    },
  );
};
