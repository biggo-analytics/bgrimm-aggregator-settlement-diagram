import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data, type }) => {
  const isSource = type === 'generation';

  return (
    <div className="bg-blue-50 border-2 border-slate-300 rounded-lg px-6 py-4 min-w-[200px] shadow-sm">
      {!isSource && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-blue-500"
        />
      )}

      <div className="flex flex-col">
        <div className="text-slate-700 font-semibold text-base">
          {data.label}
        </div>
        <div className="text-slate-500 text-sm mt-1">
          {data.value}
        </div>
      </div>

      {isSource && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-blue-500"
        />
      )}
    </div>
  );
};

export default CustomNode;
