import React, { useState, useEffect } from 'react'
import './Input.scss'

export const Input = ({ Icon, id, type, text, onChange, validator, ...rest }) => {
  const [err, setErr] = useState('')
  const [err2, setErr2] = useState('')

  useEffect(() => {
    if (rest.disabled === true) {
      setErr2(err)
      const newErr = null
      setErr(newErr)
    } else {
      setErr(err2)
    }
  }, [rest.disabled])

  const handleChange = target => {
    const { value, id } = target
    onChange(value, id)
    if (!validator) return
    const err = validator(value)
    if (err) {
      target.classList.remove('success')
      target.classList.add('error')
      setErr(err)
    }
    else {
      target.classList.remove('error')
      target.classList.add('success')
      setErr(null)
    }
  }

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <input
          className="my-input"
          id={id && id.toString()}
          type={type || 'text'}
          placeholder={text}
          onChange={onChange && (e => handleChange(e.target))}
          {...rest}
        />
        {Icon && <Icon className={rest.disabled ? 'my-input-icon disabled' : 'my-input-icon'} />}
      </div>
      {err && <p className="my-input-err-text">{err}</p>}
    </div>
  )
}