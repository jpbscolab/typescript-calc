import { useState } from 'react';
import type { CalculatorState, Operation } from '../types/calculator';

const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operation: null,
  resetOnNextInput: false,
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);

  const calculate = (prev: string, current: string, operation: Operation): string => {
    const prevNum = parseFloat(prev);
    const currentNum = parseFloat(current);

    if (isNaN(prevNum) || isNaN(currentNum)) return current;

    switch (operation) {
      case '+':
        return String(prevNum + currentNum);
      case '-':
        return String(prevNum - currentNum);
      case '×':
        return String(prevNum * currentNum);
      case '÷':
        return currentNum === 0 ? 'Error' : String(prevNum / currentNum);
      default:
        return current;
    }
  };

  const handleNumber = (num: string) => {
    setState((prev) => {
      if (prev.resetOnNextInput) {
        return {
          ...prev,
          currentValue: num,
          resetOnNextInput: false,
        };
      }

      if (prev.currentValue === '0') {
        return { ...prev, currentValue: num };
      }

      return {
        ...prev,
        currentValue: prev.currentValue + num,
      };
    });
  };

  const handleOperation = (op: Operation) => {
    setState((prev) => {
      if (prev.previousValue && prev.operation && !prev.resetOnNextInput) {
        const result = calculate(prev.previousValue, prev.currentValue, prev.operation);
        return {
          currentValue: result,
          previousValue: result,
          operation: op,
          resetOnNextInput: true,
        };
      }

      return {
        ...prev,
        previousValue: prev.currentValue,
        operation: op,
        resetOnNextInput: true,
      };
    });
  };

  const handleEquals = () => {
    setState((prev) => {
      if (!prev.operation || !prev.previousValue) return prev;

      const result = calculate(prev.previousValue, prev.currentValue, prev.operation);
      return {
        currentValue: result,
        previousValue: '',
        operation: null,
        resetOnNextInput: true,
      };
    });
  };

  const handleClear = () => {
    setState(initialState);
  };

  const handleBackspace = () => {
    setState((prev) => {
      if (prev.currentValue.length <= 1) {
        return { ...prev, currentValue: '0' };
      }
      return {
        ...prev,
        currentValue: prev.currentValue.slice(0, -1),
      };
    });
  };

  const handleDecimal = () => {
    setState((prev) => {
      if (prev.resetOnNextInput) {
        return {
          ...prev,
          currentValue: '0.',
          resetOnNextInput: false,
        };
      }

      if (prev.currentValue.includes('.')) return prev;

      return {
        ...prev,
        currentValue: prev.currentValue + '.',
      };
    });
  };

  return {
    currentValue: state.currentValue,
    handleNumber,
    handleOperation,
    handleEquals,
    handleClear,
    handleBackspace,
    handleDecimal,
  };
};
