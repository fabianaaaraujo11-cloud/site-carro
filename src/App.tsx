import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Car,
  TrendingUp,
  TrendingDown,
  Percent,
  Search,
  SlidersHorizontal,
  ChevronRight,
  BatteryCharging,
  DollarSign,
  Award,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  Info
} from "lucide-react";
import {
  BRANDS_SALES_DATA,
  TOP_SELLING_CARS,
  MONTHLY_SALES_TREND,
  STATE_DISTRIBUTION,
  GENERAL_STATS,
  MARKET_INSIGHTS,
  CarBrandSales,
  BestSellingCar
} from "./data";

export default function App() {
  // Application State
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [carFilterCategory, setCarFilterCategory] = useState<string>("Todos");
  const [carSearchQuery, setCarSearchQuery] = useState<string>("");
  const [brandSearchQuery, setBrandSearchQuery] = useState<string>("");
  const [compareBrandA, setCompareBrandA] = useState<string>("Fiat");
  const [compareBrandB, setCompareBrandB] = useState<string>("Volkswagen");
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "models" | "compare">("dashboard");

  // Filter Brand Data based on search
  const filteredBrands = useMemo(() => {
    return BRANDS_SALES_DATA.filter((b) =>
      b.brand.toLowerCase().includes(brandSearchQuery.toLowerCase())
    );
  }, [brandSearchQuery]);

  // Max value for scaling SVG bar charts
  const maxBrandSales = useMemo(() => {
    return Math.max(...BRANDS_SALES_DATA.map((b) => Math.max(b.sales2024, b.sales2025)));
  }, []);

  // Filter Cars based on search & category
  const filteredCars = useMemo(() => {
    return TOP_SELLING_CARS.filter((car) => {
      const matchesCategory = carFilterCategory === "Todos" || car.category === carFilterCategory;
      const matchesSearch =
        car.model.toLowerCase().includes(carSearchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(carSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [carFilterCategory, carSearchQuery]);

  // Comparison logic helper
  const brandDataA = useMemo(() => {
    return BRANDS_SALES_DATA.find((b) => b.brand === compareBrandA) || BRANDS_SALES_DATA[0];
  }, [compareBrandA]);

  const brandDataB = useMemo(() => {
    return BRANDS_SALES_DATA.find((b) => b.brand === compareBrandB) || BRANDS_SALES_DATA[1];
  }, [compareBrandB]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Banner Alert */}
      {showNotification && (
        <div id="top-notification-banner" className="bg-indigo-900 text-indigo-100 px-4 py-2 text-center text-xs md:text-sm flex justify-between items-center z-50">
          <div className="mx-auto flex items-center gap-2">
            <span className="font-semibold bg-indigo-700 text-white px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase">Foco de Mercado</span>
            <span>Carros Elétricos e Híbridos alcançaram {GENERAL_STATS.evShare2025}% de participação nas vendas acumuladas.</span>
          </div>
          <button
            id="dismiss-banner-btn"
            onClick={() => setShowNotification(false)}
            className="text-indigo-300 hover:text-white transition-colors p-1"
            title="Fechar"
          >
            &times;
          </button>
        </div>
      )}

      {/* Main Header */}
      <header id="app-main-header" className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-md shadow-indigo-100">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Apoio Fenabrave</span>
                <span className="text-xs text-slate-400 font-mono">v1.2.5</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 tracking-tight">DRIVESTATS BRASIL</h1>
            </div>
          </div>

          {/* Navigation Controls */}
          <div id="nav-tabs" className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              id="tab-dashboard-btn"
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === "dashboard"
                  ? "bg-white text-indigo-700 shadow-sm font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Painel Geral
            </button>
            <button
              id="tab-models-btn"
              onClick={() => setActiveTab("models")}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === "models"
                  ? "bg-white text-indigo-700 shadow-sm font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Modelos Mais Vendidos
            </button>
            <button
              id="tab-compare-btn"
              onClick={() => setActiveTab("compare")}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === "compare"
                  ? "bg-white text-indigo-700 shadow-sm font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Comparar Marcas
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: DASHBOARD GERAL OTIMIZADO */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            
            {/* KPI Metrics List */}
            <section id="key-metrics-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Vendas Anuais (2025)</p>
                    <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">
                      {GENERAL_STATS.totalSales2025.toLocaleString("pt-BR")} <span className="text-xs font-normal text-slate-400">unids.</span>
                    </h3>
                  </div>
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-100 transition-colors">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded">
                    +{GENERAL_STATS.growthRate}%
                  </span>
                  <span className="text-[11px] text-slate-500">em relação ao ano de 2024 ({GENERAL_STATS.totalSales2024.toLocaleString("pt-BR")})</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Destaque de Eletrificação</p>
                    <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">
                      {GENERAL_STATS.evShare2025}% <span className="text-xs font-normal text-slate-400">do mercado</span>
                    </h3>
                  </div>
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-100 transition-colors">
                    <BatteryCharging className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Quase Dobrou!
                  </span>
                  <span className="text-[11px] text-slate-500">Representava apenas {GENERAL_STATS.evShare2024}% em 2024</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Líder Comercial Absoluto</p>
                    <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">
                      Strada <span className="text-xs font-normal text-slate-400">({TOP_SELLING_CARS[0].brand})</span>
                    </h3>
                  </div>
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-100 transition-colors">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">124.800 unidades em 2025</span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">+3.4% growth</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Preço Médio Estimado</p>
                    <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">
                      {GENERAL_STATS.avgCarPrice}
                    </h3>
                  </div>
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <span className="text-xs text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Médio/Alto</span>
                  <span className="text-[11px] text-slate-500">Puxado pelo avanço expressivo de SUVs</span>
                </div>
              </motion.div>
            </section>

            {/* Main Interactive Visualizations Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* BRAND PERFORMANCE STATS & CHART */}
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900">Vendas Acumuladas por Fabricante</h3>
                    <p className="text-sm text-slate-500">Comparativo das vendas totais de emplacamentos 2024 vs 2025</p>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="brand-search-input"
                      type="text"
                      placeholder="Pesquisar fabricante..."
                      value={brandSearchQuery}
                      onChange={(e) => setBrandSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>

                {/* SVG Vertical Grouped Bar Chart */}
                <div className="space-y-4">
                  {filteredBrands.map((brand, bIndex) => {
                    const pct2024 = (brand.sales2024 / maxBrandSales) * 100;
                    const pct2025 = (brand.sales2025 / maxBrandSales) * 100;
                    const isSelected = selectedBrand === brand.brand;

                    return (
                      <div
                        id={`brand-bar-item-${brand.brand.toLowerCase()}`}
                        key={brand.brand}
                        onClick={() => setSelectedBrand(isSelected ? null : brand.brand)}
                        className={`p-3 rounded-xl transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-slate-50 border-indigo-400 ring-1 ring-indigo-100"
                            : "bg-white border-transparent hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="flex items-center gap-2.5">
                            <span
                              style={{ backgroundColor: brand.color }}
                              className="w-5 h-5 rounded-md text-white text-[10px] font-bold flex items-center justify-center font-display"
                            >
                              {brand.logoInitial}
                            </span>
                            <span className="font-semibold text-slate-900 text-sm md:text-base">{brand.brand}</span>
                            <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                              {brand.marketShare}% Share
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-slate-400">Crescimento:</span>
                            <span className={`font-bold flex items-center gap-0.5 ${brand.growth >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                              {brand.growth >= 0 ? "+" : ""}{brand.growth}%
                              {brand.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            </span>
                          </div>
                        </div>

                        {/* Grouped Horizontal Bars */}
                        <div className="space-y-1">
                          {/* 2024 Bar */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-semibold w-8">2024</span>
                            <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct2024}%` }}
                                transition={{ duration: 0.8 }}
                                className="bg-slate-400 h-full rounded-full"
                              />
                            </div>
                            <span className="text-xs text-slate-500 font-mono w-16 text-right">
                              {brand.sales2024.toLocaleString("pt-BR")}
                            </span>
                          </div>
                          
                          {/* 2025 Bar */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-semibold w-8">2025</span>
                            <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct2025}%` }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                style={{ backgroundColor: brand.color }}
                                className="h-full rounded-full"
                              />
                            </div>
                            <span className="text-xs font-bold text-slate-800 font-mono w-16 text-right">
                              {brand.sales2025.toLocaleString("pt-BR")}
                            </span>
                          </div>
                        </div>

                        {/* Conditional Details on Click */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 grid grid-cols-2 sm:grid-cols-3 gap-2"
                            >
                              <div>
                                <span className="block text-[10px] text-slate-400 uppercase font-bold">Liderança de Portfólio</span>
                                <span className="font-semibold text-slate-900">
                                  {TOP_SELLING_CARS.filter(c => c.brand === brand.brand)[0]?.model || "Mais vendidos no varejo"}
                                </span>
                              </div>
                              <div>
                                <span className="block text-[10px] text-slate-400 uppercase font-bold">Evolução Absoluta</span>
                                <span className="font-semibold text-slate-900">
                                  {(brand.sales2025 - brand.sales2024) >= 0 ? "+" : ""}
                                  {(brand.sales2025 - brand.sales2024).toLocaleString("pt-BR")} unidades
                                </span>
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                <span className="block text-[10px] text-slate-400 uppercase font-bold">Status Fenabrave</span>
                                <span className="font-semibold text-indigo-700 flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5" /> Forte consolidação
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PROPULSION DYNAMICS AND REGIONAL SPREAD */}
              <div className="space-y-6">
                
                {/* Propulsion Type Share Doughnut / Bar Stack */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200">
                  <h3 className="text-md font-bold font-display text-slate-900 mb-2">Composição Tecnológica do Mercado</h3>
                  <p className="text-xs text-slate-500 mb-4">Combustão Convencional (Flex) vs Novos Eletrificados (EV/PHEV)</p>

                  <div className="relative pt-2">
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-indigo-800">Flex / Gasolina ({100 - GENERAL_STATS.evShare2025}%)</span>
                      <span className="text-emerald-700">Eletrificados ({GENERAL_STATS.evShare2025}%)</span>
                    </div>
                    {/* Progress Bar Stack */}
                    <div className="w-full h-5 bg-indigo-100 rounded-lg flex overflow-hidden">
                      <div
                        style={{ width: `${100 - GENERAL_STATS.evShare2025}%` }}
                        className="bg-indigo-600 h-full flex items-center justify-center text-[10px] text-white font-bold"
                        title="Flex/Gasolina"
                      >
                        Combustão
                      </div>
                      <div
                        style={{ width: `${GENERAL_STATS.evShare2025}%` }}
                        className="bg-emerald-500 h-full flex items-center justify-center text-[10px] text-white font-bold"
                        title="Eletrificados"
                      >
                        EV / PHEV
                      </div>
                    </div>

                    <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2 justify-between">
                        <span className="flex items-center gap-1.5"><SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" /> Eletrificados em 2024:</span>
                        <span className="font-semibold text-slate-800">{GENERAL_STATS.evShare2024}%</span>
                      </div>
                      <div className="flex items-center gap-2 justify-between">
                        <span className="flex items-center gap-1.5"><BatteryCharging className="w-3.5 h-3.5 text-emerald-600" /> Crescimento EV anual:</span>
                        <span className="font-semibold text-emerald-600 font-mono">+90.7% crescimento</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* State-Level Distribution */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-md font-bold font-display text-slate-900">Maiores Mercados Consumidores</h3>
                    <span className="text-[10px] bg-slate-100 font-mono px-2 py-1 rounded">Por Estado</span>
                  </div>

                  <div className="space-y-3.5">
                    {STATE_DISTRIBUTION.map((item) => (
                      <div key={item.state} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-slate-800">{item.name} ({item.state})</span>
                          <span className="font-bold text-slate-900 font-mono">
                            {item.volume.toLocaleString("pt-BR")} <span className="font-normal text-slate-400">({item.percentage}%)</span>
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${item.percentage * 2.5}%` }}
                            className="bg-slate-700 h-full rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* MoM trend linear visualization */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900">Evolução Mensal de Emplacamentos</h3>
                  <p className="text-sm text-slate-500">Curva de compras e vendas por tipo de motorização</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-indigo-700">
                    <span className="w-3 h-3 bg-indigo-600 rounded-full block" /> Combustão Flex
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full block" /> Híbridos/Elétricos
                  </span>
                </div>
              </div>

              {/* Custom SVG Line Area Graph with responsive design */}
              <div className="overflow-x-auto">
                <div className="min-w-[600px] h-[220px] relative pt-2">
                  <svg className="w-full h-full" viewBox="0 0 1000 200">
                    {/* Grid lines */}
                    <line x1="0" y1="50" x2="1000" y2="50" stroke="#f1f5f9" strokeDasharray="5,5" />
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="#f1f5f9" strokeDasharray="5,5" />
                    <line x1="0" y1="150" x2="1000" y2="150" stroke="#f1f5f9" strokeDasharray="5,5" />

                    {/* Polyline for Combustion sales */}
                    <polyline
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3.5"
                      points={MONTHLY_SALES_TREND.map((t, index) => {
                        const x = (index / (MONTHLY_SALES_TREND.length - 1)) * 960 + 20;
                        const y = 170 - (t["Combustão"] / 220000) * 150;
                        return `${x},${y}`;
                      }).join(" ")}
                    />

                    {/* Polyline for EV sales */}
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      points={MONTHLY_SALES_TREND.map((t, index) => {
                        const x = (index / (MONTHLY_SALES_TREND.length - 1)) * 960 + 20;
                        const y = 170 - (t["Híbrido/Elétrico"] / 40000) * 150; // Scaled to show trend clearly
                        return `${x},${y}`;
                      }).join(" ")}
                    />

                    {/* Data Points and Dots */}
                    {MONTHLY_SALES_TREND.map((t, index) => {
                      const x = (index / (MONTHLY_SALES_TREND.length - 1)) * 960 + 20;
                      const yCombustion = 170 - (t["Combustão"] / 220000) * 150;
                      const yEV = 170 - (t["Híbrido/Elétrico"] / 40000) * 150;

                      return (
                        <g key={index}>
                          <circle cx={x} cy={yCombustion} r="4" fill="#4f46e5" />
                          <circle cx={x} cy={yEV} r="4" fill="#10b981" />
                          {/* Rich Text labels for critical points */}
                          {(index === 0 || index === MONTHLY_SALES_TREND.length - 1) && (
                            <text x={x} y={yCombustion - 10} textAnchor="middle" fill="#1e1b4b" fontSize="10" fontWeight="bold">
                              {t["Combustão"].toLocaleString("pt-BR")}
                            </text>
                          )}
                          {(index === 0 || index === MONTHLY_SALES_TREND.length - 1) && (
                            <text x={x} y={yEV - 10} textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="bold">
                              {t["Híbrido/Elétrico"].toLocaleString("pt-BR")}
                            </text>
                          )}
                          <text x={x} y="192" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="semibold">
                            {t.month}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
              <div className="mt-4 bg-slate-50 p-4 rounded-xl flex items-center gap-3 border border-slate-100">
                <Info className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <p className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Tendência sazonal perceptível:</span> O mês de <span className="font-semibold">Dezembro</span> registra o pico isolado de emplacamentos de veículos novos decorrente do pagamento de 13º salário e promoções agressivas das concessionárias na transição de modelo/ano.
                </p>
              </div>
            </div>

            {/* Strategic Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MARKET_INSIGHTS.map((insight, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {insight.category}
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Análise de Mercado
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{insight.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: CATÁLOGO DE MODELOS LÍDERES */}
        {activeTab === "models" && (
          <div className="space-y-6">
            
            {/* Filter Tools & Interactive Controls */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {["Todos", "SUV", "Hatch", "Picape", "Elétrico/Híbrido"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCarFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      carFilterCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="car-search-input"
                  type="text"
                  placeholder="Buscar modelo ou marca..."
                  value={carSearchQuery}
                  onChange={(e) => setCarSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>
            </div>

            {/* Model grid with micro-animations */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredCars.map((car, cIdx) => (
                  <motion.div
                    layout
                    id={`car-card-item-${car.id}`}
                    key={car.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:border-slate-300 transition-all"
                  >
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={car.imageUrl}
                        alt={car.model}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm shadow-sm text-[10px] font-bold text-slate-900 px-2.5 py-1 rounded-full uppercase">
                        {car.category}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-indigo-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        {car.priceRange}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{car.brand}</span>
                          <span className="text-xs font-mono text-slate-400">Emplacamentos</span>
                        </div>
                        <h4 className="text-lg font-bold font-display text-slate-900">{car.model}</h4>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">{car.description}</p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Vendas Acumuladas 2025:</span>
                          <span className="font-bold text-slate-900 font-mono">{car.sales2025.toLocaleString("pt-BR")} unids.</span>
                        </div>
                        <div className="flex justify-between text-xs items-center">
                          <span className="text-slate-500">Crescimento Anual:</span>
                          <span className={`font-bold flex items-center gap-0.5 ${car.growth >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                            {car.growth >= 0 ? "+" : ""}{car.growth}%
                            {car.growth >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px] bg-slate-50 p-2 rounded-lg text-slate-600">
                          <span className="font-medium">Propulsão:</span>
                          <span className="font-semibold text-slate-800">{car.propulsion}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredCars.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-600">Nenhum veículo encontrado com esse termo para a categoria selecionada.</p>
                <button
                  id="reset-search-btn"
                  onClick={() => { setCarSearchQuery(""); setCarFilterCategory("Todos"); }}
                  className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: COMPARADOR DE MARCAS AVANÇADO */}
        {activeTab === "compare" && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <h3 className="text-lg font-bold font-display text-slate-900 mb-2">Painel Comparativo</h3>
              <p className="text-sm text-slate-500 mb-6">Selecione duas marcas concorrentes na listagem oficial e compare seus resultados side-by-side.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="compare-brand-select-a" className="block text-xs font-bold text-slate-400 uppercase mb-2">Fabricante A</label>
                  <select
                    id="compare-brand-select-a"
                    value={compareBrandA}
                    onChange={(e) => setCompareBrandA(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                  >
                    {BRANDS_SALES_DATA.map((brand) => (
                      <option key={brand.brand} value={brand.brand}>
                        {brand.brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="compare-brand-select-b" className="block text-xs font-bold text-slate-400 uppercase mb-2">Fabricante B</label>
                  <select
                    id="compare-brand-select-b"
                    value={compareBrandB}
                    onChange={(e) => setCompareBrandB(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                  >
                    {BRANDS_SALES_DATA.map((brand) => (
                      <option key={brand.brand} value={brand.brand} disabled={brand.brand === compareBrandA}>
                        {brand.brand}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Comparison Cards & Analysis Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Brand A Container */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    style={{ backgroundColor: brandDataA.color }}
                    className="w-8 h-8 rounded-lg text-white font-bold flex items-center justify-center font-display text-base"
                  >
                    {brandDataA.logoInitial}
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 uppercase font-display">{brandDataA.brand}</h4>
                    <span className="text-xs text-slate-400">Dados Consolidados do Fabricante</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl items-center">
                    <span className="text-xs text-slate-500 uppercase">Vendas 2024:</span>
                    <span className="font-bold font-mono text-slate-800">{brandDataA.sales2024.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl items-center">
                    <span className="text-xs text-slate-500 uppercase">Vendas 2025:</span>
                    <span className="font-bold font-mono text-indigo-700">{brandDataA.sales2025.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl items-center">
                    <span className="text-xs text-slate-500 uppercase">Participação de Mercado:</span>
                    <span className="font-bold font-mono text-slate-800">{brandDataA.marketShare}%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl items-center">
                    <span className="text-xs text-slate-500 uppercase">Crescimento Anual:</span>
                    <span className={`font-bold flex items-center gap-0.5 ${brandDataA.growth >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {brandDataA.growth >= 0 ? "+" : ""}{brandDataA.growth}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Brand B Container */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    style={{ backgroundColor: brandDataB.color }}
                    className="w-8 h-8 rounded-lg text-white font-bold flex items-center justify-center font-display text-base"
                  >
                    {brandDataB.logoInitial}
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 uppercase font-display">{brandDataB.brand}</h4>
                    <span className="text-xs text-slate-400">Dados Consolidados do Fabricante</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl items-center">
                    <span className="text-xs text-slate-500 uppercase">Vendas 2024:</span>
                    <span className="font-bold font-mono text-slate-800">{brandDataB.sales2024.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl items-center">
                    <span className="text-xs text-slate-500 uppercase">Vendas 2025:</span>
                    <span className="font-bold font-mono text-indigo-700">{brandDataB.sales2025.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl items-center">
                    <span className="text-xs text-slate-500 uppercase">Participação de Mercado:</span>
                    <span className="font-bold font-mono text-slate-800">{brandDataB.marketShare}%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl items-center">
                    <span className="text-xs text-slate-500 uppercase">Crescimento Anual:</span>
                    <span className={`font-bold flex items-center gap-0.5 ${brandDataB.growth >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {brandDataB.growth >= 0 ? "+" : ""}{brandDataB.growth}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Comparison Conclusion Display */}
            <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                <h4 className="text-base font-bold font-display text-white">Análise Conclusiva de Mercado</h4>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  A marca <span className="font-bold text-white">{brandDataA.sales2025 > brandDataB.sales2025 ? brandDataA.brand : brandDataB.brand}</span> lidera
                  em volume total absoluto, vendendo <span className="font-semibold text-white">
                    {Math.abs(brandDataA.sales2025 - brandDataB.sales2025).toLocaleString("pt-BR")}
                  </span> mais unidades emplacadas em comparação direta.
                </p>

                <p>
                  No entanto, a fabricante <span className="font-bold text-white">{brandDataA.growth > brandDataB.growth ? brandDataA.brand : brandDataB.brand}</span> demonstra
                  um dinamismo comercial e avanço de penetração mais agressiva com ritmo de expansão anual de <span className="text-emerald-400 font-bold">
                    {Math.max(brandDataA.growth, brandDataB.growth).toFixed(1)}%
                  </span> comparado a {Math.min(brandDataA.growth, brandDataB.growth).toFixed(1)}% do oponente direto.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modern Dashboard Footer */}
      <footer id="app-footer" className="bg-white border-t border-slate-200 mt-20 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Drivestats Brasil - Registros Oficiais da Indústria Automotiva Nacional.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 transition-colors cursor-pointer">Termos de Uso</span>
            <span className="hover:text-slate-600 transition-colors cursor-pointer font-semibold text-indigo-600">Dados Consolidados para o Brasil</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
