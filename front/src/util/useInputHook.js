import { useState } from 'react';

function useInputHook({ initialValue = '', validate = () => '', errorHandler = () => '' }) {
  const [input, setInput] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState('');
  const isError = 0 < errorMessage.length;

  const changeHandler = (e) => {
    setInput(e.target.value);
    setErrorMessage(validate(e.target.value, errorHandler));
  };

  const handleInputError = (error) => {
    setErrorMessage(errorHandler(error));
  };

  const resetValue = () => {
    setInput('');
    setErrorMessage('');
  };

  return {
    input,
    isError,
    errorMessage,
    changeHandler,
    handleInputError,
    resetValue,
  };
}

export default useInputHook;
