import React, { useState } from 'react';

const ConfigPanel = ({
  numGenerations,
  numLoads,
  generations,
  loads,
  edges,
  onGenerationsCountChange,
  onLoadsCountChange,
  onGenerationUpdate,
  onLoadUpdate,
  onEdgeLabelUpdate,
}) => {
  const [expandedSection, setExpandedSection] = useState('generations');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto shadow-lg">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600">
        <h2 className="text-xl font-bold text-white">Contract Mapping</h2>
        <p className="text-blue-100 text-sm mt-1">Configuration Panel</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Generation Count */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Generations
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={numGenerations}
            onChange={(e) => onGenerationsCountChange(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Generations List */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('generations')}
            className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-left font-semibold text-gray-800 flex justify-between items-center transition-colors"
          >
            <span>Generations</span>
            <span className="text-gray-500">
              {expandedSection === 'generations' ? '▼' : '▶'}
            </span>
          </button>
          {expandedSection === 'generations' && (
            <div className="p-4 space-y-3 bg-white">
              {generations.map((gen, index) => (
                <div key={gen.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="text-xs font-semibold text-gray-500 mb-2">
                    Generation {index + 1}
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={gen.label}
                      onChange={(e) => onGenerationUpdate(index, 'label', e.target.value)}
                      placeholder="Label"
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={gen.value}
                      onChange={(e) => onGenerationUpdate(index, 'value', e.target.value)}
                      placeholder="Value (e.g., 3,000 kW)"
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load Count */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Loads
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={numLoads}
            onChange={(e) => onLoadsCountChange(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loads List */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('loads')}
            className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-left font-semibold text-gray-800 flex justify-between items-center transition-colors"
          >
            <span>Loads</span>
            <span className="text-gray-500">
              {expandedSection === 'loads' ? '▼' : '▶'}
            </span>
          </button>
          {expandedSection === 'loads' && (
            <div className="p-4 space-y-3 bg-white">
              {loads.map((load, index) => (
                <div key={load.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="text-xs font-semibold text-gray-500 mb-2">
                    Load {index + 1}
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={load.label}
                      onChange={(e) => onLoadUpdate(index, 'label', e.target.value)}
                      placeholder="Label"
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={load.value}
                      onChange={(e) => onLoadUpdate(index, 'value', e.target.value)}
                      placeholder="Value (e.g., 4,200 kW)"
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Connections List */}
        {edges.length > 0 && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('connections')}
              className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-left font-semibold text-gray-800 flex justify-between items-center transition-colors"
            >
              <span>Connections ({edges.length})</span>
              <span className="text-gray-500">
                {expandedSection === 'connections' ? '▼' : '▶'}
              </span>
            </button>
            {expandedSection === 'connections' && (
              <div className="p-4 space-y-3 bg-white">
                {edges.map((edge, index) => (
                  <div key={edge.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="text-xs font-semibold text-gray-500 mb-2">
                      Connection {index + 1}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {edge.source} → {edge.target}
                    </div>
                    <input
                      type="text"
                      value={edge.label || ''}
                      onChange={(e) => onEdgeLabelUpdate(edge.id, e.target.value)}
                      placeholder="Percentage (e.g., 50%)"
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">How to use:</h3>
          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
            <li>Adjust the number of generations and loads</li>
            <li>Edit labels and values for each node</li>
            <li>Draw connections by dragging from generation to load</li>
            <li>Update connection percentages in the Connections section</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
