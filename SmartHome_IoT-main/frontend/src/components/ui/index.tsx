import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export function Btn({ children, onClick, color = 'blue', sm, type = 'button' }: {
  children: React.ReactNode; onClick?: () => void; color?: string; sm?: boolean; type?: 'button' | 'submit';
}) {
  const base = sm ? 'px-2.5 py-1 text-xs' : 'px-4 py-2 text-sm';
  const c: Record<string, string> = {
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    red: 'bg-red-600 text-white hover:bg-red-700',
    green: 'bg-green-600 text-white hover:bg-green-700',
    gray: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  };
  return (
    <button type={type} onClick={onClick} className={`${base} ${c[color] || c.blue} rounded font-medium transition-colors cursor-pointer`}>
      {children}
    </button>
  );
}

export function Badge({ children, color = 'gray' }: { children: React.ReactNode; color?: string }) {
  const c: Record<string, string> = {
    green: 'bg-green-100 text-green-700 border border-green-400',
    red: 'bg-red-100 text-red-700 border border-red-400',
    yellow: 'bg-yellow-100 text-yellow-800 border border-yellow-400',
    gray: 'bg-gray-100 text-gray-600 border border-gray-300',
    blue: 'bg-blue-100 text-blue-700 border border-blue-400',
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${c[color] || c.gray}`}>{children}</span>;
}

export function RefreshButton({ onRefresh }: { onRefresh: () => void }) {
  const [spin, setSpin] = useState(false);
  function handle() { setSpin(true); onRefresh(); setTimeout(() => setSpin(false), 600); }
  return (
    <button onClick={handle} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium transition-colors cursor-pointer">
      <RefreshCw size={14} className={spin ? 'animate-spin' : ''} />
      Làm mới
    </button>
  );
}

export function PageHeader({ title, onRefresh, children }: { title: string; onRefresh: () => void; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <div className="flex items-center gap-2">
        {children}
        <RefreshButton onRefresh={onRefresh} />
      </div>
    </div>
  );
}

export function StatCard({ label, value, sub, color = 'blue' }: { label: string; value: string | number; sub?: string; color?: string }) {
  const border: Record<string, string> = {
    blue: 'border-l-blue-500 bg-blue-50', green: 'border-l-green-500 bg-green-50',
    red: 'border-l-red-500 bg-red-50', yellow: 'border-l-yellow-500 bg-yellow-50',
    gray: 'border-l-gray-400 bg-gray-50',
  };
  return (
    <div className={`rounded-lg border border-gray-200 border-l-4 p-4 ${border[color] || border.blue}`}>
      <div className="text-2xl font-bold text-gray-900 font-mono">{value}</div>
      <div className="text-sm font-semibold text-gray-700 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

export function Input({ label, type = 'text', value, onChange, placeholder, className = '' }: {
  label?: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
      />
    </div>
  );
}

export function Table({ headers, rows, renderRow }: { headers: string[]; rows: unknown[]; renderRow: (row: unknown, i: number) => React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-blue-700 text-white">
          <tr>{headers.map((h) => <th key={h} className="px-3 py-2.5 text-left font-semibold text-xs uppercase tracking-wide">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, i) => renderRow(r, i))}
        </tbody>
      </table>
    </div>
  );
}
