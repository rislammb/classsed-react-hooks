import React, { useContext, useMemo, useRef } from 'react';
import PeopleContext from '../context/peopleContext';

import { useForm } from '../hooks';

const Form = () => {
  const context = useContext(PeopleContext);
  const firstnameInput = useRef(null);

  const validatePersonForm = values => {
    let errors = {};
    if (values.firstName.trim() === '') {
      errors.firstName = 'First name must not be empty';
    }
    if (values.lastName.trim() === '') {
      errors.lastName = 'Last name must not be empty';
    }
    return errors;
  };

  const addPersonFromForm = () => {
    context.addPerson(values);
    firstnameInput.current.focus();
  };

  const { values, errors, onChange, onSubmit } = useForm(
    addPersonFromForm,
    { firstName: '', lastName: '' },
    validatePersonForm
  );

  const printNumberOfPeople = () => {
    console.log(`Number of people: ${context.people.length}`);
  };

  useMemo(() => printNumberOfPeople(), [context.people]);

  return (
    <div className='col'>
      <h2>Add a Person: </h2>
      <hr />
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            name='firstName'
            className={`form-control ${errors.firstName && 'is-invalid'}`}
            placeholder='First Name..'
            value={values.firstName}
            ref={firstnameInput}
            onChange={onChange}
          />
          {errors.firstName && (
            <div className='invalid-feedback'>{errors.firstName}</div>
          )}
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='lastName'
            className={`form-control ${errors.lastName && 'is-invalid'}`}
            placeholder='Last Name..'
            value={values.lastName}
            onChange={onChange}
          />
          {errors.lastName && (
            <div className='invalid-feedback'>{errors.lastName}</div>
          )}
        </div>
        <button type='submit' className='btn btn-success'>
          Add Person
        </button>
      </form>
    </div>
  );
};

export default Form;
