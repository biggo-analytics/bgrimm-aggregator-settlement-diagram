# Contract Mapping - Energy Distribution Diagram

A React application built with React Flow and Tailwind CSS to visualize energy distribution contracts between generation sources and loads.

> 🇹🇭 **สำหรับเอกสารภาษาไทยแบบละเอียด**: อ่านที่ [DOCUMENTATION.md](./DOCUMENTATION.md)

## Features

- **Interactive Flow Diagram**: Visual representation of energy distribution from generations to loads
- **Custom Node Design**: Professional card-style nodes with light blue styling
- **Pre-configured Connections**: Sample connections with smooth bezier curves
- **Percentage Labels**: Display allocation percentages on each connection
- **Color-Coded Connections**: 5 distinct colors for different connections
- **Connection Legend**: Visual legend showing all connections and their percentages
- **Pan & Zoom**: Interactive canvas with zoom and pan controls
- **Clean UI**: No configuration panel - pure diagram visualization

## Tech Stack

- **React 18**: Modern React with functional components and hooks
- **React Flow 11**: Flow-based diagram library
- **Tailwind CSS 3**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server

## Installation

```bash
npm install
```

## Usage

### Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm preview
```

## How to Use

1. **View the Diagram**: Open the application to see the pre-configured energy distribution diagram
2. **Zoom & Pan**: Use mouse wheel to zoom and drag to pan the canvas
3. **Read Information**:
   - Node cards show generation/load names and capacity (kW)
   - Edge labels show allocation percentages
   - Legend at bottom-left shows all connections
4. **Reset View**: Use the controls to reset the view to fit all nodes
5. **Customize**: Edit `src/components/ContractMapping.jsx` to change nodes and connections

## Project Structure

```
src/
├── components/
│   ├── ContractMapping.jsx  # Main component with React Flow logic and sample data
│   ├── CustomNode.jsx        # Custom node component for generations/loads
│   └── ConfigPanel.jsx       # (Not used in this version)
├── App.jsx                   # Root app component
├── main.jsx                  # Application entry point
└── index.css                 # Global styles with Tailwind directives
```

## Features in Detail

### Custom Nodes
- Generation nodes (left side) with source handles
- Load nodes (right side) with target handles
- Display label and value (e.g., "Gen D1", "3,000 kW")
- Light blue background with slate borders
- Non-draggable but auto-positioned

### Connections
- Smooth bezier curves (default type)
- Color-coded (5 color palette: blue, cyan, emerald, amber, red)
- Percentage labels with white background badges
- Arrow markers at the destination
- Pre-configured sample connections:
  - Gen D1 → Load D1 (50%)
  - Gen D2 → Load D1 (30%), Load D2 (60%)
  - Gen D3 → Load D1 (20%), Load D2 (40%)

### UI Components
- Header with title and subtitle
- Interactive canvas with pan and zoom
- Background grid pattern
- Control panel for zoom/pan/fit view
- Connection legend at bottom-left corner
- Gradient background for modern look

## Customization

### Adding More Colors

Edit the `edgeColors` array in `src/components/ContractMapping.jsx`:

```javascript
const edgeColors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
```

### Adjusting Node Positions

Modify the position calculations in the `useEffect` hook in `ContractMapping.jsx`:

```javascript
position: { x: 50, y: 100 + index * 150 }  // For generations
position: { x: 800, y: 100 + index * 150 } // For loads
```

### Changing Node Styling

Update the Tailwind classes in `src/components/CustomNode.jsx`:

```javascript
className="bg-blue-50 border-2 border-slate-300 rounded-lg px-6 py-4"
```

## License

MIT
