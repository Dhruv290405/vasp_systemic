"use client";

import {
  LayoutDashboard,
  Train,
  Building2,
  AlertCircle,
  Building,
  ClipboardCheck,
  MessageSquare,
  FileText,
  FileSignature,
  Users,
  Settings,
  Bell,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CONTROL_ROOM_IMG =
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1200&q=80";
const TRAIN_IMG =
  "https://images.unsplash.com/photo-1624969862644-791f3dc9896e?auto=format&fit=crop&w=500&q=80";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Train, label: "Coach Cleaning" },
  { icon: Building2, label: "Premise Cleaning" },
  { icon: AlertCircle, label: "OBHS" },
  { icon: Building, label: "Station Cleaning" },
  { icon: ClipboardCheck, label: "Attendance" },
  { icon: MessageSquare, label: "Complaints" },
  { icon: FileText, label: "Reports" },
  { icon: FileSignature, label: "Contracts" },
  { icon: Users, label: "Users" },
  { icon: Settings, label: "Settings" },
];

const kpis = [
  { label: "Cleaning Compliance", value: "95.4%", color: "#27C93F" },
  { label: "Active Trains", value: "128", color: "#58A6FF" },
  { label: "OBHS Tickets Open", value: "12", color: "#FFBD2E" },
  { label: "Workers Present", value: "1,287", color: "#27C93F" },
  { label: "Pending Audits", value: "4", color: "#FF5F56" },
  { label: "AI Quality Score", value: "91%", color: "#58A6FF" },
];

const trendData = [
  { month: "Jan", compliance: 91 },
  { month: "Feb", compliance: 93 },
  { month: "Mar", compliance: 92 },
  { month: "Apr", compliance: 94 },
  { month: "May", compliance: 93 },
  { month: "Jun", compliance: 95.4 },
];

const divisions = [
  { name: "Northern Railway", value: 95, color: "#27C93F" },
  { name: "Western Railway", value: 92, color: "#27C93F" },
  { name: "Southern Railway", value: 96, color: "#27C93F" },
  { name: "Eastern Railway", value: 89, color: "#FFBD2E" },
  { name: "Central Railway", value: 93, color: "#27C93F" },
];

const alerts = [
  { level: "critical", msg: "Low Cleaning Score - SL-8427", zone: "NR/DLI" },
  { level: "warning", msg: "OBHS Complaint - Platform 3", zone: "ER/HWH" },
  { level: "warning", msg: "Worker Attendance Low - BVG", zone: "NR/NDLS" },
  { level: "info", msg: "Audit Pending - Western Railway", zone: "WR/MMCT" },
];

const contractorData = [
  { name: "BVG India", score: 93 },
  { name: "G4S", score: 84 },
  { name: "ISS Facility", score: 91 },
  { name: "RailCare", score: 80 },
  { name: "CleanWay", score: 86 },
];

const auditData = [
  { name: "Completed", value: 65, color: "#27C93F" },
  { name: "Pending", value: 25, color: "#FFBD2E" },
  { name: "Overdue", value: 10, color: "#FF5F56" },
];

const trainStatusData = [
  { name: "On Schedule", value: 72, color: "#27C93F" },
  { name: "Delayed", value: 15, color: "#FFBD2E" },
  { name: "Maintenance", value: 8, color: "#58A6FF" },
  { name: "Idle", value: 5, color: "#9CA3AF" },
];

