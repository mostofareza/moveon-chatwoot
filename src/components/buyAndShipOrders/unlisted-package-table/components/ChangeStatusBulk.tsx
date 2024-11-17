import { useEffect } from "react";
import clsx from "clsx";
import { Controller, UseFormReturn } from "react-hook-form";

import { NextSelect } from "src/components/molecules/select/next-select";
import GlobalBadge from "src/components/fundamentals/global-badge";
import { SelectOption } from "src/components/molecules/select";
import { UnlistedPackageModel } from "src/models/unlistedPackageCollectionModel";
import {
  IUnlistedPackageBulkStatusUpdateFormData,
  IUnlistedPackageBulkStatusUpdateFormDataRaw,
} from "src/types/unlistedPackageCollection";

interface IProps {
  selectedRows: UnlistedPackageModel[];
  form: UseFormReturn<IUnlistedPackageBulkStatusUpdateFormDataRaw, any>;
}

const ChangeStatusBulk = ({ selectedRows, form }: IProps) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = form;

  const currentStatus = selectedRows[0].getStatus();
  let statusBefore: SelectOption<string> | null = null;
  let statusAfter: SelectOption<string> | null = null;

  for (const status of selectedRows[0].getUiAction().getChangeableStatuses()) {
    const forwardStatus = status.getForward();
    const backwardStatus = status.getBackward();

    if (forwardStatus) statusAfter = forwardStatus;
    if (backwardStatus) statusBefore = backwardStatus;
  }

  const allowedDeliveryStatusOptions: SelectOption<string>[] = [];
  if (statusBefore) allowedDeliveryStatusOptions.push(statusBefore);
  if (statusAfter) allowedDeliveryStatusOptions.push(statusAfter);

  useEffect(() => {
    const toBeSelectedStatus = statusAfter ? statusAfter : statusBefore;

    if (toBeSelectedStatus)
      setValue("status", {
        label: toBeSelectedStatus.label,
        value: toBeSelectedStatus.value,
      });
  }, [selectedRows]);
  return (
    <div
      className={clsx(
        "flex h-fit flex-col gap-4 overflow-y-auto rounded-md px-6 py-4",
      )}
    >
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex gap-1">
          Current delivery request status is:
          <GlobalBadge
            status={currentStatus}
            label={currentStatus.replaceAll("-", " ")}
          />
        </div>
        <div className="flex flex-col gap-1">
          Changeable statuses are:
          <div className="flex gap-1">
            {statusBefore && (
              <div className="text-mvnTeal">
                {"<-"} {statusBefore.label}
              </div>
            )}
            {statusBefore && statusAfter ? " | " : ""}
            {statusAfter && (
              <div className="text-mvnTeal">
                {statusAfter.label} {"->"}
              </div>
            )}
          </div>
        </div>
      </div>

      <Controller
        name="status"
        control={control}
        render={({ field: { value, onChange, onBlur, ref } }) => {
          return (
            <NextSelect
              isSearchable
              {...register("status", {
                required: false,
              })}
              label="Delivery status"
              placeholder="Select a delivery status"
              onBlur={onBlur}
              ref={ref}
              onChange={onChange}
              options={allowedDeliveryStatusOptions}
              value={value}
              errors={errors}
            />
          );
        }}
      />
    </div>
  );
};

export default ChangeStatusBulk;
