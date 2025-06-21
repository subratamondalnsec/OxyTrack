import React from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';

export default function ExportButton({ data, type = 'csv', fileName = 'export', columns }) {
  const handleExport = () => {
    if (type === 'csv') {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'pdf') {
      const doc = new jsPDF();
      let y = 10;
      columns.forEach((col, i) => doc.text(col, 10 + i * 40, y));
      y += 10;
      data.forEach(row => {
        columns.forEach((col, i) => doc.text(String(row[col] || ''), 10 + i * 40, y));
        y += 10;
      });
      doc.save(`${fileName}.pdf`);
    }
  };
  return (
    <div className="inline-block">
      <button className="bg-green-600 text-white px-3 py-1 rounded mr-2" onClick={() => handleExport('csv')}>Export CSV</button>
      <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => handleExport('pdf')}>Export PDF</button>
    </div>
  );
}
