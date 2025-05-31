import React, { useState, useEffect } from "react";

const defaultWorkouts = {
  A: [
    { name: "Squats", sets: 3, reps: 7, weight: 60 },
    { name: "Bench Press", sets: 3, reps: 8, weight: 60 },
    { name: "Overhead Barbell Press", sets: 3, reps: 8, weight: 35 },
    { name: "One-Arm Dumbbell Row", sets: 3, reps: 8, weight: 24 },
    { name: "Cable Pull Over", sets: 2, reps: 10, weight: 25 },
  ],

  B: [
    { name: "Deadlift", sets: 3, reps: 6, weight: 75 },
    { name: "Chin Up", sets: 3, reps: 4, weight: 0 },
    { name: "Dumbbell Bench Press", sets: 3, reps: 10, weight: 17.5 },
    { name: "Pause Squat", sets: 3, reps: 5, weight: 60 },
    { name: "Seated Dumbbell Press", sets: 3, reps: 10, weight: 15 },
  ],
};

export default function Workout() {
  const [workoutType, setWorkoutType] = useState("B");
  const [workout, setWorkout] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("currentWorkout"));
    const hist = JSON.parse(localStorage.getItem("workoutHistory")) || [];
    if (saved) {
      setWorkoutType(saved.type);
      setWorkout(saved.data);
    } else {
      setWorkout([...defaultWorkouts[workoutType]]);
    }
    setHistory(hist);
  }, []);

  useEffect(() => {
    setWorkout([...defaultWorkouts[workoutType]]);
  }, [workoutType]);

  const updateWorkout = () => {
    const entry = {
      date: new Date().toLocaleDateString(),
      type: workoutType,
      data: [...workout],
    };

    const newHistory = [...history, entry];
    setHistory(newHistory);
    localStorage.setItem("workoutHistory", JSON.stringify(newHistory));

    // שמירת האימון האחרון
    localStorage.setItem("currentWorkout", JSON.stringify({ type: workoutType, data: workout }));

    // מעבר לאימון הבא
    const nextWorkoutType = workoutType === "A" ? "B" : "A";
    setWorkoutType(nextWorkoutType);
  };

  const clearHistory = () => {
    const confirmed = window.confirm('Are you sure you want to clear the workout history?');
    if (!confirmed) return;

    localStorage.removeItem("workoutHistory");
    setHistory([]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...workout];
    updated[index][field] = parseInt(value);
    setWorkout(updated);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Workout {workoutType}
        </h1>
        <p className="text-sm font-normal text-gray-400 text-center mt-1">
          {new Date().toLocaleDateString()}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setWorkoutType(workoutType === "A" ? "B" : "A")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Switch Workout
          </button>
          <button
            onClick={updateWorkout}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Finish Workout
          </button>
        </div>

        <table className="w-full border-collapse text-center mt-4">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border border-gray-700">Exercise</th>
              <th className="p-2 border border-gray-700">Sets</th>
              <th className="p-2 border border-gray-700">Reps</th>
              <th className="p-2 border border-gray-700">Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {workout.map((exercise, idx) => (
              <tr key={idx} className="bg-gray-800 hover:bg-gray-700">
                <td className="p-2 border border-gray-700">{exercise.name}</td>
                <td className="p-2 border border-gray-700">
                  <input
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => handleChange(idx, "sets", e.target.value)}
                    className="bg-gray-700 text-white text-center w-16 rounded"
                  />
                </td>
                <td className="p-2 border border-gray-700">
                  <input
                    type="number"
                    value={exercise.reps}
                    onChange={(e) => handleChange(idx, "reps", e.target.value)}
                    className="bg-gray-700 text-white text-center w-16 rounded"
                  />
                </td>
                <td className="p-2 border border-gray-700">
                  <input
                    type="number"
                    value={exercise.weight}
                    onChange={(e) => handleChange(idx, "weight", e.target.value)}
                    className="bg-gray-700 text-white text-center w-16 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-semibold">Workout History</h2>
          <button
            onClick={clearHistory}
            className="text-sm text-red-400 hover:text-red-600 underline"
          >
            Clear History
          </button>
        </div>

        <ul className="space-y-4 text-sm">
          {history.map((entry, i) => (
            <li key={i} className="border border-gray-700 rounded p-3 bg-gray-800">
              <div className="font-semibold text-white mb-2">
                Workout {entry.type}
              </div>
              <div className="text-xs text-gray-400 mb-2">{entry.date}</div>
              <ul className="list-disc list-inside text-left">
                {entry.data.map((ex, j) => (
                  <li key={j}>
                    {ex.name} ({ex.sets}x{ex.reps} @ {ex.weight}kg)
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
