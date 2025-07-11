import React, { useState, useEffect } from 'react';

/**
 * Very lightweight responsive blog page builder based on CSS grid.
 *
 * Data structure (layout):
 * [
 *   {
 *     id: string,
 *     columns: [
 *       { id: string, content: string }
 *     ]
 *   }
 * ]
 */
export default function BlogBuilder({ value = [], onChange }) {
  const [layout, setLayout] = useState(value);

  // Notify parent whenever layout updates
  useEffect(() => {
    onChange && onChange(layout);
  }, [layout, onChange]);

  function addRow() {
    setLayout((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        columns: [
          { id: `${Date.now()}-0`, content: '' },
        ],
      },
    ]);
  }

  function addColumn(rowIndex) {
    setLayout((prev) => {
      const next = [...prev];
      const row = next[rowIndex];
      row.columns.push({ id: `${Date.now()}-${row.columns.length}`, content: '' });
      return next;
    });
  }

  function handleContentChange(rowIndex, colIndex, newContent) {
    setLayout((prev) => {
      const next = [...prev];
      next[rowIndex].columns[colIndex].content = newContent;
      return next;
    });
  }

  function deleteColumn(rowIndex, colIndex) {
    setLayout((prev) => {
      const next = [...prev];
      next[rowIndex].columns.splice(colIndex, 1);
      return next;
    });
  }

  function deleteRow(rowIndex) {
    setLayout((prev) => prev.filter((_, i) => i !== rowIndex));
  }

  return (
    <div className="space-y-6">
      {layout.map((row, rowIndex) => (
        <div key={row.id} className="border rounded p-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Row {rowIndex + 1}</span>
            <div className="space-x-2">
              <button
                onClick={() => addColumn(rowIndex)}
                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
              >
                + Col
              </button>
              <button
                onClick={() => deleteRow(rowIndex)}
                className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded"
              >
                Delete Row
              </button>
            </div>
          </div>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${row.columns.length}, minmax(0, 1fr))` }}
          >
            {row.columns.map((col, colIndex) => (
              <div key={col.id} className="relative border rounded p-2">
                <textarea
                  className="w-full h-32 p-2 border rounded focus:outline-none focus:ring"
                  value={col.content}
                  placeholder="Write content..."
                  onChange={(e) => handleContentChange(rowIndex, colIndex, e.target.value)}
                />
                <button
                  onClick={() => deleteColumn(rowIndex, colIndex)}
                  className="absolute top-1 right-1 text-red-500 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={addRow}
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Row
      </button>
    </div>
  );
}
