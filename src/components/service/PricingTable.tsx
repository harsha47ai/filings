interface PriceRow {
  name: string;
  price: string;
  description?: string;
}

export function PricingTable({ rows }: { rows: PriceRow[] }) {
  if (!rows?.length) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-slate-900">Package</th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-900">Price</th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-900">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row) => (
            <tr key={row.name} className="bg-white">
              <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
              <td className="px-4 py-3 text-slate-700">{row.price}</td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {row.description ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
