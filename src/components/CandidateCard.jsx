"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function CandidateCard({ candidate }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: candidate.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 0,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-2 ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
        >
            <h3 className="font-medium">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.email}</p>
            <p className="text-xs text-gray-500 mt-2">
                Applied: {candidate.appliedDate}
            </p>
        </div>
    );
}
