import React from 'react'
import Select from './Select'

const options = [
  {
    value: 1,
    text: 1,
  },
  {
    value: 2,
    text: 2,
  },
  {
    value: 3,
    text: 3,
  },
  {
    value: 4,
    text: 4,
  },
  {
    value: 5,
    text: 5,
  },
  {
    value: 6,
    text: 6,
  },
  {
    value: 7,
    text: 7,
  },
  {
    value: 8,
    text: 8,
  },
  {
    value: 9,
    text: 9,
  },
  {
    value: 10,
    text: 10,
  }
]

export default () => (
  <div className="wrapper">
    <Select options={options} />
  </div>
)
