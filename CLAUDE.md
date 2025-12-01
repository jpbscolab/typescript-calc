# CLAUDE.md - AI Assistant Guide for typescript-calc

## Project Overview

**typescript-calc** is a simple calculator application built with TypeScript. This document provides AI assistants with essential information about the codebase structure, development workflows, and conventions to follow.

**Project Description (Japanese):** TypeScriptで作ったシンプルな電卓アプリ

### Current State
- **Status:** Initial project setup
- **Language:** TypeScript
- **Primary Branch:** `main`
- **Development Branch Pattern:** `claude/claude-md-*` for AI-assisted development

## Repository Structure

### Expected Directory Layout

```
typescript-calc/
├── src/                    # Source code
│   ├── calculator.ts       # Core calculator logic
│   ├── operations.ts       # Mathematical operations
│   ├── ui/                 # UI components (if applicable)
│   └── utils/              # Utility functions
├── tests/                  # Test files
│   └── calculator.test.ts  # Unit tests
├── dist/                   # Compiled output (gitignored)
├── node_modules/           # Dependencies (gitignored)
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
└── CLAUDE.md               # This file
```

## Development Setup

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager
- TypeScript (installed as dev dependency)

### Initial Setup Commands

When setting up the project for the first time:

```bash
# Initialize npm project (if not done)
npm init -y

# Install TypeScript
npm install --save-dev typescript @types/node

# Install testing framework
npm install --save-dev jest @types/jest ts-jest

# Create TypeScript config
npx tsc --init
```

### Recommended package.json Scripts

```json
{
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts"
  }
}
```

## Code Conventions

### TypeScript Standards

1. **Type Safety**
   - Use explicit types for function parameters and return values
   - Avoid `any` type unless absolutely necessary
   - Prefer interfaces for object shapes
   - Use enums for fixed sets of values

2. **Naming Conventions**
   - **Files:** `camelCase.ts` or `kebab-case.ts`
   - **Classes:** `PascalCase`
   - **Functions/Variables:** `camelCase`
   - **Constants:** `UPPER_SNAKE_CASE`
   - **Interfaces:** `PascalCase` (prefix with `I` optional)

3. **Code Organization**
   - One class/interface per file (generally)
   - Group related functionality in modules
   - Export only what's needed publicly
   - Keep functions small and focused (single responsibility)

### Calculator-Specific Guidelines

1. **Operations**
   - Each mathematical operation should be a pure function
   - Handle edge cases (division by zero, overflow, etc.)
   - Support basic operations: add, subtract, multiply, divide
   - Consider advanced operations: power, square root, modulo

2. **Error Handling**
   - Use custom error types for calculator-specific errors
   - Validate inputs before processing
   - Return meaningful error messages

3. **Testing**
   - Write unit tests for all operations
   - Test edge cases and error conditions
   - Aim for >80% code coverage
   - Use descriptive test names

### Example Code Structure

```typescript
// src/types.ts
export interface CalculatorState {
  currentValue: number;
  previousValue: number | null;
  operation: Operation | null;
}

export enum Operation {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}

// src/calculator.ts
export class Calculator {
  private state: CalculatorState;

  constructor() {
    this.state = {
      currentValue: 0,
      previousValue: null,
      operation: null,
    };
  }

  public add(a: number, b: number): number {
    return a + b;
  }

  // ... other methods
}

// tests/calculator.test.ts
describe('Calculator', () => {
  let calc: Calculator;

  beforeEach(() => {
    calc = new Calculator();
  });

  test('should add two numbers correctly', () => {
    expect(calc.add(2, 3)).toBe(5);
  });
});
```

## Git Workflow

### Branch Strategy

- **main/master:** Production-ready code
- **claude/claude-md-[session-id]:** AI assistant working branches
- **feature/[feature-name]:** Manual feature development
- **bugfix/[bug-name]:** Bug fixes

