import React, { Component } from 'react';
import cn from 'classnames';
import data from './data'
import { mobileCheck } from './utils'

const KEY_CODES = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  ARROW_UP: 38,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
};

export default class Select extends Component {
  state = {
    isOpen: false,
    value: '',
    findedValue: '',
  }

  handleOpen = () => {

    const windowHeight = window.innerHeight
    const selectHeight = this.select.getBoundingClientRect().bottom
    const GAP = 255
    const toTop = windowHeight - selectHeight < GAP

    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
      toTop: prevState.isOpen ? false : toTop,
    }))

    this.input.focus()
  }

  handleSelectOption = (value) => {
    this.setState({ findedValue: value })
  }

  handleOnchange = (e) => {
    console.log(this.select.getBoundingClientRect());
    this.setState({ findedValue: e.target.value })
  }

  inputRef = (node) => { this.input = node }

  getRefSelect = (node) => { this.select = node }

  render() {
    const { isOpen, value, findedValue, toTop } = this.state;
    const options = Object.entries(data())
    const filteredValues = options.filter(([key, value]) =>
      findedValue ? value.toLowerCase().indexOf(findedValue.toLowerCase()) === 0 : true)
    const valuesLength = filteredValues.length
    const itemHeight = 48
    const topPositionList =
      valuesLength === 0
        ? 50 : valuesLength > 5
          ? 252 : itemHeight * valuesLength + 2

    const isMobile = mobileCheck()

    if (isMobile) {
      return (
        <div className="select">
          <select>
            {filteredValues.map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
          </select>
        </div>

      )
    }

    return (
      <div
        className={cn('select', {
          'select--open': isOpen,
          'select--to-top': toTop,
        })}
        ref={this.getRefSelect}
        onClick={this.handleOpen}
      >
        <input
          ref={this.inputRef}
          value={findedValue}
          onChange={this.handleOnchange}
          className="select__input"
          required
        />
        {!toTop && (
          <label className="select__label">
            Выберите страну
          </label>
        )}
        <div
          className={
            cn('select__list', {
              hidden: !isOpen,
            })
          }
          style={toTop ? { top: `-${topPositionList}px` } : {}}
        >
          {valuesLength > 0 ? (
            filteredValues.map(([key, value]) => (
              <div className="select__item" onClick={() => this.handleSelectOption(value)}>
                <span className="select__item--finded">{value.slice(0, findedValue.length)}</span>
                {value.slice(findedValue.length)}
              </div>
            ))
          ) : (
            <div className="select__item">
              Нет результатов
            </div>
          )}
        </div>
      </div>
    )
  }
}
