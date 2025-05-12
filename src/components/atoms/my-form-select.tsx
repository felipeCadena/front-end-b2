import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./my-form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./my-select";

type Props<T extends FieldValues> = {
  readonly form: UseFormReturn<T>;
  readonly name: Path<T>;
  readonly options: {
    installment: string;
    reais: string;
    centavos: string;
    totalReais: string;
    totalCentavos: string;
  }[];
  readonly label?: string;
  readonly disabled?: boolean;
};

const MyFormSelect = <T extends FieldValues>({
  form,
  name,
  disabled = false,
  label = "",
  options,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <MySelect
            onValueChange={field.onChange}
            defaultValue={field.value.toString()}
          >
            <FormControl>
              <SelectTrigger disabled={disabled} className="md:w-[350px] py-6">
                <div className="flex justify-between w-full ">
                  {(() => {
                    const selected = options.find(
                      (opt) => opt.installment === field.value
                    );
                    if (!selected) return null;
                    return (
                      <div className="flex justify-start w-[80%] items-start">
                        <span className="text-black font-semibold">
                          {selected.reais}
                        </span>
                        <span className="text-black font-semibold text-[8px]">
                          {selected.centavos}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="rounded-md">
              {options.map((option) => (
                <SelectItem
                  key={option.installment}
                  value={option.installment}
                  className="border-t-[1px] flex justify-start w-full"
                >
                  <div className="flex justify-between w-[320px] md:w-[350px] px-3">
                    <div className="flex justify-start w-[80%] items-start">
                      <span className="text-black font-semibold">
                        {option.reais}
                      </span>
                      <span className="text-black font-semibold text-[8px]">
                        {option.centavos}
                      </span>
                    </div>
                    <div className="flex justify-start w-[20%] items-start">
                      <span className="font-semibold">{option.totalReais}</span>
                      <span className="font-semibold text-[8px]">
                        {option.totalCentavos}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </MySelect>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MyFormSelect;
