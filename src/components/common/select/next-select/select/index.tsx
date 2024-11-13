import type {
  GroupBase,
  Props as SelectProps,
  SelectInstance,
} from "react-select";
import {
  MutableRefObject,
  ReactElement,
  RefAttributes,
  forwardRef,
  useContext,
  useRef,
} from "react";

import { AdjacentContainer } from "../components";
import { ModalContext } from "../../../modal";
import ReactSelect from "react-select";
import { useSelectProps } from "../use-select-props";

interface CustomProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> extends SelectProps<Option, IsMulti, Group> {
  labelClassName?: string;
}

export type SelectComponent = <
  Option = unknown,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: CustomProps<Option, IsMulti, Group> &
    RefAttributes<SelectInstance<Option, IsMulti, Group>>,
) => ReactElement;

const Select = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: CustomProps<Option, IsMulti, Group>,
    ref:
      | ((instance: SelectInstance<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<SelectInstance<Option, IsMulti, Group> | null>
      | null,
  ) => {
    const selectProps = useSelectProps(props) as CustomProps<
      Option,
      IsMulti,
      Group
    >;

    const { label, labelClassName, required, helperText, name, errors } =
      selectProps;
    const containerRef = useRef<HTMLDivElement>(null);

    const { portalRef } = useContext(ModalContext);

    return (
      <AdjacentContainer
        ref={containerRef}
        label={label}
        htmlFor={name}
        helperText={helperText}
        required={required}
        name={name}
        errors={errors}
        labelClassName={labelClassName}
      >
        <ReactSelect
          aria-labelledby={`${name}_label`}
          ref={ref}
          name={name}
          {...selectProps}
          menuPortalTarget={portalRef?.current?.lastChild || null}
          menuShouldBlockScroll={true}
          isOptionDisabled={(option: any) => option.disabled}
        />
      </AdjacentContainer>
    );
  },
) as SelectComponent;

export default Select;