function IndiaMapSVG() {
  return (
    <svg viewBox="0 0 200 240" className="w-full h-full" fill="none">
      <path
        d="M100 10 C130 10 160 30 170 60 C180 90 175 120 165 140 C155 160 140 180 120 200 C110 215 105 230 100 235 C95 230 90 215 80 200 C60 180 45 160 35 140 C25 120 20 90 30 60 C40 30 70 10 100 10Z"
        fill="rgba(10,42,136,0.08)"
        stroke="rgba(10,42,136,0.25)"
        strokeWidth="1.5"
      />
      <circle cx="100" cy="80" r="3" fill="#F97316" />
      <circle cx="75" cy="110" r="2.5" fill="#F97316" />
      <circle cx="130" cy="95" r="2.5" fill="#F97316" />
      <circle cx="110" cy="130" r="2.5" fill="#F97316" />
      <circle cx="60" cy="140" r="2.5" fill="#F97316" />
      <circle cx="140" cy="120" r="2.5" fill="#F97316" />
      <circle cx="90" cy="55" r="2" fill="#58A6FF" />
      <circle cx="120" cy="65" r="2" fill="#58A6FF" />
      <circle cx="65" cy="85" r="2" fill="#58A6FF" />
      <circle cx="135" cy="75" r="2" fill="#58A6FF" />
    </svg>
  );
}

