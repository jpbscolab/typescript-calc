import React from 'react';
import { useCalculator } from '../hooks/useCalculator';
import Display from './Display';
import Button from './Button';

const Calculator: React.FC = () => {
  const {
    currentValue,
    handleNumber,
    handleOperation,
    handleEquals,
    handleClear,
    handleBackspace,
    handleDecimal,
  } = useCalculator();

  const buttons = [
    // 1行目
    { label: 'AC', onClick: handleClear, className: 'operation' },
    { label: '⌫', onClick: handleBackspace, className: 'operation' },
    { label: '÷', onClick: () => handleOperation('÷'), className: 'operation' },
    { label: '×', onClick: () => handleOperation('×'), className: 'operation' },
    // 2行目
    { label: '7', onClick: () => handleNumber('7'), className: 'number' },
    { label: '8', onClick: () => handleNumber('8'), className: 'number' },
    { label: '9', onClick: () => handleNumber('9'), className: 'number' },
    { label: '-', onClick: () => handleOperation('-'), className: 'operation' },
    // 3行目
    { label: '4', onClick: () => handleNumber('4'), className: 'number' },
    { label: '5', onClick: () => handleNumber('5'), className: 'number' },
    { label: '6', onClick: () => handleNumber('6'), className: 'number' },
    { label: '+', onClick: () => handleOperation('+'), className: 'operation' },
    // 4行目
    { label: '1', onClick: () => handleNumber('1'), className: 'number' },
    { label: '2', onClick: () => handleNumber('2'), className: 'number' },
    { label: '3', onClick: () => handleNumber('3'), className: 'number' },
    { label: '=', onClick: handleEquals, className: 'equals' },
    // 5行目
    { label: '0', onClick: () => handleNumber('0'), className: 'number zero' },
    { label: '.', onClick: handleDecimal, className: 'number' },
  ];

  return (
    <div className="calculator">
      <Display value={currentValue} />
      <div className="buttons-grid">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            label={btn.label}
            onClick={btn.onClick}
            className={btn.className}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
