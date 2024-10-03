import React from 'react';
import { render, cleanup } from '@testing-library/react';
import InfiniteScroll from '../index';

describe('React Infinite Scroll Component', () => {
  const originalConsoleError = console.error;

  afterEach(() => {
    cleanup();
    console.error = originalConsoleError;
  });

  it('renders .infiniteScroll', () => {
    const { container } = render(
      <InfiniteScroll
        dataLength={4}
        loader={'Loading...'}
        getData={() => {}}
      >
        <div />
      </InfiniteScroll>
    );
    expect(
      container.querySelectorAll('.infiniteScroll').length
    ).toBe(1);
  });

  it('renders custom class', () => {
    const { container } = render(
      <InfiniteScroll
        dataLength={4}
        loader={'Loading...'}
        className="custom-class"
        getData={() => {}}
      >
        <div />
      </InfiniteScroll>
    );
    expect(container.querySelectorAll('.custom-class').length).toBe(1);
  });

  it('renders children when passed in', () => {
    const { container } = render(
      <InfiniteScroll
        dataLength={4}
        loader={'Loading...'}
        getData={() => {}}
      >
        <div className="child" />
      </InfiniteScroll>
    );
    expect(container.querySelectorAll('.child').length).toBe(1);
  });

  it('calls scroll handler if provided, when user scrolls', () => {
    jest.useFakeTimers();
    const onScrollMock = jest.fn();

    const { container } = render(
      <InfiniteScroll
        onScroll={onScrollMock}
        dataLength={4}
        loader={'Loading...'}
        height={100}
        getData={() => {}}
      >
        <div />
      </InfiniteScroll>
    );

    const scrollEvent = new Event('scroll');
    const node = container.querySelector(
      '.infiniteScroll'
    );

    node.dispatchEvent(scrollEvent);
    jest.runOnlyPendingTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(onScrollMock).toHaveBeenCalled();
  });

  describe('When missing the dataLength prop', () => {
    it('throws an error', () => {
      console.error = jest.fn();
      const props = { loader: 'Loading...', getData: () => {} };
      expect(() => render(<InfiniteScroll {...props} />)).toThrow(Error);
      expect(console.error.mock.calls[0][0]).toContain(
        '"dataLength" cant be undefinded'
      );
    });
  });

  describe('When user scrolls to the bottom', () => {
    it('does not show loader if hasMore is false', () => {
      const { container, queryByText } = render(
        <InfiniteScroll
          dataLength={4}
          loader={'Loading...'}
          scrollThreshold={0}
          getData={() => {}}
        >
          <div />
        </InfiniteScroll>
      );

      const scrollEvent = new Event('scroll');
      const node = container.querySelector(
        '.infiniteScroll'
      );
      node.dispatchEvent(scrollEvent);
      expect(queryByText('Loading...')).toBeFalsy();
    });

    it('shows loader if hasMore is true', () => {
      const { container, getByText } = render(
        <InfiniteScroll
          dataLength={4}
          loader={'Loading...'}
          scrollThreshold={0}
          getData={() => {}}
          height={100}
        >
          <div />
        </InfiniteScroll>
      );

      const scrollEvent = new Event('scroll');
      const node = container.querySelector(
        '.infiniteScroll'
      );
      node.dispatchEvent(scrollEvent);
      expect(getByText('Loading...')).toBeTruthy();
    });
  });

  it('adds a classname to the outer div', () => {
    const { container } = render(
      <InfiniteScroll
        hasMore={true}
        dataLength={10}
        next={() => {}}
        loader={<div>Loading...</div>}
      >
        <div />
      </InfiniteScroll>
    );
    const outerDiv = container.getElementsByClassName(
      'infiniteScroll-outerDiv'
    );
    expect(outerDiv.length).toBeTruthy();
  });
});