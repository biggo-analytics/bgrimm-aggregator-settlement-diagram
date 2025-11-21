# Contract Mapping - Energy Distribution Diagram

A React application built with React Flow and Tailwind CSS to visualize energy distribution contracts between generation sources and loads.

## Features

- **Interactive Flow Diagram**: Visual representation of energy distribution from generations to loads
- **Custom Node Design**: Professional card-style nodes with light blue styling
- **Dynamic Configuration**: Real-time adjustment of generations and loads
- **Connection Management**: Draw connections with smooth bezier curves
- **Percentage Labels**: Display allocation percentages on each connection
- **Color-Coded Connections**: Automatically assigned colors for different connections
- **Configuration Panel**: Sidebar interface to manage all diagram elements

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

1. **Adjust Node Counts**: Use the configuration panel to set the number of generations and loads
2. **Edit Node Data**: Click on the expandable sections to edit labels and values for each node
3. **Create Connections**: Drag from a generation node handle (right side) to a load node handle (left side)
4. **Update Percentages**: Modify connection percentages in the "Connections" section of the config panel
5. **Zoom & Pan**: Use mouse wheel to zoom and drag to pan the canvas
6. **Reset View**: Use the controls in the bottom-left to reset the view

## Project Structure

```
src/
├── components/
│   ├── ContractMapping.jsx  # Main component with React Flow logic
│   ├── CustomNode.jsx        # Custom node component for generations/loads
│   └── ConfigPanel.jsx       # Configuration sidebar panel
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
- Smooth bezier curves
- Color-coded (5 color palette cycles automatically)
- Percentage labels in circular badges
- Arrow markers at the destination
- Editable labels through config panel

### Configuration Panel
- Number inputs for generation and load counts
- Expandable sections for detailed editing
- Live updates to the diagram
- Connection management interface
- Usage instructions

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
