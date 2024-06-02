"use client";

import React, { RefObject, useEffect, useRef } from "react";

import { isExists, isValid } from "date-fns";

import { Input, InputProps } from "./input";

type DateInputType = "day" | "month" | "year";
type TimeInputType = "hour" | "minute";

interface DateTimeInputFieldProps extends Omit<InputProps, "onChange"> {
  label: string;
  value?: string | number;
  inputType: DateInputType | TimeInputType;
  moveFocusRef?: RefObject<HTMLInputElement>;
  onChange: (value: string) => void;
}

const DateTimeInputField = React.forwardRef<
  HTMLInputElement,
  DateTimeInputFieldProps
>(
  (
    { inputType, label, onChange, onInput, onBlur, moveFocusRef, ...props },
    ref
  ) => {
    const maxLength = inputType === "year" ? 4 : 2;

    const formatOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      if (inputType === "hour" && e.currentTarget.value === "24") {
        e.currentTarget.value = "0";
        onChange(e.currentTarget.value);
      }
      // we don't pad zero years!
      if (inputType !== "year" && e.currentTarget.value.length === 1) {
        e.currentTarget.value = e.currentTarget.value.padStart(maxLength, "0");
        if (e.currentTarget.value.length === maxLength) {
          onChange(e.currentTarget.value);
        }
      }
    };

    const filterOnInput = (e: React.FormEvent<HTMLInputElement>) => {
      e.currentTarget.value = e.currentTarget.value
        .replace(/[^0-9]/g, "")
        .replace(/(\..*?)\..*/g, "$1");

      onInput?.(e);
      if (e.currentTarget.value.length > maxLength) {
        e.currentTarget.value = e.currentTarget.value.slice(0, maxLength);
      } else if (e.currentTarget.value.length == maxLength) {
        moveFocusRef?.current?.focus();
        onChange(e.currentTarget.value);
      }
    };

    return (
      <div className="flex flex-col space-y-1.5">
        <span className="text-muted-foreground text-xs ok">{label}</span>
        <Input
          ref={ref}
          {...props}
          type="text"
          pattern={inputType === "year" ? "[0-9]{4}" : "[0-9]{1,2}"}
          inputMode="numeric"
          maxLength={maxLength}
          onBlur={formatOnBlur}
          onInput={filterOnInput}
        />
      </div>
    );
  }
);

DateTimeInputField.displayName = "DateTimeInputField";

export interface DateInputProps extends Omit<InputProps, "onChange" | "value"> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

const DateInput = ({ value, onChange }: DateInputProps) => {
  const fieldValues = useRef<Record<DateInputType, number | undefined>>({
    day: undefined,
    month: undefined,
    year: undefined,
  });
  const inputRefs = useRef<
    Record<DateInputType, React.RefObject<HTMLInputElement>>
  >({
    day: { current: null },
    month: { current: null },
    year: { current: null },
  });

  useEffect(() => {
    if (value && isValid(value)) {
      fieldValues.current.day = value.getDate();
      fieldValues.current.month = value.getMonth();
      fieldValues.current.year = value.getFullYear();
    }
  }, [value]);

  const onFieldChange = (type: DateInputType) => (value: string) => {
    const setValue = Number(value);
    if (isNaN(setValue)) return;
    fieldValues.current[type] = type === "month" ? setValue - 1 : setValue;

    const { year, month, day } = fieldValues.current;

    // Only validate if all fields are filled
    if (year === undefined || month === undefined || day === undefined) {
      return;
    }
    // isExists function from date-fns can verify all conditions of the date
    if (!isExists(year, month, day)) {
      onChange?.(new Date("Invalid Date"));
      return;
    }
    const date = new Date(year, month, day);
    onChange?.(date);
  };

  return (
    <div className="flex flex-row gap-2">
      <DateTimeInputField
        label="วัน (1-31)"
        inputType="day"
        ref={inputRefs.current.day}
        onChange={onFieldChange("day")}
        moveFocusRef={inputRefs.current.month}
      />
      <DateTimeInputField
        label="เดือน (1-12)"
        inputType="month"
        ref={inputRefs.current.month}
        onChange={onFieldChange("month")}
        moveFocusRef={inputRefs.current.year}
      />
      <DateTimeInputField
        label="ปี (ค.ศ.)"
        inputType="year"
        ref={inputRefs.current.year}
        onChange={onFieldChange("year")}
      />
    </div>
  );
};

export interface TimeInputProps extends Omit<InputProps, "onChange" | "value"> {
  value?: string;
  onChange?: (time: string) => void;
}

const TimeInput = ({ value, onChange }: TimeInputProps) => {
  const fieldValues = useRef<Record<TimeInputType, number | undefined>>({
    hour: undefined,
    minute: undefined,
  });
  const inputRefs = useRef<
    Record<TimeInputType, React.RefObject<HTMLInputElement>>
  >({
    hour: { current: null },
    minute: { current: null },
  });

  useEffect(() => {
    if (value) {
      const [hour, minute] = value.split(":").map(Number);
      fieldValues.current.hour = hour;
      fieldValues.current.minute = minute;
    }
  }, [value]);

  const onFieldChange = (type: TimeInputType) => (value: string) => {
    const setValue = Number(value);
    if (isNaN(setValue)) return;
    fieldValues.current[type] = setValue;

    const { hour, minute } = fieldValues.current;

    // Only validate if all fields are filled
    if (hour === undefined || minute === undefined) {
      return;
    }
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      onChange?.("Invalid Time");
      return;
    }
    onChange?.(
      `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
    );
  };

  return (
    <div className="flex flex-row gap-2 items-end">
      <DateTimeInputField
        label="ชั่วโมง"
        inputType="hour"
        ref={inputRefs.current.hour}
        onChange={onFieldChange("hour")}
        moveFocusRef={inputRefs.current.minute}
      />
      <span className="h-10 flex items-center">:</span>
      <DateTimeInputField
        label="นาที"
        inputType="minute"
        ref={inputRefs.current.minute}
        onChange={onFieldChange("minute")}
      />
    </div>
  );
};

export { DateInput, TimeInput };
