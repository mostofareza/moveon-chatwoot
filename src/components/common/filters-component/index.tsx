import _ from "lodash";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NextSelect } from "src/components/molecules/select/next-select";
import { IFilters } from "src/types/filters";
import InputField from "src/components/molecules/input";
import Button from "src/components/fundamentals/button";
import ArrowDownIcon from "src/components/fundamentals/icons/arrow-down-icon";
import { useDebounce } from "src/hooks/use-debounce";
import { DateRangePicker } from "src/components/molecules/date-range-picker";

import {
  useCountrySelectOptions,
  useDestinationWarehouseSelectOptions,
  useWarehouseSelectOptions,
  useShippingCategoryData,
  useWarehouseShipmentData,
  usePayoutAccountData,
} from "src/utils/helpers/index";
import { IFilterState } from "./use-filters";
import { getAgentCompanyId } from "src/utils/get-agent-company-id";
import NestedCategorySelect from "src/components/molecules/NestedCategorySelect/NestedCategorySelect";
import BulkIcon from "src/components/fundamentals/icons/BulkIcon";
import Actionables from "src/components/molecules/actionables";
import { useFilterAction } from "./use-main-actions";
import UploadIcon from "src/components/fundamentals/icons/upload-icon";
import { HarvestActionsEnum } from "src/enums/harvestActionsEnums";
import HarvestDynamicForm from "../harvest-dynamic-form/harvest-dynamic-form";
import { useHarvestContextSchema } from "src/lib/core-react/hooks/private/useHarvestJob";

const MAX_INITIAL_FILTERS_COUNT = 6;

type Option = {
  label: string;
  value: string | number;
};
import { filterResourceEnum } from "src/enums/filterResourceEnum";
import { responseTypeQuery } from "src/constants/query-client";
import { useStoreAccountSelectOptions } from "src/utils/helpers/use-store-account-data";
import SortingIcon from "src/components/fundamentals/icons/sorting-icon";
import { ISelectOption } from "src/types/buyProductCollection";
import { Authorized } from "src/permission/Authorized/permissions";
import InputHeader from "src/components/fundamentals/input-header";
import { HarvestBatchPermissionsEnum } from "src/permission/permissionsEnum/HarvestBatchPermissionsEnum";
import { renderWithPermission } from "src/utils/helpers/permissions/renderWithPermission";

interface IProps {
  setFilters: (filters: IFilterState) => void;
  filters: IFilters | undefined;
  reset: () => void;
  filtersOnLoad: any;
  harvestKey?: HarvestActionsEnum[];
  additionalKey?: string[];
  sortedBy?: ISelectOption[];
  handleCartMatch?: () => void;
}

