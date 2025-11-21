import React, { useCallback, useMemo, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import ConfigPanel from './ConfigPanel';

const nodeTypes = {
  generation: (props) => <CustomNode {...props} type="generation" />,
  load: (props) => <CustomNode {...props} type="load" />,
};

// Color palette for edges
const edgeColors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const ContractMapping = () => {
  // Configuration state
  const [numGenerations, setNumGenerations] = useState(3);
  const [numLoads, setNumLoads] = useState(2);
  const [generations, setGenerations] = useState([
    { id: 'gen-1', label: 'Gen D1', value: '3,000 kW' },
    { id: 'gen-2', label: 'Gen D2', value: '2,800 kW' },
    { id: 'gen-3', label: 'Gen D3', value: '2,500 kW' },
  ]);
  const [loads, setLoads] = useState([
    { id: 'load-1', label: 'Load D1', value: '4,200 kW' },
    { id: 'load-2', label: 'Load D2', value: '3,800 kW' },
  ]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Generate nodes based on configuration
  useEffect(() => {
    const generationNodes = generations.map((gen, index) => ({
      id: gen.id,
      type: 'generation',
      position: { x: 50, y: 100 + index * 150 },
      data: { label: gen.label, value: gen.value },
      draggable: false,
    }));

    const loadNodes = loads.map((load, index) => ({
      id: load.id,
      type: 'load',
      position: { x: 800, y: 100 + index * 150 },
      data: { label: load.label, value: load.value },
      draggable: false,
    }));

    setNodes([...generationNodes, ...loadNodes]);
  }, [generations, loads, setNodes]);

  // Handle connection
  const onConnect = useCallback(
    (params) => {
      const colorIndex = edges.length % edgeColors.length;
      const newEdge = {
        ...params,
        id: `edge-${edges.length + 1}`,
        type: 'smoothstep',
        animated: false,
        style: { stroke: edgeColors[colorIndex], strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColors[colorIndex],
        },
        label: '50%',
        labelStyle: {
          fill: edgeColors[colorIndex],
          fontWeight: 600,
          fontSize: 12,
        },
        labelBgStyle: {
          fill: 'white',
          fillOpacity: 0.9,
        },
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 50,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [edges.length, setEdges]
  );

  // Update number of generations
  const handleGenerationsCountChange = (count) => {
    setNumGenerations(count);
    const newGenerations = [];
    for (let i = 0; i < count; i++) {
      if (i < generations.length) {
        newGenerations.push(generations[i]);
      } else {
        newGenerations.push({
          id: `gen-${i + 1}`,
          label: `Gen ${String.fromCharCode(65 + i)}`,
          value: `${3000 - i * 200} kW`,
        });
      }
    }
    setGenerations(newGenerations);
  };

  // Update number of loads
  const handleLoadsCountChange = (count) => {
    setNumLoads(count);
    const newLoads = [];
    for (let i = 0; i < count; i++) {
      if (i < loads.length) {
        newLoads.push(loads[i]);
      } else {
        newLoads.push({
          id: `load-${i + 1}`,
          label: `Load ${String.fromCharCode(65 + i)}`,
          value: `${4000 - i * 200} kW`,
        });
      }
    }
    setLoads(newLoads);
  };

  // Update generation data
  const handleGenerationUpdate = (index, field, value) => {
    const updated = [...generations];
    updated[index][field] = value;
    setGenerations(updated);
  };

  // Update load data
  const handleLoadUpdate = (index, field, value) => {
    const updated = [...loads];
    updated[index][field] = value;
    setLoads(updated);
  };

  // Update edge label (percentage)
  const handleEdgeLabelUpdate = (edgeId, newLabel) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === edgeId ? { ...edge, label: newLabel } : edge
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Configuration Panel */}
      <ConfigPanel
        numGenerations={numGenerations}
        numLoads={numLoads}
        generations={generations}
        loads={loads}
        edges={edges}
        onGenerationsCountChange={handleGenerationsCountChange}
        onLoadsCountChange={handleLoadsCountChange}
        onGenerationUpdate={handleGenerationUpdate}
        onLoadUpdate={handleLoadUpdate}
        onEdgeLabelUpdate={handleEdgeLabelUpdate}
      />

      {/* React Flow Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
          className="bg-white"
        >
          <Background color="#e5e7eb" gap={16} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              if (node.type === 'generation') return '#bfdbfe';
              return '#bae6fd';
            }}
            className="bg-gray-100"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ContractMapping;
