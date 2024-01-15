import React, { useState , Fragment, useRef} from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [error, setError] = useState();

  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeInputRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    let enteredName = nameInputRef.current.value;
    let enteredAge = ageInputRef.current.value;
    let enteredCollege = collegeInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0 || enteredCollege.trim().length===0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name, age and college name (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredName, enteredAge, enteredCollege);
    nameInputRef.current.value='';
    ageInputRef.current.value='';
    collegeInputRef.current.value='';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          />
          <label htmlFor='college'>College Name</label>
          <input
            id='college'
            type='text'
            ref={collegeInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
