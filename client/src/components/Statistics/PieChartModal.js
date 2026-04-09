import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SYSTEM_COLORS = {
  // PlayStation
  PS1:  '#b0b0b0',
  PS2:  '#1c1c1c',
  PS3:  '#0070d1',
  PS4:  '#003087',
  PS5:  '#00439c',
  PSP:  '#6a0dad',
  VITA: '#1a5276',
  // Xbox
  XBOX: '#2d7d2d',
  X360: '#5dc21e',
  XB1:  '#107c10',
  XSX:  '#0e7a0d',
  XSS:  '#1db954',
  // Nintendo
  NES:  '#d62828',
  SNES: '#6b6b6b',
  N64:  '#c8102e',
  GCN:  '#663399',
  Wii:  '#b8b8b8',
  WiiU: '#009ac7',
  NSW:  '#e60012',
  GB:   '#8fbc8f',
  GBC:  '#6a5acd',
  GBA:  '#4b0082',
  DS:   '#a0a0a0',
  '3DS': '#ce1141',
  // PC / Other
  PC:   '#ff6600',
  MAC:  '#555555',
  LNX:  '#f5a623',
  DC:   '#ff8c00',
  SAT:  '#444444',
  GEN:  '#1a1a2e',
  SMS:  '#cc0000',
  GG:   '#333333',
  TGFX: '#ff4500',
  NEO:  '#ffd700',
  LYNX: '#8b0000',
  JAG:  '#006400',
  '2600':'#b5651d',
  // Mobile / Streaming
  ANDR: '#a4c639',
  iOS:  '#999999',
  WEB:  '#4285f4',
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
        <style>{`.pie-modal-header .close { color: #333; text-shadow: none; opacity: 1; } .pie-modal .modal-content { border-radius: 12px; overflow: hidden; }`}</style>
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