const FiltersComponent = React.memo(
  ({
    setFilters,
    filters,
    reset,
    filtersOnLoad,
    harvestKey,
    additionalKey,
    sortedBy,
  }: IProps) => {
    const sortedByOptions = sortedBy || [];
    const {
      register,
      handleSubmit,
      control,
      setValue,
      getValues,
      reset: resetForm,
    } = useForm<any>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const actions = useFilterAction(filtersOnLoad, harvestKey);
    const [showAllFilters, setShowAllFilters] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);

    const selectedFieldRef = useRef<string | null>(null);

    const [isResetting, setIsResetting] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchInput = useDebounce(searchInput, 500);

    const toggleFilters = () => setShowAllFilters(!showAllFilters);

    // ----------------------------State to store the options--------------------------------

    const [allWarehouseOptions, setAllWarehouseOptions] = useState<Option[]>(
      [],
    );
    const [allDestinationWarehouseOptions, setAllDestinationWarehouseOptions] =
      useState<Option[]>([]);
    const [allShippingCategoryOptions, setAllShippingCategoryOptions] =
      useState<Option[]>([]);
    const [allCountryOptions, setAllCountryOptions] = useState<Option[]>([]);
    const [allWarehouseShipmentOptions, setAllWarehouseShipmentOptions] =
      useState<Option[]>([]);
    const [allPayoutAccountOptions, setAllPayoutAccountOptions] = useState<
      Option[]
    >([]);
    const [allStoreAccountOptions, setAllStoreAccountOptions] = useState<
      Option[]
    >([]);
    // -------------Track the selected field to  call corresponding api--------------------------------
    const [isWarehouseActive, setWarehouseActive] = useState(false);
    const [isDestinationWarehouseActive, setDestinationWarehouseActive] =
      useState(false);
    const [isShippingCategoryActive, setShippingCategoryActive] =
      useState(false);
    const [isCountryActive, setCountryActive] = useState(false);
    const [isWarehouseShipmentActive, setWarehouseShipmentActive] =
      useState(false);
    const [isPayoutAccountActive, setPayoutAccountActive] = useState(false);
    const [isStoreAccountActive, setIsStoreAccountActive] = useState(false);
    const [, setSortValue] = useState("id");
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // ----------------------------API calls--------------------------------
    const {
      warehouseSelectOptions,
      isFetching: isWarehouseSelectOptionsFetching,
    } = useWarehouseSelectOptions(
      {
        name: debouncedSearchInput,
        page: searchInput ? 1 : page,
        ...responseTypeQuery.minimal,
      },
      isWarehouseActive,
    );
    const {
      destinationWarehouseSelectOptions,
      isFetching: isDestinationWarehouseSelectOptionsFetching,
    } = useDestinationWarehouseSelectOptions(
      {
        name: debouncedSearchInput,
        page: searchInput ? 1 : page,
        ...responseTypeQuery.minimal,
      },
      isDestinationWarehouseActive,
    );
    const {
      shippingCategoryOptions,
      isFetching: isShippingCategoryOptionsFetching,
    } = useShippingCategoryData(
      {
        name: debouncedSearchInput,
        page: searchInput ? 1 : page,
        ...responseTypeQuery.minimal,
      },
      isShippingCategoryActive,
    );
    const { countrySelectOptions, isFetching: isCountryOptionsFetching } =
      useCountrySelectOptions(
        {
          name: debouncedSearchInput,
          page: searchInput ? 1 : page,
          ...responseTypeQuery.minimal,
        },
        isCountryActive,
      );
    const {
      warehouseShipmentOptions,
      isFetching: isWarehouseShipmentFetching,
    } = useWarehouseShipmentData({
      agentCompanyId: getAgentCompanyId(),
      warehouseId: undefined,
      query: { ...responseTypeQuery.minimal },
      active: isWarehouseShipmentActive,
    });

    const { payoutAccountOptions, isFetching: isPayoutAccountFetching } =
      usePayoutAccountData(responseTypeQuery.minimal, isPayoutAccountActive);

    const { storeAccountOptions, isFetching: isStoreAccountFetching } =
      useStoreAccountSelectOptions(
        {
          name: debouncedSearchInput,
          page: searchInput ? 1 : page,
          ...responseTypeQuery.minimal,
        },
        isStoreAccountActive,
      );

    //----------------------------End of API calls--------------------------------

    const { data } = useHarvestContextSchema();

    const handleSortChange = (selectedSort: ISelectOption) => {
      const modifiedData: IFilterState = {
        page: 1,
        per_page: 25,
      };
      modifiedData[`sort_by`] = selectedSort.value;
      setSortValue(selectedSort.value);
      setFilters(modifiedData);
      setDropdownOpen(false);
    };

    const toggleDropdown = () => {
      setDropdownOpen((prev) => !prev); // Toggle the dropdown's visibility
    };

    // to show import action
    const firstKeyWithImport = harvestKey?.find((key) =>
      key.includes("import"),
    );

    // ----------------------------Filled the values on reload--------------------------------
    useEffect(() => {
      if (filters && Object.keys(filters).length > 0 && !isResetting) {
        Object.keys(filters).forEach((filter) => {
          const type = filters[filter].type;
          const values = filters[filter].values;
          if (
            (type === "string" || type === "number") &&
            filtersOnLoad[filter]
          ) {
            setValue(filter, filtersOnLoad[filter]);
          }
          if (type === "multiselect") {
            const selectedValues = filtersOnLoad[filter];
            if (Array.isArray(selectedValues)) {
              const matchingFilters = selectedValues
                .map((selectedValue) => {
                  return values.find(
                    (val: { value: string }) => val.value === selectedValue,
                  );
                })
                .filter(Boolean);
              setValue(filter, matchingFilters);
            }
          }
          if (type === "select" && values && values.length) {
            const selectedValue = filtersOnLoad[filter];
            const matchingSelect = values.find(
              (val: { value: string }) => val.value === selectedValue,
            );
            setValue(filter, matchingSelect);
          }
        });
      }
    }, [filters, filtersOnLoad, setValue, resetForm, isResetting]);

    //----------------------------End of Filled the values on reload--------------------------------

    // ----------------------------Apply and Reset Filters--------------------------------

    const onApply = async (data: IFilterState) => {
      setIsResetting(false);
      const modifiedData: IFilterState = {
        page: 1,
        per_page: 25,
      };

      await new Promise<void>((resolve) => {
        Object.entries(data).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v, index) => {
              modifiedData[`${key}[${index}]`] = v.value;
            });
          } else if (
            !key.includes("[") &&
            typeof value === "object" &&
            value !== null &&
            "label" in value &&
            "value" in value
          ) {
            modifiedData[key] = value.value;
          } else if (key === "created_at" && value) {
            modifiedData["created_at[0]"] = moment(value.from).format(
              "YYYY-MM-DD HH:mm:ss",
            );
            modifiedData["created_at[1]"] = moment(value.to).format(
              "YYYY-MM-DD HH:mm:ss",
            );
          } else if (key !== "created_at" && value) {
            modifiedData[key] = value;
          }
        });

        resolve();
      });
      setFilters(modifiedData);
    };
    const onReset = () => {
      setIsResetting(true);

      const resetValues = Object.keys(getValues()).reduce((acc: any, key) => {
        if (
          // check if the filter type is select
          filters &&
          filters[key] &&
          filters[key].type === "select"
        ) {
          acc[key] = null; // Use null for single select to clear the value
        } else if (
          // check if the filter type is multiselect
          filters &&
          filters[key] &&
          filters[key].type === "multiselect"
        ) {
          acc[key] = []; // Clear multiselect
        } else {
          acc[key] = ""; // Clear input fields
        }
        return acc;
      }, {});

      if (filtersOnLoad) {
        setFilters({ page: 1, per_page: 25, ...resetValues });
      }

      resetForm(resetValues);
      reset();
    };

    //----------------------------End of Apply and Reset Filters--------------------------------

    // ----------------------------Load More Data--------------------------------

    const loadMoreData = () => {
      setIsLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    };

    const handleScroll = (event: WheelEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      const bottom =
        target.scrollHeight - target.scrollTop === target.clientHeight;
      if (bottom) {
        loadMoreData();
      }
    };
    // ----------------------------End of Load More Data--------------------------------

    // ----------------------------Update Options and attach new data with previous--------------------------------
    useEffect(() => {
      if (!isResetting) {
        const updateOptions = (
          newOptions: Option[],
          allOptions: Option[],
          setAllOptions: React.Dispatch<React.SetStateAction<Option[]>>,
        ) => {
          if (isLoadingMore && page > 1 && !isSearching) {
            const optionsToUpdate = _.differenceWith(
              newOptions,
              allOptions,
              _.isEqual,
            );
            setAllOptions((prevOptions) => [
              ...prevOptions,
              ...optionsToUpdate,
            ]);
          } else if (isLoadingMore && isSearching && page > 1) {
            const optionsToUpdate = _.differenceWith(
              newOptions,
              allOptions,
              _.isEqual,
            );
            setAllOptions((prevOptions) => [
              ...prevOptions,
              ...optionsToUpdate,
            ]);
          } else if (page === 1) {
            setAllOptions(newOptions);
          }
        };

        const optionsMapping = [
          {
            data: warehouseSelectOptions,
            allOptions: allWarehouseOptions,
            setOptions: setAllWarehouseOptions,
          },
          {
            data: destinationWarehouseSelectOptions,
            allOptions: allDestinationWarehouseOptions,
            setOptions: setAllDestinationWarehouseOptions,
          },
          {
            data: shippingCategoryOptions,
            allOptions: allShippingCategoryOptions,
            setOptions: setAllShippingCategoryOptions,
          },
          {
            data: countrySelectOptions,
            allOptions: allCountryOptions,
            setOptions: setAllCountryOptions,
          },
          {
            data: warehouseShipmentOptions,
            allOptions: allWarehouseShipmentOptions,
            setOptions: setAllWarehouseShipmentOptions,
          },
          {
            data: payoutAccountOptions,
            allOptions: allPayoutAccountOptions,
            setOptions: setAllPayoutAccountOptions,
          },
          {
            data: storeAccountOptions,
            allOptions: allStoreAccountOptions,
            setOptions: setAllStoreAccountOptions,
          },
        ];

        optionsMapping.forEach(({ data, allOptions, setOptions }) => {
          if (data.length > 0) {
            updateOptions(data, allOptions, setOptions);
          }
        });
      }
    }, [
      page,
      isResetting,
      isLoadingMore,
      isSearching,
      isWarehouseSelectOptionsFetching,
      isDestinationWarehouseSelectOptionsFetching,
      isShippingCategoryOptionsFetching,
      isCountryOptionsFetching,
      isWarehouseShipmentFetching,
      isPayoutAccountFetching,
      isStoreAccountFetching,
    ]);

    //----------------------------End of Update Options and attach new data with previous----------------------------

    useEffect(() => {
      if (debouncedSearchInput.length === 0) {
        setPage(1);
      } else if (debouncedSearchInput) {
        setIsSearching(true);
      }
    }, [debouncedSearchInput]);

    // ----------if any ref is active, close the other refs to avoid unnecessary api calls------------
    useEffect(() => {
      const deactivateOtherResources = (activeResource: string) => {
        const resourceStates = {
          isWarehouseActive: setWarehouseActive,
          isDestinationWarehouseActive: setDestinationWarehouseActive,
          isShippingCategoryActive: setShippingCategoryActive,
          isCountryActive: setCountryActive,
          isWarehouseShipmentActive: setWarehouseShipmentActive,
          isPayoutAccountActive: setPayoutAccountActive,
          isStoreAccountActive: setIsStoreAccountActive,
        };

        Object.entries(resourceStates).forEach(([key, setter]) => {
          if (key !== activeResource) {
            setter(false);
          }
        });
      };

      if (isWarehouseActive) deactivateOtherResources("isWarehouseActive");
      if (isDestinationWarehouseActive)
        deactivateOtherResources("isDestinationWarehouseActive");
      if (isShippingCategoryActive)
        deactivateOtherResources("isShippingCategoryActive");
      if (isCountryActive) deactivateOtherResources("isCountryActive");
      if (isWarehouseShipmentActive)
        deactivateOtherResources("isWarehouseShipmentActive");
      if (isPayoutAccountActive)
        deactivateOtherResources("isPayoutAccountActive");
    }, [
      page,
      isWarehouseActive,
      isDestinationWarehouseActive,
      isCountryActive,
      isShippingCategoryActive,
      isWarehouseShipmentActive,
      isPayoutAccountActive,
    ]);

    // ------ if selected field is changed, reset the page to 1 to fetch the new data------
    useEffect(() => {
      if (selectedFieldRef.current) {
        setPage(1);
      }
    }, [selectedFieldRef.current]);

    const getIsFetchingState = (resource: filterResourceEnum): boolean => {
      switch (resource) {
        case filterResourceEnum.AGENT_WAREHOUSE:
          return isWarehouseSelectOptionsFetching;
        case filterResourceEnum.DESTINATION_WAREHOUSE:
          return isDestinationWarehouseSelectOptionsFetching;
        case filterResourceEnum.SHIPPING_CATEGORY:
          return isShippingCategoryOptionsFetching;
        case filterResourceEnum.COUNTRY:
          return isCountryOptionsFetching;
        case filterResourceEnum.WAREHOUSE_SHIPMENT:
          return isWarehouseShipmentFetching;
        case filterResourceEnum.PAYOUT_ACCOUNT:
          return isPayoutAccountFetching;
        case filterResourceEnum.STORE:
          return isStoreAccountFetching;
        default:
          return false;
      }
    };

    const handleOnFocus = (resource: filterResourceEnum) => {
      return () => {
        setPage(1); // Common behavior for all resources
        selectedFieldRef.current = resource; // Set the current selected field

        switch (resource) {
          case filterResourceEnum.AGENT_WAREHOUSE:
            setWarehouseActive(true);
            break;
          case filterResourceEnum.DESTINATION_WAREHOUSE:
            setDestinationWarehouseActive(true);
            break;
          case filterResourceEnum.SHIPPING_CATEGORY:
            setShippingCategoryActive(true);
            break;
          case filterResourceEnum.COUNTRY:
            setCountryActive(true);
            break;
          case filterResourceEnum.WAREHOUSE_SHIPMENT:
            setWarehouseShipmentActive(true);
            break;
          case filterResourceEnum.PAYOUT_ACCOUNT:
            setPayoutAccountActive(true);
            break;
          case filterResourceEnum.STORE:
            setIsStoreAccountActive(true);
            break;
          default:
            return undefined;
        }
      };
    };

    // ----------------------------Render--------------------------------

    return (
      <form
        className="border-grey-5 mt-4 h-auto w-full flex-col justify-between border-b-8 bg-white p-2 lg:mt-0 lg:flex lg:p-7"
        onSubmit={handleSubmit(onApply)}
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {filters && Object.keys(filters).length > 0
            ? Object.keys(filters)
                .slice(
                  0,
                  showAllFilters ? filters.length : MAX_INITIAL_FILTERS_COUNT,
                )
                .map((filter, index) => {
                  const placeholder = filters[filter].placeholder;
                  const label = filters[filter].label;
                  const type = filters[filter].type;
                  const resource = filters[filter].resource;
                  let values = filters[filter].values;
                  if (type === "string" || type === "number") {
                    return (
                      <InputField
                        key={label + index}
                        label={label}
                        placeholder={placeholder}
                        {...register(filter, { required: false })}
                      />
                    );
                  }
                  if (type === "multiselect") {
                    return (
                      <Controller
                        key={label + index}
                        name={filter}
                        control={control}
                        render={({
                          field: { value, onChange, onBlur, ref },
                        }) => {
                          return (
                            <NextSelect
                              isMulti
                              isSearchable
                              {...register(filter, {
                                required: false,
                              })}
                              label={label}
                              placeholder={placeholder}
                              onBlur={onBlur}
                              ref={ref}
                              onChange={onChange}
                              options={values}
                              value={value || []}
                            />
                          );
                        }}
                      />
                    );
                  }
                  if (type === "select") {
                    if (resource === filterResourceEnum.AGENT_WAREHOUSE) {
                      values =
                        allWarehouseOptions.length > 0
                          ? allWarehouseOptions
                          : warehouseSelectOptions;
                    }
                    if (resource === filterResourceEnum.DESTINATION_WAREHOUSE) {
                      values =
                        allDestinationWarehouseOptions.length > 0
                          ? allDestinationWarehouseOptions
                          : destinationWarehouseSelectOptions;
                    }
                    if (resource === filterResourceEnum.SHIPPING_CATEGORY) {
                      values =
                        allShippingCategoryOptions.length > 0
                          ? allShippingCategoryOptions
                          : shippingCategoryOptions;
                    }
                    if (resource === filterResourceEnum.COUNTRY) {
                      values =
                        allCountryOptions.length > 0
                          ? allCountryOptions
                          : countrySelectOptions;
                    }
                    if (resource === filterResourceEnum.WAREHOUSE_SHIPMENT) {
                      values =
                        allWarehouseShipmentOptions.length > 0
                          ? allWarehouseShipmentOptions
                          : warehouseShipmentOptions;
                    }
                    if (resource === filterResourceEnum.PAYOUT_ACCOUNT) {
                      values =
                        allPayoutAccountOptions.length > 0
                          ? allPayoutAccountOptions
                          : payoutAccountOptions;
                    }
                    if (resource === filterResourceEnum.STORE) {
                      values =
                        allStoreAccountOptions.length > 0
                          ? allStoreAccountOptions
                          : storeAccountOptions;
                    }

                    if (
                      resource === filterResourceEnum.BASE_SHIPPING_CATEGORY
                    ) {
                      return (
                        <div key={label + index}>
                          <InputHeader
                            label={label}
                            className="lg:text-large text-grey-50 mb-xsmall text-sm capitalize"
                          />
                          <Controller
                            control={control}
                            name={filter}
                            render={({ field }) => (
                              <NestedCategorySelect
                                isReset={isResetting}
                                defaultValue={null}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setValue(filter, value);
                                }}
                              />
                            )}
                          />
                        </div>
                      );
                    }
                    return (
                      <Controller
                        key={label + index}
                        name={filter}
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => {
                          return (
                            <NextSelect
                              isSearchable
                              {...register(filter, {
                                required: false,
                              })}
                              isLoading={getIsFetchingState(resource)}
                              label={label}
                              placeholder={placeholder}
                              onBlur={onBlur}
                              onFocus={
                                resource ? handleOnFocus(resource) : undefined
                              }
                              onChange={(selectedOption) => {
                                onChange(selectedOption);
                                setValue(filter, selectedOption);
                              }}
                              onInputChange={(value) => setSearchInput(value)}
                              options={values}
                              value={value || []}
                              onMenuScrollToBottom={handleScroll}
                            />
                          );
                        }}
                      />
                    );
                  }
                  if (type === "daterange") {
                    return (
                      <span key={label}>
                        <p className="text-base">{label}</p>
                        <DateRangePicker
                          align="center"
                          showCompare={false}
                          onUpdate={(value) => {
                            setValue(filter, value.range);
                          }}
                        />
                      </span>
                    );
                  }
                })
            : ""}
        </div>
        <div className="my-4 flex">
          {filters && Object.keys(filters).length > 6 && (
            <button
              className="rounded bg-transparent px-4 py-2 font-medium leading-tight text-[#006BFF] shadow-sm transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-0"
              onClick={toggleFilters}
              type="button"
            >
              {showAllFilters ? (
                "Show Less"
              ) : (
                <div className="flex items-center gap-4">
                  <p>Advanced Filters</p> <ArrowDownIcon size={14} />
                </div>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            className="text-rose-50"
          >
            All Filters Clear
          </Button>

          {sortedBy && additionalKey && additionalKey.includes("sort") && (
            <div className="relative inline-block">
              <button
                className="flex items-center rounded border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-800 shadow-sm transition hover:bg-gray-100"
                type="button"
                onClick={toggleDropdown}
              >
                <SortingIcon size={15} className="mr-2" />
                {"Sorted By"}
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <ul className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                  {sortedByOptions.map((sortOption) => (
                    <li
                      key={sortOption.value}
                      className="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => handleSortChange(sortOption)}
                    >
                      {sortOption.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {harvestKey &&
            renderWithPermission(
              HarvestBatchPermissionsEnum.Create,
              <Actionables
                forceDropdown={true}
                actions={actions}
                customTrigger={
                  <Button
                    type="button"
                    variant="secondary"
                    size="medium"
                    className="bg-white font-semibold"
                  >
                    <BulkIcon size={15} /> Export
                  </Button>
                }
              />,
            )}
          {harvestKey &&
            firstKeyWithImport &&
            renderWithPermission(
              HarvestBatchPermissionsEnum.Create,
              <Button
                type="button"
                variant="secondary"
                size="medium"
                className="bg-white font-semibold"
                onClick={handleOpenModal}
              >
                <UploadIcon size={15} /> Import
              </Button>,
            )}

          {isModalOpen && data && firstKeyWithImport && (
            <HarvestDynamicForm
              data={data}
              schemaKey={firstKeyWithImport}
              handleClose={handleCloseModal}
            />
          )}

          <Button
            variant="prime"
            size="medium"
            type="submit"
            className="bg-button-primary"
          >
            Apply Filters
          </Button>
        </div>
      </form>
    );
  },
);

export default FiltersComponent;
