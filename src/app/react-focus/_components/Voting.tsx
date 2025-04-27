"use client";

import { useState } from "react";

interface Candidate {
  id: string;
  name: string;
  votes: number;
}

export default function Voting() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: "1", name: "Alice", votes: 0 },
    { id: "2", name: "Bob", votes: 0 },
    { id: "3", name: "Charlie", votes: 0 },
  ]);

  const handleVote = (id: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">🗳️ Vote for Your Leader</h1>

      <div className="grid grid-cols-1 gap-6 w-full max-w-md">
        {candidates
          .sort((a, b) => b.votes - a.votes) // Sort by most votes
          .map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center justify-between transition"
            >
              <div>
                <h2 className="text-xl font-semibold">{candidate.name}</h2>
                <p className="text-gray-500">{candidate.votes} vote(s)</p>
              </div>

              <button
                onClick={() => handleVote(candidate.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Vote
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
