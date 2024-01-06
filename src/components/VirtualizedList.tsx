import React, { useState, useEffect, useRef, useCallback } from "react";

type Props<T> = {
  data: T[];
  itemHeight: number;
  visibleItems: number;
  renderItem: (item: T) => React.ReactNode;
};

function VirtualizedList<T>({
  data,
  itemHeight,
  visibleItems,
  renderItem,
}: Props<T>) {
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const totalItems = data.length;

  const handleScroll = () => {
    if (listRef.current) {
      const newVisibleStartIndex = Math.floor(
        listRef.current.scrollTop / itemHeight
      );
      setVisibleStartIndex(newVisibleStartIndex);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const getVisibleItems = useCallback(() => {
    const visibleEndIndex = visibleStartIndex + visibleItems;
    return data.slice(visibleStartIndex, visibleEndIndex);
  }, [visibleStartIndex, visibleItems, data]);

  return (
    <div
      ref={listRef}
      style={{ height: `${visibleItems * itemHeight}px`, overflow: "auto" }}
    >
      <div
        style={{ height: `${totalItems * itemHeight}px`, position: "relative" }}
      >
        {getVisibleItems().map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>
    </div>
  );
}

export default VirtualizedList;
