# Contract Mapping - Energy Distribution Diagram

เอกสารฉบับนี้อธิบายการทำงานของระบบ Contract Mapping แบบละเอียด สำหรับการแสดงผังการกระจายพลังงานจากแหล่งผลิต (Generations) ไปยังภาระ (Loads)

## สารบัญ

1. [ภาพรวมระบบ](#ภาพรวมระบบ)
2. [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
3. [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)
4. [การติดตั้ง](#การติดตั้ง)
5. [อธิบาย Code แต่ละส่วน](#อธิบาย-code-แต่ละส่วน)
6. [คู่มือการเพิ่ม/ลด Nodes](#คู่มือการเพิ่มลด-nodes)
7. [คู่มือการเพิ่ม/ลด Connections](#คู่มือการเพิ่มลด-connections)
8. [การปรับแต่งขั้นสูง](#การปรับแต่งขั้นสูง)
9. [วิธีการใช้งาน](#วิธีการใช้งาน)
10. [Troubleshooting](#troubleshooting)

---

## ภาพรวมระบบ

ระบบนี้เป็น Web Application ที่สร้างด้วย React และใช้ React Flow library เพื่อแสดงผัง (diagram) การกระจายพลังงาน โดยมีคุณสมบัติหลักดังนี้:

- **แสดงโหนด (Nodes)**: ด้านซ้ายเป็นแหล่งผลิตไฟฟ้า (Generations), ด้านขวาเป็นภาระ (Loads)
- **เส้นเชื่อมต่อ (Edges)**: แสดงการกระจายพลังงานจาก Generation ไปยัง Load พร้อมเปอร์เซ็นต์การจัดสรร
- **การตกแต่ง**: ใช้ Tailwind CSS สำหรับ styling ที่สวยงามและทันสมัย
- **อินเทอร์แอคทีฟ**: รองรับการซูม, แพน, และดูรายละเอียดของแต่ละเส้นเชื่อมต่อ

### ตัวอย่างการแสดงผล

- **Generation Nodes**: Gen D1 (3,000 kW), Gen D2 (2,800 kW), Gen D3 (2,500 kW)
- **Load Nodes**: Load D1 (4,200 kW), Load D2 (3,800 kW)
- **Connections**:
  - Gen D1 → Load D1 (50%)
  - Gen D2 → Load D1 (30%) และ Load D2 (60%)
  - Gen D3 → Load D1 (20%) และ Load D2 (40%)

---

## โครงสร้างโปรเจค

```
bgrimm-aggregator-settlement-diagram/
├── src/
│   ├── components/
│   │   ├── ContractMapping.jsx    # Component หลักของระบบ
│   │   ├── CustomNode.jsx          # Component สำหรับแสดง Node แต่ละตัว
│   │   └── ConfigPanel.jsx         # (ไม่ได้ใช้ในเวอร์ชันนี้)
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
└── README.md                       # เอกสารนี้
```

---

## เทคโนโลยีที่ใช้

### Core Technologies

1. **React 18.2.0**
   - JavaScript library สำหรับสร้าง UI
   - ใช้ Functional Components และ Hooks

2. **React Flow 11.10.4**
   - Library สำหรับสร้างผังแบบ flow-based
   - รองรับการจัดการ nodes, edges, และ interactions

3. **Tailwind CSS 3.4.0**
   - Utility-first CSS framework
   - ใช้สำหรับ styling ทั้งหมดในโปรเจค

4. **Vite 5.0.8**
   - Build tool ที่รวดเร็ว
   - รองรับ Hot Module Replacement (HMR)

### DevDependencies

- `@vitejs/plugin-react`: Vite plugin สำหรับ React
- `autoprefixer`: เพิ่ม vendor prefixes อัตโนมัติ
- `postcss`: CSS preprocessor

---

## การติดตั้ง

### ข้อกำหนดระบบ

- Node.js >= 16.x
- npm >= 8.x

### ขั้นตอนการติดตั้ง

```bash
# 1. Clone repository
git clone <repository-url>
cd bgrimm-aggregator-settlement-diagram

# 2. ติดตั้ง dependencies
npm install

# 3. รัน development server
npm run dev

# 4. เปิดเบราว์เซอร์ที่ http://localhost:3000
```

### คำสั่งที่สำคัญ

```bash
# รัน development server
npm run dev

# Build สำหรับ production
npm run build

# Preview production build
npm run preview
```

---

## อธิบาย Code แต่ละส่วน

### 1. main.jsx - Entry Point

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**อธิบาย:**
- นี่คือจุดเริ่มต้นของแอพพลิเคชัน
- ใช้ `ReactDOM.createRoot()` เพื่อสร้าง root และ render `<App />` component
- `React.StrictMode` ช่วยในการตรวจสอบปัญหาที่อาจเกิดขึ้น

---

### 2. App.jsx - Root Component

```javascript
import React from 'react';
import ContractMapping from './components/ContractMapping';

function App() {
  return (
    <div className="App">
      <ContractMapping />
    </div>
  );
}

export default App;
```

**อธิบาย:**
- Component หลักที่ wrap ทั้งแอพพลิเคชัน
- ใช้แค่เรียก `<ContractMapping />` component

---

### 3. CustomNode.jsx - Custom Node Component

```javascript
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
```

**อธิบายแต่ละส่วน:**

#### Props
- `data`: ข้อมูลของ node (label และ value)
- `type`: ประเภทของ node ('generation' หรือ 'load')

#### การทำงาน
1. **ตรวจสอบประเภท**: `const isSource = type === 'generation'`
   - ถ้าเป็น 'generation' จะเป็น source node (มี handle ด้านขวา)
   - ถ้าเป็น 'load' จะเป็น target node (มี handle ด้านซ้าย)

2. **Handle Component**:
   - `Handle` จาก React Flow คือจุดเชื่อมต่อ
   - `Position.Left`: Handle อยู่ด้านซ้ายของ node (สำหรับ Load)
   - `Position.Right`: Handle อยู่ด้านขวาของ node (สำหรับ Generation)

3. **Styling**:
   - `bg-blue-50`: สีพื้นหลังฟ้าอ่อน
   - `border-2 border-slate-300`: เส้นขอบสี slate
   - `rounded-lg`: มุมโค้งมน
   - `shadow-sm`: เงาเบาๆ

4. **ข้อมูลที่แสดง**:
   - `data.label`: ชื่อของ node (เช่น "Gen D1")
   - `data.value`: ค่าพลังงาน (เช่น "3,000 kW")

---

### 4. ContractMapping.jsx - Main Component

นี่คือ component หลักที่มีความซับซ้อนที่สุด เราจะแบ่งอธิบายเป็นส่วนๆ

#### 4.1 Import และ Setup

```javascript
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
```

**อธิบาย:**
- `useNodesState`, `useEdgesState`: Hooks จาก React Flow สำหรับจัดการ state ของ nodes และ edges
- `MarkerType`: ใช้สำหรับกำหนดประเภทของ marker (ลูกศร)
- `Controls`: Component สำหรับควบคุมการซูมและแพน
- `Background`: Component สำหรับแสดงพื้นหลังแบบ grid

#### 4.2 Node Types และ Color Palette

```javascript
const nodeTypes = {
  generation: (props) => <CustomNode {...props} type="generation" />,
  load: (props) => <CustomNode {...props} type="load" />,
};

const edgeColors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
```

**อธิบาย:**
- `nodeTypes`: กำหนด custom node types สำหรับ React Flow
  - `generation`: Node สำหรับแหล่งผลิต
  - `load`: Node สำหรับภาระ
- `edgeColors`: ชุดสีสำหรับเส้นเชื่อมต่อ (5 สี)
  - `#3b82f6`: สีน้ำเงิน (Blue 500)
  - `#06b6d4`: สีฟ้า (Cyan 500)
  - `#10b981`: สีเขียว (Emerald 500)
  - `#f59e0b`: สีส้ม (Amber 500)
  - `#ef4444`: สีแดง (Red 500)

#### 4.3 State Management

```javascript
const [nodes, setNodes, onNodesChange] = useNodesState([]);
const [edges, setEdges, onEdgesChange] = useEdgesState([]);
```

**อธิบาย:**
- `useNodesState`: Hook สำหรับจัดการ state ของ nodes
  - `nodes`: array ของ nodes
  - `setNodes`: function สำหรับ update nodes
  - `onNodesChange`: handler สำหรับการเปลี่ยนแปลง nodes (drag, select, etc.)
- `useEdgesState`: Hook สำหรับจัดการ state ของ edges (เส้นเชื่อมต่อ)

#### 4.4 Initialize Data (useEffect)

```javascript
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

  // ... (edges code continues)
}, [setNodes, setEdges]);
```

**อธิบายแต่ละส่วน:**

1. **การกำหนดข้อมูล Generations**:
   - แต่ละ generation มี `id`, `label`, และ `value`
   - `id`: ใช้เป็น unique identifier (ห้ามซ้ำ)
   - `label`: ชื่อที่แสดงบน node
   - `value`: ค่าพลังงาน

2. **การกำหนดข้อมูล Loads**:
   - โครงสร้างเหมือน generations
   - เพิ่มข้อมูล allocation percentage ใน value

3. **การสร้าง Generation Nodes**:
   ```javascript
   position: { x: 100, y: 150 + index * 180 }
   ```
   - `x: 100`: ตำแหน่ง horizontal (ซ้าย)
   - `y: 150 + index * 180`: ตำแหน่ง vertical
     - Node แรก (index=0): y = 150
     - Node ที่สอง (index=1): y = 150 + 180 = 330
     - Node ที่สาม (index=2): y = 150 + 360 = 510
   - เว้นระยะ 180 pixels ระหว่าง nodes

4. **การสร้าง Load Nodes**:
   ```javascript
   position: { x: 900, y: 200 + index * 200 }
   ```
   - `x: 900`: ตำแหน่ง horizontal (ขวา)
   - `y: 200 + index * 200`: ตำแหน่ง vertical เว้นระยะ 200 pixels

5. **`draggable: false`**: ป้องกันไม่ให้ผู้ใช้ลาก node ได้

#### 4.5 Create Sample Edges

```javascript
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
    labelPosition: 0.5,
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
    interactionWidth: 30,
  },
  // ... edges อื่นๆ
];
```

**อธิบายแต่ละ property:**

**Basic Properties:**
- `id`: unique identifier ของ edge (ต้องไม่ซ้ำกัน)
- `source`: id ของ node ต้นทาง (generation)
- `target`: id ของ node ปลายทาง (load)
- `type: 'default'`: ใช้ edge type แบบ default (เส้นโค้ง bezier smooth)
- `animated: false`: ไม่ให้เส้นเคลื่อนไหว (ถ้าเป็น true จะมี animation ไหลไปตาม edge)

**Style Properties:**
- `style.stroke`: สีของเส้น (ใช้สีจาก edgeColors array)
- `style.strokeWidth: 3`: ความหนาของเส้น (3 pixels)

**Marker (ลูกศร):**
- `markerEnd`: กำหนดลูกศรที่ปลายทาง
- `MarkerType.ArrowClosed`: ลูกศรแบบปิด (มีหลายแบบ: Arrow, ArrowClosed)
- `color`: สีของลูกศร (ควรตรงกับสีเส้น)
- `width: 20`, `height: 20`: ขนาดของลูกศร (20x20 pixels)

**Label (ป้ายเปอร์เซ็นต์):**
- `label: '50%'`: ข้อความที่แสดง (สามารถใส่ text อะไรก็ได้)
- `labelPosition: 0.5`: ตำแหน่งของ label บนเส้น
  - `0` = ที่จุดเริ่มต้น (source)
  - `0.5` = ตรงกลางเส้น
  - `1` = ที่จุดสิ้นสุด (target)
  - **สำคัญ**: ใช้ labelPosition เพื่อป้องกันการทับกันของ labels
- `labelStyle.fill`: สีของข้อความ (ตรงกับสีเส้น)
- `labelStyle.fontWeight: 700`: ตัวหนา (700 = bold)
- `labelStyle.fontSize: 14`: ขนาดตัวอักษร 14px

**Label Background:**
- `labelBgStyle.fill: 'white'`: พื้นหลังสีขาว
- `labelBgStyle.fillOpacity: 1`: ความทึบแสง 100%
- `labelBgStyle.rx: 10`: มุมโค้งมน
- `labelBgPadding: [10, 6]`: padding รอบๆ ข้อความ (horizontal 10px, vertical 6px)
- `labelBgBorderRadius: 20`: มุมโค้งมนของพื้นหลัง

**Interaction:**
- `interactionWidth: 30`: ความกว้างของพื้นที่สำหรับ click/hover (30 pixels)
  - เพิ่มพื้นที่รอบเส้นที่สามารถ click หรือ hover ได้
  - ทำให้ง่ายต่อการ interact กับ edge โดยไม่ต้อง click ตรงเส้นพอดี

#### 4.6 Render (JSX)

```javascript
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
        {/* ... connections อื่นๆ */}
      </div>
    </div>
  </div>
);
```

**อธิบายแต่ละส่วน:**

1. **Container**:
   ```javascript
   className="w-screen h-screen bg-gradient-to-br from-gray-50 to-gray-100"
   ```
   - `w-screen h-screen`: เต็มหน้าจอ
   - `bg-gradient-to-br from-gray-50 to-gray-100`: พื้นหลัง gradient จากซ้ายบนไปขวาล่าง

2. **Header**:
   ```javascript
   className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm"
   ```
   - `absolute`: position แบบ absolute
   - `top-0 left-0 right-0`: ติดขอบบน ซ้าย ขวา
   - `z-10`: อยู่ด้านบนสุด
   - `bg-white/80`: พื้นหลังสีขาว ความทึบแสง 80%
   - `backdrop-blur-sm`: เบลอพื้นหลังเบาๆ

3. **ReactFlow Component Props**:
   - `nodes={nodes}`: ส่ง nodes data
   - `edges={edges}`: ส่ง edges data
   - `onNodesChange={onNodesChange}`: handler เมื่อ nodes เปลี่ยนแปลง
   - `onEdgesChange={onEdgesChange}`: handler เมื่อ edges เปลี่ยนแปลง
   - `nodeTypes={nodeTypes}`: กำหนด custom node types
   - `fitView`: ปรับ view ให้พอดีกับเนื้อหา
   - `nodesDraggable={false}`: ป้องกันการลาก nodes
   - `nodesConnectable={false}`: ป้องกันการเชื่อมต่อ nodes ใหม่
   - `elementsSelectable={true}`: อนุญาตให้เลือก elements
   - `panOnDrag={true}`: อนุญาตให้แพน (ลากเลื่อน canvas)
   - `zoomOnScroll={true}`: อนุญาตให้ซูมด้วย scroll wheel
   - `minZoom={0.5}`: ซูมเล็กสุด 50%
   - `maxZoom={2}`: ซูมใหญ่สุด 200%

4. **Background Component**:
   ```javascript
   <Background color="#d1d5db" gap={20} size={1} />
   ```
   - `color`: สีของ grid
   - `gap`: ระยะห่างระหว่าง grid (20 pixels)
   - `size`: ขนาดของจุด grid (1 pixel)

5. **Controls Component**:
   ```javascript
   <Controls className="bg-white border border-gray-300 rounded-lg shadow-md" />
   ```
   - แสดงปุ่มควบคุม zoom และ fit view
   - ใช้ Tailwind classes เพื่อ customize

6. **Legend (คำอธิบาย)**:
   - แสดงรายการ connections ทั้งหมดพร้อมสี
   - `absolute bottom-4 left-1/2 -translate-x-1/2`: วางตรงกลางด้านล่าง
   - `bg-white/90`: พื้นหลังสีขาว ความทึบแสง 90%
   - แสดงเส้นสีและข้อความอธิบายแบบแนวนอน

---

## คู่มือการเพิ่ม/ลด Nodes

ส่วนนี้จะอธิบายวิธีการเพิ่มหรือลด Generation และ Load nodes อย่างละเอียด

### การเพิ่ม Generation Node

**ขั้นตอนที่ 1: เพิ่มข้อมูลใน generations array**

เปิดไฟล์ `src/components/ContractMapping.jsx` และหาส่วน `useEffect` (ประมาณบรรทัด 25-38):

```javascript
// Define generations
const generations = [
  { id: 'gen-1', label: 'Gen D1', value: '3,000 kW' },
  { id: 'gen-2', label: 'Gen D2', value: '2,800 kW' },
  { id: 'gen-3', label: 'Gen D3', value: '2,500 kW' },
  // เพิ่ม generation ใหม่ที่นี่
  { id: 'gen-4', label: 'Gen D4', value: '2,200 kW' },
];
```

**คำอธิบาย Properties:**
- `id`: ต้องไม่ซ้ำกับ id อื่นๆ (ใช้รูปแบบ 'gen-X' โดย X เป็นตัวเลข)
- `label`: ชื่อที่จะแสดงบน node (สามารถตั้งชื่ออะไรก็ได้)
- `value`: ค่าพลังงาน (แนะนำให้ใส่หน่วย kW)

**ขั้นตอนที่ 2: (Optional) ปรับตำแหน่ง**

ถ้าต้องการปรับระยะห่างระหว่าง nodes ให้เหมาะสม แก้ไขที่:

```javascript
// Create generation nodes
const generationNodes = generations.map((gen, index) => ({
  id: gen.id,
  type: 'generation',
  position: { x: 100, y: 150 + index * 180 }, // เปลี่ยน 180 เป็นค่าอื่นได้
  data: { label: gen.label, value: gen.value },
  draggable: false,
}));
```

**ตัวอย่างการปรับระยะห่าง:**
- ถ้ามี 4 nodes: ใช้ระยะห่าง 150-180 pixels
- ถ้ามี 5+ nodes: ใช้ระยะห่าง 120-150 pixels
- สูตร: `y = เริ่มต้น + (index × ระยะห่าง)`

**ผลลัพธ์:**
- จะมี generation node เพิ่มขึ้นด้านซ้ายของ diagram
- Node จะจัดเรียงตามลำดับในarray

### การลด Generation Node

**วิธีที่ 1: ลบออกจาก array**

```javascript
const generations = [
  { id: 'gen-1', label: 'Gen D1', value: '3,000 kW' },
  { id: 'gen-2', label: 'Gen D2', value: '2,800 kW' },
  // ลบ gen-3 ออก (ลบทั้งบรรทัด)
];
```

**วิธีที่ 2: Comment ออก**

```javascript
const generations = [
  { id: 'gen-1', label: 'Gen D1', value: '3,000 kW' },
  { id: 'gen-2', label: 'Gen D2', value: '2,800 kW' },
  // { id: 'gen-3', label: 'Gen D3', value: '2,500 kW' }, // comment ออกชั่วคราว
];
```

**⚠️ สิ่งสำคัญ:**
- ถ้าลบ generation node ต้องลบ edges ที่เชื่อมต่อกับ node นั้นด้วย
- มิฉะนั้นจะ error เพราะหา source node ไม่เจอ

### การเพิ่ม Load Node

**ขั้นตอนที่ 1: เพิ่มข้อมูลใน loads array**

```javascript
// Define loads
const loads = [
  { id: 'load-1', label: 'Load D1', value: '4,200 kW (60% allocation)' },
  { id: 'load-2', label: 'Load D2', value: '3,800 kW (40% allocation)' },
  // เพิ่ม load ใหม่ที่นี่
  { id: 'load-3', label: 'Load D3', value: '3,000 kW (30% allocation)' },
];
```

**ขั้นตอนที่ 2: (Optional) ปรับตำแหน่ง**

```javascript
// Create load nodes
const loadNodes = loads.map((load, index) => ({
  id: load.id,
  type: 'load',
  position: { x: 900, y: 200 + index * 200 }, // เปลี่ยน 200 ได้ตามต้องการ
  data: { label: load.label, value: load.value },
  draggable: false,
}));
```

**ตัวอย่างการวาง Load Nodes:**
- `x: 900`: ตำแหน่งคงที่ทางขวา (ห่างจาก generation ประมาณ 800 pixels)
- `y: 200 + index * 200`: เริ่มต้นที่ y=200, เว้นระยะ 200 pixels

### การลด Load Node

เหมือนกับการลด Generation Node:

```javascript
const loads = [
  { id: 'load-1', label: 'Load D1', value: '4,200 kW (60% allocation)' },
  // ลบ load-2 ออก
];
```

**⚠️ อย่าลืม:**
- ลบ edges ที่เชื่อมต่อกับ load node นั้นด้วย

### ตัวอย่างแบบเต็ม: เพิ่ม 2 Generations และ 1 Load

```javascript
useEffect(() => {
  // Define generations (เพิ่มเป็น 5 nodes)
  const generations = [
    { id: 'gen-1', label: 'Solar Farm A', value: '5,000 kW' },
    { id: 'gen-2', label: 'Wind Farm B', value: '4,500 kW' },
    { id: 'gen-3', label: 'Hydro Plant C', value: '4,000 kW' },
    { id: 'gen-4', label: 'Battery Storage D', value: '3,500 kW' }, // ใหม่
    { id: 'gen-5', label: 'Diesel Generator E', value: '3,000 kW' }, // ใหม่
  ];

  // Define loads (เพิ่มเป็น 3 nodes)
  const loads = [
    { id: 'load-1', label: 'Industrial Zone', value: '6,000 kW' },
    { id: 'load-2', label: 'Commercial Area', value: '5,000 kW' },
    { id: 'load-3', label: 'Residential Area', value: '4,000 kW' }, // ใหม่
  ];

  // Create generation nodes (ปรับระยะห่างเป็น 150)
  const generationNodes = generations.map((gen, index) => ({
    id: gen.id,
    type: 'generation',
    position: { x: 100, y: 150 + index * 150 }, // ลดระยะห่างเพราะมีหลาย nodes
    data: { label: gen.label, value: gen.value },
    draggable: false,
  }));

  // Create load nodes (ปรับระยะห่างเป็น 180)
  const loadNodes = loads.map((load, index) => ({
    id: load.id,
    type: 'load',
    position: { x: 900, y: 200 + index * 180 }, // ลดระยะห่าง
    data: { label: load.label, value: load.value },
    draggable: false,
  }));

  setNodes([...generationNodes, ...loadNodes]);

  // ... edges (ต้องเพิ่ม connections ด้วย)
}, [setNodes, setEdges]);
```

### Tips สำหรับการจัดการ Nodes

**1. การตั้งชื่อ ID:**
- ใช้รูปแบบที่สม่ำเสมอ: `gen-1`, `gen-2`, `load-1`, `load-2`
- ไม่ควรเว้นช่องว่าง หรือใช้อักขระพิเศษ
- ควรเป็นภาษาอังกฤษ

**2. การคำนวณระยะห่าง:**
```
ถ้ามี N nodes และสูงหน้าจอ H pixels:
ระยะห่างที่เหมาะสม = (H - 300) / N

ตัวอย่าง:
- หน้าจอ 1080px, มี 5 nodes: (1080 - 300) / 5 = 156 pixels
- หน้าจอ 900px, มี 4 nodes: (900 - 300) / 4 = 150 pixels
```

**3. การปรับตำแหน่ง X (ระยะห่างซ้าย-ขวา):**
```javascript
// Generation nodes (ซ้าย)
x: 100  // ปรับได้ 50-200

// Load nodes (ขวา)
x: 900  // ปรับได้ 700-1000

// ระยะห่างมากขึ้น = เส้นยาวขึ้น = ดูมีพื้นที่มากขึ้น
```

**4. การปรับตำแหน่ง Y (ขึ้น-ลง):**
```javascript
// เริ่มต้น
y: 150 // สำหรับ generation (ปรับได้ 100-250)
y: 200 // สำหรับ load (ปรับได้ 100-250)

// ระยะห่าง
index * 180 // สำหรับ generation (ปรับได้ 120-250)
index * 200 // สำหรับ load (ปรับได้ 150-300)
```

---

## คู่มือการเพิ่ม/ลด Connections

ส่วนนี้จะอธิบายวิธีการเพิ่มหรือลด edges (เส้นเชื่อมต่อ) ระหว่าง generations และ loads

### โครงสร้างของ Edge

Edge แต่ละเส้นประกอบด้วย properties หลักดังนี้:

```javascript
{
  id: 'edge-1',              // unique identifier
  source: 'gen-1',           // node ต้นทาง (generation id)
  target: 'load-1',          // node ปลายทาง (load id)
  type: 'default',           // ประเภทเส้น
  animated: false,           // animation
  style: {},                 // สไตล์เส้น
  markerEnd: {},             // ลูกศร
  label: '50%',              // ข้อความ
  labelPosition: 0.5,        // ตำแหน่ง label
  labelStyle: {},            // สไตล์ข้อความ
  labelBgStyle: {},          // พื้นหลัง label
  labelBgPadding: [10, 6],   // padding
  labelBgBorderRadius: 20,   // มุมโค้ง
  interactionWidth: 30,      // พื้นที่ click
}
```

### การเพิ่ม Connection ใหม่

**ขั้นตอนที่ 1: เพิ่ม edge ใน sampleEdges array**

หาส่วน `const sampleEdges = [...]` ใน `useEffect` (ประมาณบรรทัด 60-206):

```javascript
const sampleEdges = [
  // ... edges เดิม

  // เพิ่ม edge ใหม่ที่นี่
  {
    id: 'edge-6',                        // เปลี่ยนเป็นหมายเลขถัดไป
    source: 'gen-1',                     // generation ที่ต้องการเชื่อม
    target: 'load-3',                    // load ที่ต้องการเชื่อม
    type: 'default',
    animated: false,
    style: {
      stroke: edgeColors[0],             // เลือกสี (0-4)
      strokeWidth: 3
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: edgeColors[0],              // สีเดียวกับเส้น
      width: 20,
      height: 20,
    },
    label: '30%',                        // เปอร์เซ็นต์
    labelPosition: 0.5,                  // ตรงกลางเส้น
    labelStyle: {
      fill: edgeColors[0],               // สีเดียวกับเส้น
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
    interactionWidth: 30,
  },
];
```

**ขั้นตอนที่ 2: อัพเดท Legend**

หา Legend component ที่ด้านล่าง (ประมาณบรรทัด 244-270) และเพิ่มข้อมูลการเชื่อมต่อใหม่:

```javascript
{/* Legend */}
<div className="absolute bottom-4 left-1/2 -translate-x-1/2 ...">
  <div className="flex items-center gap-6">
    <h3 className="text-sm font-semibold text-gray-700">Connections:</h3>
    <div className="flex items-center gap-4 text-xs flex-wrap">
      {/* ... connections เดิม */}

      {/* เพิ่มข้อมูลการเชื่อมต่อใหม่ */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-0.5" style={{ backgroundColor: edgeColors[0] }}></div>
        <span className="text-gray-600 whitespace-nowrap">Gen D1 → Load D3 (30%)</span>
      </div>
    </div>
  </div>
</div>
```

### การลด Connection

**วิธีที่ 1: ลบ edge object ออกจาก array**

```javascript
const sampleEdges = [
  // ลบทั้ง object นี้ออก
  // {
  //   id: 'edge-5',
  //   source: 'gen-3',
  //   target: 'load-2',
  //   ...
  // },
];
```

**วิธีที่ 2: Filter ออก (แบบ dynamic)**

```javascript
const sampleEdges = [
  // ... all edges
].filter(edge => edge.id !== 'edge-5'); // กรอง edge-5 ออก
```

**อย่าลืม:** ลบข้อมูลใน Legend ที่สอดคล้องด้วย

### การเลือกสีสำหรับ Edge ใหม่

มีสี 5 สีให้เลือกจาก `edgeColors` array:

```javascript
edgeColors[0]  // #3b82f6 (สีน้ำเงิน - Blue)
edgeColors[1]  // #06b6d4 (สีฟ้า - Cyan)
edgeColors[2]  // #10b981 (สีเขียว - Emerald)
edgeColors[3]  // #f59e0b (สีส้ม - Amber)
edgeColors[4]  // #ef4444 (สีแดง - Red)
```

**เลือกสีอย่างไร:**
- ใช้สีที่ยังไม่ซ้ำกับ edges ที่มีอยู่
- ถ้า edges เยอะ สามารถใช้สีซ้ำได้ แต่ควรแยกให้ไม่ใกล้กัน
- สามารถเพิ่มสีใหม่ใน `edgeColors` array ได้

### การปรับ labelPosition เพื่อไม่ให้ทับกัน

เมื่อมีหลาย edges ที่ไป/มาจาก node เดียวกัน ควรปรับ `labelPosition`:

```javascript
// ตัวอย่าง: 3 edges ไป load เดียวกัน
{
  id: 'edge-1',
  source: 'gen-1',
  target: 'load-1',
  labelPosition: 0.5,  // ตรงกลาง
  ...
},
{
  id: 'edge-2',
  source: 'gen-2',
  target: 'load-1',
  labelPosition: 0.35, // เลื่อนไปทางซ้าย
  ...
},
{
  id: 'edge-3',
  source: 'gen-3',
  target: 'load-1',
  labelPosition: 0.65, // เลื่อนไปทางขวา
  ...
},
```

**กฎการเลือก labelPosition:**
1. edge ตรงกลาง: ใช้ 0.5
2. edge อื่นๆ: กระจายเป็น 0.3, 0.4, 0.6, 0.7
3. ห้ามใช้ 0 หรือ 1 (จะชนกับ node)
4. แนะนำให้เว้นระยะอย่างน้อย 0.1-0.15

### ตัวอย่างแบบเต็ม: เพิ่ม Connections แบบ Complex

```javascript
const sampleEdges = [
  // Gen 1 → Load 1 (40%)
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
    label: '40%',
    labelPosition: 0.45,
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
    interactionWidth: 30,
  },

  // Gen 1 → Load 2 (60%)
  {
    id: 'edge-2',
    source: 'gen-1',
    target: 'load-2',
    type: 'default',
    animated: false,
    style: { stroke: edgeColors[1], strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: edgeColors[1],
      width: 20,
      height: 20,
    },
    label: '60%',
    labelPosition: 0.55,
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
    interactionWidth: 30,
  },

  // Gen 2 → Load 1 (30%)
  {
    id: 'edge-3',
    source: 'gen-2',
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
    label: '30%',
    labelPosition: 0.35,
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
    interactionWidth: 30,
  },

  // Gen 2 → Load 3 (70%)
  {
    id: 'edge-4',
    source: 'gen-2',
    target: 'load-3',
    type: 'default',
    animated: false,
    style: { stroke: edgeColors[3], strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: edgeColors[3],
      width: 20,
      height: 20,
    },
    label: '70%',
    labelPosition: 0.6,
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
    interactionWidth: 30,
  },
];
```

### Template สำหรับ Copy-Paste

```javascript
{
  id: 'edge-X',                      // เปลี่ยน X
  source: 'gen-Y',                   // เปลี่ยน Y
  target: 'load-Z',                  // เปลี่ยน Z
  type: 'default',
  animated: false,
  style: { stroke: edgeColors[N], strokeWidth: 3 }, // เปลี่ยน N (0-4)
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: edgeColors[N],            // เปลี่ยน N (เหมือนกับด้านบน)
    width: 20,
    height: 20,
  },
  label: 'XX%',                      // เปลี่ยน XX
  labelPosition: 0.5,                // ปรับตำแหน่ง (0-1)
  labelStyle: {
    fill: edgeColors[N],             // เปลี่ยน N (เหมือนกับด้านบน)
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
  interactionWidth: 30,
},
```

### Checklist สำหรับเพิ่ม Connection

- [ ] ตั้ง id ที่ไม่ซ้ำ (edge-1, edge-2, ...)
- [ ] ระบุ source (gen-X) และ target (load-Y) ที่ถูกต้อง
- [ ] เลือกสีจาก edgeColors (0-4)
- [ ] ตั้ง label เป็นเปอร์เซ็นต์หรือข้อความที่ต้องการ
- [ ] ตั้ง labelPosition เพื่อไม่ให้ทับกับ edges อื่น
- [ ] ใช้สีเดียวกันใน style.stroke, markerEnd.color, และ labelStyle.fill
- [ ] อัพเดท Legend component ด้านล่าง
- [ ] ทดสอบโดยรัน `npm run dev`

---

## การปรับแต่งขั้นสูง

### 1. เปลี่ยนจำนวน Nodes (ดูคู่มือด้านบนสำหรับรายละเอียด)

แก้ไขใน `ContractMapping.jsx` ใน `useEffect`:

```javascript
const generations = [
  { id: 'gen-1', label: 'Gen A', value: '5,000 kW' },
  { id: 'gen-2', label: 'Gen B', value: '4,500 kW' },
  { id: 'gen-3', label: 'Gen C', value: '4,000 kW' },
  { id: 'gen-4', label: 'Gen D', value: '3,500 kW' }, // เพิ่ม node ใหม่
];
```

### 2. เปลี่ยนตำแหน่ง Nodes

แก้ไข `position` ใน node creation:

```javascript
// เปลี่ยนตำแหน่ง X (horizontal)
position: { x: 200, y: 150 + index * 180 }  // เลื่อนไปขวา 100 pixels

// เปลี่ยนระยะห่างระหว่าง nodes
position: { x: 100, y: 150 + index * 250 }  // เพิ่มระยะห่างเป็น 250 pixels
```

### 3. เพิ่มหรือแก้ไข Connections

เพิ่ม edge ใหม่ใน `sampleEdges` array:

```javascript
{
  id: 'edge-6',                    // unique id
  source: 'gen-1',                 // node ต้นทาง
  target: 'load-2',                // node ปลายทาง
  type: 'default',
  style: { stroke: '#8b5cf6', strokeWidth: 3 },  // สีม่วง
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#8b5cf6',
    width: 20,
    height: 20,
  },
  label: '25%',
  // ... label styles
}
```

### 4. เปลี่ยนสีของเส้น

แก้ไข `edgeColors` array:

```javascript
const edgeColors = [
  '#8b5cf6',  // สีม่วง (Purple)
  '#ec4899',  // สีชมพู (Pink)
  '#14b8a6',  // สีเขียวมรกต (Teal)
  '#f97316',  // สีส้มเข้ม (Orange)
  '#6366f1',  // สีน้ำเงินม่วง (Indigo)
];
```

### 5. เปลี่ยน Edge Type (ประเภทเส้น)

React Flow มี edge types หลายแบบ:

```javascript
// เส้นตรง
type: 'straight'

// เส้นโค้งแบบ smooth
type: 'default'

// เส้นโค้งแบบ step
type: 'smoothstep'

// เส้นโค้งแบบ step มุมฉาก
type: 'step'
```

### 6. Styling Node Cards

แก้ไขใน `CustomNode.jsx`:

```javascript
// เปลี่ยนสีพื้นหลัง
className="bg-green-50 border-2 border-green-300 rounded-lg px-6 py-4"

// เปลี่ยนขนาด
className="bg-blue-50 border-2 border-slate-300 rounded-xl px-8 py-6 min-w-[250px]"

// เพิ่ม shadow
className="bg-blue-50 border-2 border-slate-300 rounded-lg px-6 py-4 shadow-lg"
```

### 7. เพิ่ม Animation

ทำให้เส้นเคลื่อนไหว:

```javascript
{
  id: 'edge-1',
  // ...
  animated: true,  // เปลี่ยนจาก false เป็น true
  // ...
}
```

### 8. ปรับแต่ง Controls

```javascript
<Controls
  showZoom={true}           // แสดงปุ่ม zoom
  showFitView={true}        // แสดงปุ่ม fit view
  showInteractive={false}   // ซ่อนปุ่ม interactive
  className="bg-white border border-gray-300 rounded-lg shadow-md"
/>
```

---

## วิธีการใช้งาน

### 1. การเปิดแอพพลิเคชัน

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

### 2. การนำทาง (Navigation)

- **Zoom In/Out**: ใช้ scroll wheel หรือปุ่ม +/- ใน Controls
- **Pan (เลื่อนดู)**: คลิกซ้ายค้างและลาก
- **Fit View**: คลิกปุ่ม "Fit View" ใน Controls เพื่อแสดงทั้งหมด
- **Select Element**: คลิกที่ node หรือ edge เพื่อเลือก

### 3. การอ่านข้อมูล

- **Nodes**: แสดงชื่อและค่าพลังงาน
- **Edges**: แสดงเปอร์เซ็นต์การจัดสรร
- **Legend**: ดูคำอธิบายที่มุมซ้ายล่าง

### 4. การ Export ภาพ

ใช้ Screenshot tool ของเบราว์เซอร์หรือ OS

### 5. การ Build สำหรับ Production

```bash
# Build
npm run build

# Files จะถูกสร้างใน folder dist/
# สามารถ deploy ได้เลย
```

---

## ตัวอย่างการใช้งานจริง

### Use Case 1: เพิ่ม Generation Node

```javascript
// ใน useEffect ของ ContractMapping.jsx
const generations = [
  { id: 'gen-1', label: 'Solar Farm A', value: '5,000 kW' },
  { id: 'gen-2', label: 'Wind Farm B', value: '4,000 kW' },
  { id: 'gen-3', label: 'Hydro Plant C', value: '3,000 kW' },
  { id: 'gen-4', label: 'Battery Storage', value: '2,000 kW' }, // ใหม่
];
```

### Use Case 2: เพิ่ม Connection แบบ Complex

```javascript
// Connection ที่มีหลายเส้นจาก 1 generation ไปหลาย loads
const complexEdges = [
  // Gen 1 -> Load 1
  { id: 'e1-l1', source: 'gen-1', target: 'load-1', label: '30%', ... },
  // Gen 1 -> Load 2
  { id: 'e1-l2', source: 'gen-1', target: 'load-2', label: '40%', ... },
  // Gen 1 -> Load 3
  { id: 'e1-l3', source: 'gen-1', target: 'load-3', label: '30%', ... },
];
```

### Use Case 3: เปลี่ยนเป็น Dark Mode

```javascript
// Background
<Background color="#374151" gap={20} size={1} />

// Container
<div className="w-screen h-screen bg-gradient-to-br from-gray-900 to-gray-800">

// Header
<div className="... bg-gray-800/80 ...">
  <h1 className="text-2xl font-bold text-white">Contract Mapping</h1>
  <p className="text-sm text-gray-300 mt-1">Energy Distribution Diagram</p>
</div>

// CustomNode (ใน CustomNode.jsx)
<div className="bg-gray-800 border-2 border-gray-600 rounded-lg px-6 py-4">
  <div className="text-white font-semibold">{data.label}</div>
  <div className="text-gray-400 text-sm">{data.value}</div>
</div>
```

---

## Troubleshooting

### ปัญหา: Build ไม่สำเร็จ

```bash
# ลองลบ node_modules และติดตั้งใหม่
rm -rf node_modules
npm install
npm run build
```

### ปัญหา: Nodes ไม่แสดง

ตรวจสอบ:
1. `nodes` array ไม่ว่างเปล่า
2. แต่ละ node มี `id` ที่ unique
3. `position` มีค่า x, y ที่ถูกต้อง

### ปัญหา: Edges ไม่แสดง

ตรวจสอบ:
1. `source` และ `target` ต้องตรงกับ `id` ของ nodes ที่มีอยู่
2. Edge มี `id` ที่ unique
3. ตรวจสอบ `style` และ `markerEnd` ถูกกำหนดถูกต้อง

### ปัญหา: Styling ไม่ทำงาน

```bash
# ตรวจสอบว่า Tailwind config ถูกต้อง
# ดูไฟล์ tailwind.config.js

# ลอง rebuild
npm run build
```

---

## คำแนะนำเพิ่มเติม

1. **Performance**: ถ้ามี nodes เยอะ (>100) ควรพิจารณาใช้ virtualization
2. **Responsive**: ปรับ node positions ตามขนาดหน้าจอ
3. **Data-driven**: แยก data ออกเป็นไฟล์ JSON แยกต่างหาก
4. **Accessibility**: เพิ่ม ARIA labels สำหรับ screen readers

---

## Reference Links

- [React Flow Documentation](https://reactflow.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

## License

MIT

---

## Contact

สำหรับคำถามหรือข้อเสนอแนะ กรุณาติดต่อทีมพัฒนา
