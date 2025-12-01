export type Operation = '+' | '-' | '×' | '÷' | null;

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: Operation;
  resetOnNextInput: boolean;
}

export type ButtonType = 'number' | 'operation' | 'equals' | 'clear' | 'backspace' | 'decimal';

export interface ButtonConfig {
  label: string;
  value: string;
  type: ButtonType;
  className?: string;
}