### Commit Message Format

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(calculator): add square root operation
fix(operations): handle division by zero
docs(readme): update installation instructions
test(calculator): add edge case tests
```

### Git Operations Best Practices

1. **Always work on the designated branch**
   - Current branch: `claude/claude-md-mims3ds5hezid53r-01HinD5TzGaATWNx56DnPznU`
   - Never push to main without explicit permission

2. **Push with upstream tracking:**
   ```bash
   git push -u origin <branch-name>
   ```

3. **Retry logic for network failures:**
   - Retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

4. **Before committing:**
   - Run tests: `npm test`
   - Run linter: `npm run lint` (if configured)
   - Check build: `npm run build`

## AI Assistant Guidelines

### When Analyzing Code

1. **Read before modifying:** Always read files before suggesting changes
2. **Understand context:** Review related files to understand dependencies
3. **Check existing patterns:** Follow established code patterns in the repository
4. **Verify types:** Ensure TypeScript types are correct and consistent

### When Implementing Features

1. **Plan first:** Use TodoWrite tool for multi-step tasks
2. **Test-driven approach:**
   - Write tests first (or alongside implementation)
   - Ensure tests pass before committing
3. **Incremental commits:** Make small, focused commits
4. **Documentation:** Update README or add comments for complex logic

### When Fixing Bugs

1. **Reproduce first:** Understand the bug before fixing
2. **Add test:** Create a test that fails due to the bug
3. **Fix and verify:** Fix the bug and ensure the test passes
4. **Check side effects:** Ensure the fix doesn't break other functionality

### Security Considerations

1. **Input validation:** Always validate user input
2. **Avoid eval():** Never use `eval()` or `Function()` constructor
3. **Dependencies:** Keep dependencies updated and minimal
4. **No secrets:** Never commit API keys, tokens, or passwords

### Code Quality Checklist

Before finalizing changes, ensure:
- [ ] Code compiles without errors (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] No TypeScript errors or warnings
- [ ] Code follows naming conventions
- [ ] Functions are documented (for public API)
- [ ] No console.log statements in production code
- [ ] Error cases are handled appropriately
- [ ] Edge cases are tested

## Testing Strategy

### Unit Tests

- Test all public methods
- Test edge cases (empty input, null, undefined, very large numbers)
- Test error conditions
- Mock external dependencies if any

### Test Structure

```typescript
describe('Component/Feature', () => {
  describe('method/functionality', () => {
    it('should behave in expected way', () => {
      // Arrange
      const input = setupInput();

      // Act
      const result = performAction(input);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
```

## Common Tasks

### Adding a New Operation

1. Define operation in types/enums
2. Implement operation function (pure function preferred)
3. Add to Calculator class if needed
4. Write comprehensive tests
5. Update documentation

### Refactoring Code

1. Ensure tests exist and pass
2. Make incremental changes
3. Run tests after each change
4. Keep commits small and focused
5. Update documentation if interfaces change

### Updating Dependencies

1. Check for breaking changes in changelogs
2. Update one dependency at a time
3. Run tests after each update
4. Update code if breaking changes affect the project
5. Commit dependency updates separately

## Performance Considerations

1. **Avoid premature optimization:** Focus on correctness first
2. **Measure before optimizing:** Use profiling tools if needed
3. **Consider algorithmic complexity:** O(n) vs O(n²) matters for large inputs
4. **Memoization:** Cache expensive calculations if appropriate

## Debugging Tips

1. **Use TypeScript compiler:** Check `tsc --noEmit` for type errors
2. **Console logging:** Use temporarily, remove before commit
3. **Debugger:** Use VS Code debugger or Node debugger
4. **Test in isolation:** Isolate the problematic code in a test

## Resources

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Testing
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

### Best Practices
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

## Project-Specific Notes

### Calculator Requirements

**Basic Features:**
- Basic arithmetic operations (+, -, *, /)
- Clear/reset functionality
- Decimal number support
- Negative number support

**Potential Advanced Features:**
- Scientific calculator functions (sin, cos, tan, etc.)
- Memory operations (M+, M-, MR, MC)
- History of calculations
- Keyboard support
- GUI (web, desktop, or CLI)

### File Size Limits

- Keep individual files under 300 lines when possible
- Split large classes into smaller, focused modules
- Extract utilities into separate files

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review and update tests when adding features
- Keep documentation in sync with code
- Clean up unused code and comments

### When to Update This Document

- New major features added
- Significant architecture changes
- New conventions adopted
- New tools or frameworks integrated

---

**Last Updated:** 2025-12-01
**Project Version:** 0.1.0 (Initial Setup)
**Maintainer:** AI-assisted development
