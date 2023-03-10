import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import React from "react";

const Droppable = ({ id, items, allItems, setItems }) => {
  const { setNodeRef } = useDroppable({ id });

  const droppableStyle = {
    padding: "20px 10px",
    border: "1px solid black",
    borderRadius: "5px",
    minWidth: 200,
    height: 400,
    marginLeft: 8,
    marginRight: 8,
    overflowY: 'auto',
    overflowX: 'hidden'
  };

  const addBtnStyle = {
    minWidth: 194,
    height: 40,
    marginBottom: 5,
    borderRadius: 5,
    border: "1px solid gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }

  const handleRemoveBtnClick = (item) => {
    const index = items.indexOf(item);
    let _items = [...items]
    if (index > -1) {
      _items.splice(index, 1);
    }
    setItems(id, _items);
  };

  const handleAddBtnClick = () => {
    let group1 = allItems.group1.map((item) => parseInt(item))
    let group2 = allItems.group2.map((item) => parseInt(item))
    let group3 = allItems.group3.map((item) => parseInt(item))

    const itemIndex = Math.max(...[...group1, ...group2, ...group3])
    setItems(id, [...items, (itemIndex + 1).toString()])
  }

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy} >
      <div ref={setNodeRef} style={droppableStyle}>
        <button style={addBtnStyle} onClick={() => handleAddBtnClick()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16" style={{marginRight: '8px'}}>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        </button>
        {items.map((item) => (
          <SortableItem key={item} id={item} handleRemoveBtnClick={handleRemoveBtnClick} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Droppable;
