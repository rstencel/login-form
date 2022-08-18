import React from 'react'
import classNames from 'classnames'

const Input = React.forwardRef(({ type = 'text', placeholder, invalid = false, ...otherProps }, ref) => (
  <input
    {...otherProps}
    ref={ref}
    type={type}
    placeholder={placeholder}
    className={classNames({ 'validation-error': invalid })}
  />
))

Input.displayName = 'Input'

export default Input
