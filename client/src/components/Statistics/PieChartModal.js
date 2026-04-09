import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Unique colors per system for chart readability.
// Same color families as the game boxes (PlayStation=blue, Xbox=green, Nintendo=red/warm)
// but each system gets its own distinct shade.
const SYSTEM_COLORS = {
  // PlayStation — blue family
  PS1:  '#8ca8c8',
  PS2:  '#1a237e',
  PS3:  '#283593',
  PS4:  '#1565c0',
  PS5:  '#42a5f5',
  PSP:  '#5c6bc0',
  VITA: '#0d47a1',
  // Xbox — green family
  XBOX: '#2e7d32',
  X360: '#66bb6a',
  XONE: '#adff2f',
  XSX:  '#00c853',
  XSS:  '#76ff03',
  // Nintendo home — red/warm family
  NES:  '#b71c1c',
  SNES: '#9e9e9e',
  N64:  '#ebee2d',
  GCN:  '#8873bc',
  Wii:  '#bdbdbd',
  WiiU: '#2ba4c8',
  NSW:  '#e60012',
  // Nintendo handheld — distinct per generation
  GB:   '#7cb342',
  GBC:  '#ab47bc',
  GBA:  '#5e35b1',
  DS:   '#a1887f',
  '3DS':'#e91e63',
  // PC / Other
  PC:   '#ff8f00',
  MAC:  '#78909c',
  DC:   '#ff6d00',
  SAT:  '#546e7a',
  GEN:  '#3949ab',
  SMS:  '#ef5350',
  GG:   '#e88de8',
  TGFX: '#ff4500',
  NEO:  '#ffd600',
  LYNX: '#c62828',
  JAG:  '#388e3c',
  '2600':'#bf8040',
  VBOY: '#d50000',
};

const FALLBACK_COLORS = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9a6324', '#800000', '#aaffc3',
  '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#e6beff',
];

class PieChartModal extends Component {
  render() {
    const { isOpen, toggle, games } = this.props;

    if (!games || games.length === 0) {
      return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Games by System</ModalHeader>
          <ModalBody>
            <p className="text-center text-muted">No games to display.</p>
          </ModalBody>
        </Modal>
      );
    }

    // Count games per system
    const counts = {};
    games.forEach(game => {
      const sys = game.system_type || 'Unknown';
      counts[sys] = (counts[sys] || 0) + 1;
    });

    // Sort by count descending
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(([sys]) => sys);
    const values = sorted.map(([, count]) => count);

    let fallbackIdx = 0;
    const colors = labels.map(label => {
      if (SYSTEM_COLORS[label]) return SYSTEM_COLORS[label];
      return FALLBACK_COLORS[fallbackIdx++ % FALLBACK_COLORS.length];
    });

    const data = {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderColor: '#dbd8d3',
        borderWidth: 1,
      }],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#333',
            font: { size: 12, weight: 'bold' },
            padding: 10,
          },
          onHover: (event, legendItem, legend) => {
            const chart = legend.chart;
            const index = legendItem.index;
            const dataset = chart.data.datasets[0];
            const total = dataset.data.reduce((a, b) => a + b, 0);
            const value = dataset.data[index];
            const pct = ((value / total) * 100).toFixed(1);
            const label = chart.data.labels[index];
            chart.canvas.title = `${label}: ${value} (${pct}%)`;
          },
          onLeave: (event, legendItem, legend) => {
            legend.chart.canvas.title = '';
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const total = values.reduce((a, b) => a + b, 0);
              const pct = ((ctx.parsed / total) * 100).toFixed(1);
              return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
            },
          },
        },
      },
    };

    const total = values.reduce((a, b) => a + b, 0);

    return (
      <Modal isOpen={isOpen} toggle={toggle} centered size="lg" className="pie-modal">
        <style>{`.pie-modal-header .close { color: #333; text-shadow: none; opacity: 1; } .pie-modal .modal-content { border-radius: 12px; overflow: hidden; } .pie-modal-header .modal-title { width: 100%; text-align: center; }`}</style>
        <ModalHeader toggle={toggle} className="pie-modal-header" style={{ backgroundColor: '#dbd8d3', color: '#333', borderBottom: '1px solid #bbb' }}>
          Games by System — {total} total
        </ModalHeader>
        <ModalBody style={{ backgroundColor: '#dbd8d3', borderRadius: '0 0 12px 12px' }}>
          <div style={{ maxHeight: '70vh', display: 'flex', justifyContent: 'center' }}>
            <Pie data={data} options={options} />
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default PieChartModal;
