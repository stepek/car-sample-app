import RCSelect from "rc-select"

import React, {useCallback, useState} from "react"
import {createUseStyles} from "react-jss"

export interface Options {
  [value: string]: string
}

interface SelectProps {
  placeholder?: string
  options?: Options
  onSelect?: (value: string) => void
}

const useStyles = createUseStyles(theme => ({
  select: {
    fontSize: "1.5em",
    fontFamily: "Arial, sans-serif",
    border: "solid 1px #313131",
    minHeight: "1em",
    "& .rc-select-selector": {},
    "& .rc-select-selection-search > input": {
      width: 0,
    },
  },
  dropdown: {
    fontFamily: "Arial, sans-serif",
    border: "solid 1px #313131",
    "& .rc-select-item-option-active": {
      background: "#93adff",
    },
    "& .rc-select-item-option-selected": {
      background: "#808cb8",
    },
    "& .rc-select-item-option": {
      padding: 15,
      "& .rc-select-item-option-state": {
        display: "none",
      },
    },
    "&&.rc-select-dropdown-hidden": {
      display: "none",
    },
  },
}))

export function Select({options = {}, placeholder, onSelect}: SelectProps) {
  const classes = useStyles()

  return (
    <RCSelect
      className={classes.select}
      dropdownClassName={classes.dropdown}
      placeholder={placeholder}
      autoClearSearchValue={false}
      showSearch={false}
      onSelect={onSelect}
    >
      {Object.entries(options).map(([value, label]) => (
        <RCSelect.Option key={value} value={value} title={label}>
          {label}
        </RCSelect.Option>
      ))}
    </RCSelect>
  )
}

export default Select
