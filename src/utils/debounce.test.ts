import { debounce } from './debounce';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should call the function after the specified wait time', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalled();
  });

  it('should call the function with the correct arguments', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc('arg1', 'arg2');
    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should reset the timer if called again within the wait time', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    vi.advanceTimersByTime(500);
    debouncedFunc();
    vi.advanceTimersByTime(500);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalled();
  });
});
