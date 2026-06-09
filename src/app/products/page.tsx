import { createClient } from "@/lib/supabase/server";
import ProductsClient from "./products-client";
import { Monitor, Cpu, Radio, Shield, BarChart3, Bell, ClipboardCheck } from "lucide-react";

const iconList = [Monitor, Cpu, Radio, Shield, BarChart3, Bell, ClipboardCheck];

const fallbackProducts = [
  {
    name: "VASP IoT Gateway", category: "Hardware",
    description: "Industrial-grade IoT gateway for railway asset connectivity and data acquisition.",
    features: ["Multi-protocol support (MQTT, OPC-UA, Modbus)", "Edge computing capabilities", "Secure boot and encrypted storage", "Wide temperature range (-20°C to 70°C)", "Dual Ethernet and 4G/LTE connectivity"],
    specifications: { Processor: "ARM Cortex-A72", RAM: "4GB DDR4", Storage: "64GB eMMC", "Power Input": "24V DC", "IP Rating": "IP65" },
    iconName: "Monitor",
  },
  {
    name: "VASP Sensor Array", category: "Hardware",
    description: "Comprehensive sensor suite for real-time railway asset monitoring.",
    features: ["Vibration analysis sensors", "Temperature and humidity monitoring", "Acoustic emission detection", "GPS location tracking", "Low-power wide-area network"],
    specifications: { "Sensor Types": "10+ configurable", "Sampling Rate": "1kHz", "Battery Life": "5+ years", "Communication": "LoRaWAN / NB-IoT", "Range": "10km line-of-sight" },
    iconName: "Radio",
  },
  {
    name: "VASP Analytics Platform", category: "Software",
    description: "Enterprise AI platform for predictive analytics and operational intelligence.",
    features: ["Real-time data processing", "ML model deployment pipeline", "Custom dashboard builder", "Automated reporting engine", "Third-party API integration"],
    specifications: { "Data Processing": "100K+ events/sec", "Latency": "<10ms", "Uptime SLA": "99.9%", "Deployment": "Cloud / On-premise", "Users": "Unlimited" },
    iconName: "BarChart3",
  },
  {
    name: "VASP Safety Monitor", category: "Software",
    description: "AI-powered computer vision and safety intelligence platform.",
    features: ["Real-time video analytics", "Object detection and tracking", "Automated alert generation", "Incident replay and analysis", "Compliance reporting"],
    specifications: { "Camera Support": "500+ simultaneously", "Detection Accuracy": ">98%", "Alert Latency": "<500ms", "Storage": "90-day retention", "Integration": "API-first architecture" },
    iconName: "Shield",
  },
  {
    name: "VASP Edge Controller", category: "Hardware",
    description: "Ruggedized edge computing device for on-train and wayside deployment.",
    features: ["Real-time data processing", "Local decision making", "Minimal power consumption", "Vibration and shock resistant", "Remote management"],
    specifications: { Processor: "ARM Cortex-A76", RAM: "8GB LPDDR4", Storage: "256GB NVMe", "Power": "12-48V DC", "Operating Temp": "-40°C to 85°C" },
    iconName: "Cpu",
  },
  {
    name: "MCC Platform", category: "Software",
    description: "Enterprise railway operations digitization platform for monitoring, compliance, and workforce tracking.",
    features: ["Digital workflow automation for cleaning operations", "Real-time workforce attendance and task tracking", "AI-powered compliance scoring and audit readiness", "Passenger feedback collection and complaint management", "Contractor performance benchmarking and analytics", "Executive dashboards with KPI monitoring and trends"],
    specifications: { Deployment: "Cloud / On-premise", "Workforce Scale": "10,000+ users", "Compliance Forms": "Unlimited digital templates", "Audit Trail": "Immutable with timestamps", "Mobile Support": "Field workforce enabled", Security: "RBAC + Photo verification" },
    iconName: "ClipboardCheck",
  },
  {
    name: "VASP Operations Hub", category: "Software",
    description: "Centralized command and control platform for railway operations management.",
    features: ["Unified operations dashboard", "Resource tracking and management", "Incident management workflow", "Performance analytics", "Stakeholder collaboration tools"],
    specifications: { Dashboard: "Customizable widgets", "Data Refresh": "Real-time", "Mobile Support": "iOS and Android", Security: "RBAC + SSO", Deployment: "Cloud-native" },
    iconName: "Bell",
  },
];

export default async function ProductsPage() {
  let apiProducts: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) {
      apiProducts = data.filter((p: any) => p.published).map((p: any) => ({
        name: p.name,
        category: p.category || "Software",
        description: p.description || "",
        features: p.features || [],
        specifications: p.specifications || {},
        iconName: p.icon_name || iconList[Math.floor(Math.random() * iconList.length)],
      }));
    }
  } catch {}
  const products = [...apiProducts, ...fallbackProducts];
  return <ProductsClient products={products} />;
}
