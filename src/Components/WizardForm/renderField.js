/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const renderField = ({
  input, label, type, meta: { touched, error },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export default renderField;
