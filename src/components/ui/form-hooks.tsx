import * as React from "react"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form"
import { FormFieldContext, FormItemContext } from "./form-utils"

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}
