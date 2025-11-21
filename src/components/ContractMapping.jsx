import React, { useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  generation: (props) => <CustomNode {...props} type="generation" />,
  load: (props) => <CustomNode {...props} type="load" />,
};

// Color palette for edges
const edgeColors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const ContractMapping = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Initialize nodes and edges
  useEffect(() => {
    // Define generations
    const generations = [
      { id: 'gen-1', label: 'Gen D1', value: '3,000 kW' },
      { id: 'gen-2', label: 'Gen D2', value: '2,800 kW' },
      { id: 'gen-3', label: 'Gen D3', value: '2,500 kW' },
    ];

    // Define loads
    const loads = [
      { id: 'load-1', label: 'Load D1', value: '4,200 kW (60% allocation)' },
      { id: 'load-2', label: 'Load D2', value: '3,800 kW (40% allocation)' },
    ];

    // Create generation nodes
    const generationNodes = generations.map((gen, index) => ({
      id: gen.id,
      type: 'generation',
      position: { x: 100, y: 150 + index * 180 },
      data: { label: gen.label, value: gen.value },
      draggable: false,
    }));

    // Create load nodes
    const loadNodes = loads.map((load, index) => ({
      id: load.id,
      type: 'load',
      position: { x: 900, y: 200 + index * 200 },
      data: { label: load.label, value: load.value },
      draggable: false,
    }));

    setNodes([...generationNodes, ...loadNodes]);

    // Create sample connections
    const sampleEdges = [
      {
        id: 'edge-1',
        source: 'gen-1',
        target: 'load-1',
        type: 'default',
        animated: false,
        style: { stroke: edgeColors[0], strokeWidth: 3 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColors[0],
          width: 20,
          height: 20,
        },
        label: '50%',
        labelStyle: {
          fill: edgeColors[0],
          fontWeight: 700,
          fontSize: 14,
        },
        labelBgStyle: {
          fill: 'white',
          fillOpacity: 1,
          rx: 10,
        },
        labelBgPadding: [10, 6],
        labelBgBorderRadius: 20,
      },
      {
        id: 'edge-2',
        source: 'gen-2',
        target: 'load-1',
        type: 'default',
        animated: false,
        style: { stroke: edgeColors[1], strokeWidth: 3 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColors[1],
          width: 20,
          height: 20,
        },
        label: '30%',
        labelStyle: {
          fill: edgeColors[1],
          fontWeight: 700,
          fontSize: 14,
        },
        labelBgStyle: {
          fill: 'white',
          fillOpacity: 1,
          rx: 10,
        },
        labelBgPadding: [10, 6],
        labelBgBorderRadius: 20,
      },
      {
        id: 'edge-3',
        source: 'gen-3',
        target: 'load-1',
        type: 'default',
        animated: false,
        style: { stroke: edgeColors[2], strokeWidth: 3 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColors[2],
          width: 20,
          height: 20,
        },
        label: '20%',
        labelStyle: {
          fill: edgeColors[2],
          fontWeight: 700,
          fontSize: 14,
        },
        labelBgStyle: {
          fill: 'white',
          fillOpacity: 1,
          rx: 10,
        },
        labelBgPadding: [10, 6],
        labelBgBorderRadius: 20,
      },
      {
        id: 'edge-4',
        source: 'gen-2',
        target: 'load-2',
        type: 'default',
        animated: false,
        style: { stroke: edgeColors[3], strokeWidth: 3 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColors[3],
          width: 20,
          height: 20,
        },
        label: '60%',
        labelStyle: {
          fill: edgeColors[3],
          fontWeight: 700,
          fontSize: 14,
        },
        labelBgStyle: {
          fill: 'white',
          fillOpacity: 1,
          rx: 10,
        },
        labelBgPadding: [10, 6],
        labelBgBorderRadius: 20,
      },
      {
        id: 'edge-5',
        source: 'gen-3',
        target: 'load-2',
        type: 'default',
        animated: false,
        style: { stroke: edgeColors[4], strokeWidth: 3 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColors[4],
          width: 20,
          height: 20,
        },
        label: '40%',
        labelStyle: {
          fill: edgeColors[4],
          fontWeight: 700,
          fontSize: 14,
        },
        labelBgStyle: {
          fill: 'white',
          fillOpacity: 1,
          rx: 10,
        },
        labelBgPadding: [10, 6],
        labelBgBorderRadius: 20,
      },
    ];

    setEdges(sampleEdges);
  }, [setNodes, setEdges]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Contract Mapping</h1>
        <p className="text-sm text-gray-600 mt-1">Energy Distribution Diagram</p>
      </div>

      {/* React Flow Canvas */}
      <div className="w-full h-full pt-20">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
          className="bg-transparent"
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          panOnDrag={true}
          zoomOnScroll={true}
          minZoom={0.5}
          maxZoom={2}
        >
          <Background color="#d1d5db" gap={20} size={1} />
          <Controls className="bg-white border border-gray-300 rounded-lg shadow-md" />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Connections</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5" style={{ backgroundColor: edgeColors[0] }}></div>
            <span className="text-gray-600">Gen D1 → Load D1 (50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5" style={{ backgroundColor: edgeColors[1] }}></div>
            <span className="text-gray-600">Gen D2 → Load D1 (30%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5" style={{ backgroundColor: edgeColors[2] }}></div>
            <span className="text-gray-600">Gen D3 → Load D1 (20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5" style={{ backgroundColor: edgeColors[3] }}></div>
            <span className="text-gray-600">Gen D2 → Load D2 (60%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5" style={{ backgroundColor: edgeColors[4] }}></div>
            <span className="text-gray-600">Gen D3 → Load D2 (40%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractMapping;
