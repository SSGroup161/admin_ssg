"use client";
import { useDroppable } from "@dnd-kit/core";
import CandidateCard from "./CandidateCard";

export default function HiringStageColumn({
    stage,
    candidates,
    totalCandidates,
    onSeeMore,
}) {
    const { setNodeRef } = useDroppable({
        id: stage.id,
        data: { stageId: stage.id },
    });

    // Tampilkan maksimal 5 kandidat pertama
    const displayedCandidates = candidates.slice(0, 10);

    return (
        <div
            ref={setNodeRef}
            className="flex-shrink-0 w-full bg-gray-50 rounded-lg p-3 border border-gray-200 flex flex-col"
        >
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-gray-700">{stage.title}</h2>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                    {totalCandidates} kandidat
                </span>
            </div>

            {/* Container card dengan scroll jika lebih dari 5 */}
            <div
                className={`space-y-2 xl:max-h-[50dvh] 2xl:max-h-[60dvh] overflow-y-auto`}
            >
                {displayedCandidates.length === 0 ? (
                    <div className="text-center text-gray-500 py-4 text-sm">
                        Tidak ada kandidat
                    </div>
                ) : (
                    displayedCandidates.map((candidate) => (
                        <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                        />
                    ))
                )}
            </div>

            {/* Tombol Lihat Semua jika lebih dari 5 kandidat */}
            {totalCandidates > 5 && (
                <button
                    onClick={() => onSeeMore()}
                    className="w-full text-sm text-primary hover:underline mt-2 text-center pt-2 cursor-pointer border-t border-gray-200"
                >
                    Lihat Semua ({totalCandidates})
                </button>
            )}
        </div>
    );
}
