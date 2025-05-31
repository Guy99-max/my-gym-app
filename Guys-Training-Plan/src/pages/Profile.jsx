import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('profileEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [chest, setChest] = useState('');

  // שגיאות רק למחיקה
  const [errors, setErrors] = useState({ weight: '', waist: '', chest: '' });

  useEffect(() => {
    localStorage.setItem('profileEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // מוסיפים בלי אימות כי אמרת רק למחיקה
    const newEntry = {
      date: new Date().toLocaleDateString(),
      weight,
      waist,
      chest,
    };
    setEntries([newEntry, ...entries]);
    setWeight('');
    setWaist('');
    setChest('');
    setErrors({ weight: '', waist: '', chest: '' });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { weight: '', waist: '', chest: '' };

    // בודקים את כל ה־entries, לא רק השדות הריקים
    for (let entry of entries) {
      if (!entry.weight || isNaN(entry.weight) || Number(entry.weight) <= 0) {
        newErrors.weight = 'Some entries have invalid weight';
        valid = false;
      }
      if (!entry.waist || isNaN(entry.waist) || Number(entry.waist) <= 0) {
        newErrors.waist = 'Some entries have invalid waist';
        valid = false;
      }
      if (!entry.chest || isNaN(entry.chest) || Number(entry.chest) <= 0) {
        newErrors.chest = 'Some entries have invalid chest';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleClear = () => {
    if (!validate()) {
      return;
    }
    const confirmed = window.confirm('Are you sure you want to clear all data?');
    if (!confirmed) {
      return;
    }
    setEntries([]);
    localStorage.removeItem('profileEntries');
    setErrors({ weight: '', waist: '', chest: '' });
  };


  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-4 rounded-xl shadow-md">
        <div className="flex flex-col">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          {errors.weight && <span className="text-red-500 text-sm mt-1">{errors.weight}</span>}
        </div>
        <div className="flex flex-col">
          <label>Waist (cm)</label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          {errors.waist && <span className="text-red-500 text-sm mt-1">{errors.waist}</span>}
        </div>
        <div className="flex flex-col">
          <label>Chest (cm)</label>
          <input
            type="number"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          {errors.chest && <span className="text-red-500 text-sm mt-1">{errors.chest}</span>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Add Measurement
        </button>
      </form>

      {entries.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">Measurement History</h3>
            <button
              onClick={handleClear}
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
            >
              Clear All
            </button>
          </div>
          <table className="w-full table-auto border-collapse bg-gray-900 text-white">
            <thead>
              <tr>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Weight</th>
                <th className="border px-2 py-1">Waist</th>
                <th className="border px-2 py-1">Chest</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-2 py-1">{entry.date}</td>
                  <td className="border px-2 py-1">{entry.weight} kg</td>
                  <td className="border px-2 py-1">{entry.waist} cm</td>
                  <td className="border px-2 py-1">{entry.chest} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
