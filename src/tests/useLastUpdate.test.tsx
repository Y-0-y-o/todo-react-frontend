import {cleanup, renderHook, act} from "@testing-library/react";
import useLastUpdate from "../customHooks/useLastUpdate";

afterEach(cleanup);

test("useLastUpdate with current time", () => {
    const { result } = renderHook(() => useLastUpdate(Date.now()) );
    let [theTimeThatPassed] = result.current;
    expect(theTimeThatPassed).toBe("Just now");
});

test("useLastUpdate with current time after 40sec", () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useLastUpdate(Date.now()) );

    act(() => {
        jest.advanceTimersByTime(40000);
    });

    let [theTimeThatPassed] = result.current;

    expect(theTimeThatPassed).toBe("40 seconds ago");

    jest.useRealTimers()
});

test("useLastUpdate with current time after 42min", () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useLastUpdate(Date.now()) );

    act(() => {
        jest.advanceTimersByTime(42 * 60000);
    });

    let [theTimeThatPassed] = result.current;

    expect(theTimeThatPassed).toBe("42 minutes ago");

    jest.useRealTimers()
});

test("useLastUpdate with current time resetTimer after 30sec", () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useLastUpdate(Date.now()) );

    act(() => {
        jest.advanceTimersByTime(30000);
    });

    let [theTimeThatPassed, resetTimer] = result.current;

    expect(theTimeThatPassed).toBe("30 seconds ago");

    act(() => {
        resetTimer();
    });

    let [theTimeThatPassed2] = result.current;

    expect(theTimeThatPassed2).toBe("Just now");

    jest.useRealTimers()
});