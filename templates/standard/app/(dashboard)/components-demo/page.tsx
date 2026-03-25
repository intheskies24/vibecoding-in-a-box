import { Info, AlertTriangle, CheckCircle2, X } from "lucide-react";

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900 text-sm">{title}</h2>
        <p className="text-gray-500 text-xs mt-0.5">{description}</p>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

export default function ComponentsDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-10">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold text-white mb-2">UI Components</h1>
          <p className="text-slate-400">
            Tailwind CSS components styled to match shadcn/ui. Run{" "}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 text-xs">npx shadcn@latest add</code>{" "}
            to replace these with the official components.
          </p>
        </div>
      </div>

      <div className="px-8 py-8 max-w-3xl space-y-6">

        {/* Typography */}
        <Section title="Typography" description="Heading scale and body text styles">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Heading 1</h1>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Heading 2</h2>
            <h3 className="text-xl font-semibold text-gray-900">Heading 3</h3>
            <h4 className="text-base font-semibold text-gray-900">Heading 4</h4>
            <p className="text-sm text-gray-700 leading-relaxed max-w-lg">
              Body text — comfortable line height for readability at paragraph length.
            </p>
            <p className="text-sm text-gray-400">Muted text — secondary information, captions, helper text.</p>
            <p className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded inline-block">monospace / code</p>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons" description="All variants">
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors">Default</button>
            <button className="inline-flex items-center justify-center rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 transition-colors">Secondary</button>
            <button className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Outline</button>
            <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Ghost</button>
            <button className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">Destructive</button>
            <button disabled className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white opacity-50 cursor-not-allowed">Disabled</button>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges" description="Status indicators and labels">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900 text-white">Default</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">Secondary</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-slate-300 text-slate-600">Outline</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Success</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Info</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Warning</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">Destructive</span>
          </div>
        </Section>

        {/* Card */}
        <Section title="Card" description="Content container with header, body, and footer">
          <div className="rounded-xl border border-gray-200 overflow-hidden max-w-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm">Card Title</h3>
              <p className="text-gray-500 text-xs mt-0.5">Card description or subtitle</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-gray-600 text-sm">Card content goes here. Add any components inside the card body.</p>
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</button>
              <button className="px-3 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors">Confirm</button>
            </div>
          </div>
        </Section>

        {/* Form Inputs */}
        <Section title="Form Inputs" description="Text fields, textarea, select, and checkbox">
          <div className="space-y-4 max-w-sm">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Text input</label>
              <input type="text" placeholder="Placeholder text..." className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Textarea</label>
              <textarea placeholder="Longer content..." rows={3} className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Select</label>
              <select className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Option one</option>
                <option>Option two</option>
                <option>Option three</option>
              </select>
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm text-gray-700">Checkbox label</span>
            </label>
          </div>
        </Section>

        {/* Alerts */}
        <Section title="Alerts / Callouts" description="Feedback messages for info, success, warning, and error states">
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div><p className="text-sm font-semibold text-blue-900">Information</p><p className="text-sm text-blue-700 mt-0.5">An informational message with helpful context.</p></div>
            </div>
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <div><p className="text-sm font-semibold text-emerald-900">Success</p><p className="text-sm text-emerald-700 mt-0.5">Your action was completed successfully.</p></div>
            </div>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div><p className="text-sm font-semibold text-amber-900">Warning</p><p className="text-sm text-amber-700 mt-0.5">Something needs your attention before proceeding.</p></div>
            </div>
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
              <X size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
              <div><p className="text-sm font-semibold text-red-900">Error</p><p className="text-sm text-red-700 mt-0.5">Something went wrong. Please try again.</p></div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
