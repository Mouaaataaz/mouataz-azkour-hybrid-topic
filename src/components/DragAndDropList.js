"use client";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { useState } from "react";

const initialItems = [
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
];

export default function DragAndDropList() {
    const [items, setItems] = useState(initialItems);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedItems = [...items];
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        setItems(reorderedItems);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            padding: "10px",
                            background: "#f8f9fa",
                            borderRadius: "8px",
                            listStyleType: "none",
                            width: "300px",
                        }}
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <motion.li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        layout
                                        initial={{ scale: 1 }}
                                        whileTap={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        style={{
                                            padding: "12px",
                                            marginBottom: "8px",
                                            backgroundColor: "lightblue",
                                            cursor: "grab",
                                            borderRadius: "5px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "1px solid #ccc",
                                        }}
                                    >
                                        {item.content}
                                    </motion.li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}
