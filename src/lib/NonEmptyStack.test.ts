import NonEmptyStack from './NonEmptyStack'

test('create a stack from an array of values', () => {
  const stack = new NonEmptyStack([10, 20, 30])
  expect(stack.top()).toBe(30)
})

test('throw error when creating a stack without elements', () => {
  expect(() => new NonEmptyStack([])).toThrowError()
})

test('top returns the last value added to the stack', () => {
  const stack = new NonEmptyStack([10, 20, 30])
  expect(stack.top()).toBe(30)
})

test('bottom returns the first element added to the stack', () => {
  const stack = new NonEmptyStack([10, 20, 30])
  expect(stack.bottom()).toBe(10)
})

test('push creates a copy of the stack and adds element to top', () => {
  const stack = new NonEmptyStack([10])
  const stackUpdate = stack.push(20)
  expect(stackUpdate.top()).toBe(20)
})

test('pop creates a copy of the stack and removes the top element', () => {
  const stack = new NonEmptyStack(['a', 'b', 'c'])
  const stackUpdate = stack.pop()
  expect(stackUpdate.top()).toBe('b')
})

test('push does not mutate original object instance', () => {
  const stack = new NonEmptyStack([10])
  stack.push(20)
  expect(stack.top()).toBe(10)
})

test('pop does not mutate original object instance', () => {
  const stack = new NonEmptyStack([10, 20, 30])
  stack.pop()
  expect(stack.top()).toBe(30)
})

test('pop throws an error when trying to pop last element', () => {
  const stack = new NonEmptyStack([10])
  expect(() => stack.pop()).toThrowError()
})