export function EnterpriseDashboard() {
  return (
    <div className="relative w-full" style={{ minHeight: "520px" }}>
      {/* Background: control room image */}
      <div
        className="absolute inset-0 rounded-[20px] overflow-hidden"
        style={{
          backgroundImage: `url(${CONTROL_ROOM_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2A88]/60 via-[#0A2A88]/40 to-[#0B1120]/70 backdrop-blur-[1px]" />
      </div>

      {/* Glassmorphism frame */}
      <div className="relative rounded-[20px] border border-white/15 shadow-2xl overflow-hidden backdrop-blur-md bg-white/5"
        style={{ transform: "perspective(1200px) rotateY(-1deg) scale(1.02)", transformOrigin: "center center" }}
      >
        {/* Dashboard container */}
        <div className="flex" style={{ minHeight: "520px" }}>
          {/* Left Sidebar */}
          <div className="w-[44px] bg-[#0A2A88] flex flex-col items-center py-2 gap-0.5 shrink-0">
            <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center mb-1">
              <div className="w-3 h-3 rounded-full border-2 border-white/60" />
            </div>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  title={item.label}
                  className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors group relative"
                >
                  <Icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                  <span className="absolute left-full ml-2 px-2 py-0.5 rounded bg-[#0A2A88] text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg border border-white/10">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col p-3 gap-2 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  VASP Operations Suite
                </span>
                <span className="text-[9px] text-white/30 hidden sm:inline">v3.2.1</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-white/40" />
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#F97316]/80 flex items-center justify-center text-[8px] font-bold text-white">
                    A
                  </div>
                  <ChevronDown className="w-2.5 h-2.5 text-white/30" />
                </div>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-6 gap-2">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-lg bg-white/95 border border-white/20 p-2 shadow-sm"
                >
                  <div className="text-[7px] text-neutral-400 uppercase tracking-wider font-medium">
                    {kpi.label}
                  </div>
                  <div
                    className="text-sm font-bold mt-0.5"
                    style={{ color: kpi.color }}
                  >
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Widgets grid */}
            <div className="grid grid-cols-12 gap-2 flex-1 min-h-0">
              {/* Cleaning Compliance Trend (Line Chart) */}
              <div className="col-span-4 rounded-lg bg-white/95 border border-white/20 p-2.5 shadow-sm flex flex-col">
                <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                  Cleaning Compliance Trend
                </div>
                <div className="flex-1 min-h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fontSize: 8, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                      <YAxis domain={[85, 100]} tick={{ fontSize: 8, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} />
                      <Line
                        type="monotone"
                        dataKey="compliance"
                        stroke="#0A2A88"
                        strokeWidth={2}
                        dot={{ r: 2, fill: "#0A2A88" }}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* India Map */}
              <div className="col-span-3 rounded-lg bg-white/95 border border-white/20 p-2.5 shadow-sm flex flex-col">
                <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                  Division Performance
                </div>
                <div className="flex-1 flex gap-1 min-h-0">
                  <div className="flex-1 flex flex-col justify-center gap-1">
                    {divisions.map((d) => (
                      <div key={d.name} className="flex items-center gap-1">
                        <span className="text-[7px] text-neutral-400 w-10 truncate">{d.name}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${d.value}%`, backgroundColor: d.color }} />
                        </div>
                        <span className="text-[7px] text-neutral-500 w-4 text-right">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="col-span-2 rounded-lg bg-white/95 border border-white/20 p-2.5 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">
                    Recent Alerts
                  </span>
                  <span className="text-[7px] text-neutral-300">Live</span>
                </div>
                <div className="flex-1 space-y-1.5">
                  {alerts.map((a, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-0.5 shrink-0 ${
                          a.level === "critical"
                            ? "bg-[#FF5F56]"
                            : a.level === "warning"
                              ? "bg-[#FFBD2E]"
                              : "bg-[#58A6FF]"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] text-neutral-500 leading-tight truncate">{a.msg}</p>
                        <p className="text-[7px] text-neutral-300">{a.zone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* India Map */}
              <div className="col-span-3 rounded-lg bg-white/95 border border-white/20 p-2.5 shadow-sm flex flex-col">
                <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                  Operational Zones
                </div>
                <div className="flex-1 min-h-0">
                  <IndiaMapSVG />
                </div>
              </div>
            </div>

            {/* Bottom widgets row */}
            <div className="grid grid-cols-12 gap-2" style={{ height: "80px" }}>
              {/* Contractor Performance (Bar Chart) */}
              <div className="col-span-4 rounded-lg bg-white/95 border border-white/20 p-2 shadow-sm">
                <div className="text-[8px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                  Contractor Performance
                </div>
                <div className="h-[calc(100%-18px)]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={contractorData} margin={{ top: 2, right: 2, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="name" tick={{ fontSize: 7, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 7, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                      <Bar dataKey="score" radius={[3, 3, 0, 0]}>
                        {contractorData.map((_, index) => (
                          <Cell key={index} fill={index === 0 || index === 2 ? "#0A2A88" : "#60A5FA"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Audit Status (Donut) */}
              <div className="col-span-4 rounded-lg bg-white/95 border border-white/20 p-2 shadow-sm flex items-center">
                <div className="text-[8px] text-neutral-400 uppercase tracking-wider font-semibold w-16 shrink-0">
                  Audit Status
                </div>
                <div className="flex-1 h-full flex items-center justify-center relative">
                  <div className="w-full h-full" style={{ maxHeight: "64px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={auditData}
                          cx="50%"
                          cy="50%"
                          innerRadius={18}
                          outerRadius={28}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {auditData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-3 absolute bottom-0.5">
                    {auditData.map((d) => (
                      <div key={d.name} className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: d.color }} />
                        <span className="text-[6px] text-neutral-400">{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Train Status (Pie) */}
              <div className="col-span-4 rounded-lg bg-white/95 border border-white/20 p-2 shadow-sm flex items-center">
                <div className="text-[8px] text-neutral-400 uppercase tracking-wider font-semibold w-16 shrink-0">
                  Train Status
                </div>
                <div className="flex-1 h-full flex items-center justify-center relative">
                  <div className="w-full h-full" style={{ maxHeight: "64px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trainStatusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={28}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {trainStatusData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-3 absolute bottom-0.5">
                    {trainStatusData.map((d) => (
                      <div key={d.name} className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: d.color }} />
                        <span className="text-[6px] text-neutral-400">{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vande Bharat train image at bottom-right */}
      <div className="absolute -bottom-4 -right-4 w-1/2 h-auto z-20 pointer-events-none" style={{ maxWidth: "280px" }}>
        <div className="relative">
          <img
            src={TRAIN_IMG}
            alt="Vande Bharat Express"
            className="w-full h-auto rounded-lg shadow-xl"
            style={{ objectFit: "cover", aspectRatio: "3/2" }}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[#0A2A88]/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}
