export interface CarBrandSales {
  brand: string;
  sales2024: number;
  sales2025: number;
  marketShare: number; // in % for 2025
  growth: number; // percentage change 2024 to 2025
  color: string;
  logoInitial: string;
}

export interface BestSellingCar {
  id: string;
  model: string;
  brand: string;
  category: "Hatch" | "SUV" | "Picape" | "Sedan" | "Elétrico/Híbrido";
  sales2024: number;
  sales2025: number;
  priceRange: string;
  propulsion: string;
  description: string;
  imageUrl: string;
  growth: number;
}

export interface MonthlySales {
  month: string;
  "Combustão": number;
  "Híbrido/Elétrico": number;
  total: number;
}

export interface StateSales {
  state: string;
  name: string;
  percentage: number;
  volume: number;
}

export const BRANDS_SALES_DATA: CarBrandSales[] = [
  { brand: "Fiat", sales2024: 475512, sales2025: 491200, marketShare: 21.8, growth: 3.3, color: "#E31B23", logoInitial: "F" },
  { brand: "Volkswagen", sales2024: 345100, sales2025: 368700, marketShare: 16.3, growth: 6.8, color: "#001E50", logoInitial: "V" },
  { brand: "General Motors", sales2024: 322400, sales2025: 310500, marketShare: 13.8, growth: -3.7, color: "#00529B", logoInitial: "G" },
  { brand: "Toyota", sales2024: 191800, sales2025: 204900, marketShare: 9.1, growth: 6.8, color: "#EB0A1E", logoInitial: "T" },
  { brand: "Hyundai", sales2024: 186200, sales2025: 195400, marketShare: 8.7, growth: 4.9, color: "#002C5F", logoInitial: "H" },
  { brand: "BYD", sales2024: 68100, sales2025: 115200, marketShare: 5.1, growth: 69.1, color: "#001B4B", logoInitial: "B" },
  { brand: "Jeep", sales2024: 118400, sales2025: 122100, marketShare: 5.4, growth: 3.1, color: "#2E4733", logoInitial: "J" },
  { brand: "Renault", sales2024: 115100, sales2025: 108300, marketShare: 4.8, growth: -5.9, color: "#FFCC00", logoInitial: "R" },
  { brand: "Nissan", sales2024: 72400, sales2025: 81200, marketShare: 3.6, growth: 12.1, color: "#C61226", logoInitial: "N" },
  { brand: "GWM", sales2024: 28900, sales2025: 49400, marketShare: 2.2, growth: 70.9, color: "#0A4E9B", logoInitial: "G" }
];

export const TOP_SELLING_CARS: BestSellingCar[] = [
  {
    id: "strada",
    model: "Strada",
    brand: "Fiat",
    category: "Picape",
    sales2024: 120600,
    sales2025: 124800,
    priceRange: "R$ 103.990 - R$ 135.990",
    propulsion: "Flex (1.3 / 1.0 Turbo)",
    description: "A picape mais vendida do Brasil há anos, líder absoluta pela versatilidade unindo uso comercial e de passeio.",
    imageUrl: "https://images.unsplash.com/photo-1606577954057-a74032483fe9?auto=format&fit=crop&q=80&w=400",
    growth: 3.4
  },
  {
    id: "polo",
    model: "Polo",
    brand: "Volkswagen",
    category: "Hatch",
    sales2024: 111200,
    sales2025: 119500,
    priceRange: "R$ 89.990 - R$ 153.990",
    propulsion: "Flex (1.0 Aspirado / TSI)",
    description: "O compacto da VW tornou-se o carro de passeio mais vendido, impulsionado pela versão Track robusta e motorização eficiente.",
    imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400",
    growth: 7.4
  },
  {
    id: "onix",
    model: "Onix",
    brand: "General Motors",
    category: "Hatch",
    sales2024: 102300,
    sales2025: 98100,
    priceRange: "R$ 87.900 - R$ 119.900",
    propulsion: "Flex (1.0 Aspirado / Turbo)",
    description: "Sempre competitivo com excelente custo-benefício, conectividade OnStar e alto valor de revenda histórica.",
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400",
    growth: -4.1
  },
  {
    id: "hb20",
    model: "HB20",
    brand: "Hyundai",
    category: "Hatch",
    sales2024: 88900,
    sales2025: 92400,
    priceRange: "R$ 86.190 - R$ 123.990",
    propulsion: "Flex (1.0 Regular / TGDI)",
    description: "Design renovado e excelente pacote de segurança ativa e passiva que consolidam as fortes vendas mensais.",
    imageUrl: "https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=400",
    growth: 3.9
  },
  {
    id: "tcross",
    model: "T-Cross",
    brand: "Volkswagen",
    category: "SUV",
    sales2024: 72400,
    sales2025: 78600,
    priceRange: "R$ 119.990 - R$ 180.990",
    propulsion: "Flex (1.0 / 1.4 TSI)",
    description: "O SUV mais vendido do país. Destaca-se pelo espaço interno no entre-eixos e excelente acerto dinâmico nas curvas.",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400",
    growth: 8.5
  },
  {
    id: "creta",
    model: "Creta",
    brand: "Hyundai",
    category: "SUV",
    sales2024: 65800,
    sales2025: 71200,
    priceRange: "R$ 139.900 - R$ 187.900",
    propulsion: "Flex / Gasolina",
    description: "Espaço de porta-malas generoso e visual futurista na nova geração que conquistou famílias brasileiras em massa.",
    imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400",
    growth: 8.2
  },
  {
    id: "tracker",
    model: "Tracker",
    brand: "General Motors",
    category: "SUV",
    sales2024: 66400,
    sales2025: 64100,
    priceRange: "R$ 125.900 - R$ 170.990",
    propulsion: "Flex (1.0 / 1.2 Turbo)",
    description: "Equilíbrio em consumo, 6 airbags padrão e central multimídia de alta resposta impulsionam sua frota corporativa e pessoal.",
    imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=400",
    growth: -3.4
  },
  {
    id: "dolphin",
    model: "Dolphin",
    brand: "BYD",
    category: "Elétrico/Híbrido",
    sales2024: 18400,
    sales2025: 32500,
    priceRange: "R$ 149.800 - R$ 184.800",
    propulsion: "100% Elétrico (BEV)",
    description: "A grande revolução do mercado elétrico nacional. Trouxe tecnologia de ponta e autonomia de até 330km por um preço imbatível.",
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=400",
    growth: 76.6
  },
  {
    id: "songplus",
    model: "Song Plus",
    brand: "BYD",
    category: "Elétrico/Híbrido",
    sales2024: 15100,
    sales2025: 27900,
    priceRange: "R$ 229.800 - R$ 239.800",
    propulsion: "Híbrido Plug-in (PHEV)",
    description: "SUV médio que combina motor a combustão moderna com motor elétrico para autonomia combinada superior a 1.000km.",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400",
    growth: 84.7
  },
  {
    id: "haval_h6",
    model: "Haval H6",
    brand: "GWM",
    category: "Elétrico/Híbrido",
    sales2024: 14200,
    sales2025: 23600,
    priceRange: "R$ 214.000 - R$ 319.000",
    propulsion: "Híbrido / Plug-in (HEV/PHEV)",
    description: "SUV de porte premium recheado de assistentes de condução semi-autônoma e desempenho esportivo surpreendente.",
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400",
    growth: 66.2
  }
];

export const MONTHLY_SALES_TREND: MonthlySales[] = [
  { month: "Jan", "Combustão": 142000, "Híbrido/Elétrico": 12000, total: 154000 },
  { month: "Fev", "Combustão": 139000, "Híbrido/Elétrico": 11500, total: 150500 },
  { month: "Mar", "Combustão": 155000, "Híbrido/Elétrico": 14200, total: 169200 },
  { month: "Abr", "Combustão": 162000, "Híbrido/Elétrico": 15800, total: 177800 },
  { month: "Mai", "Combustão": 168000, "Híbrido/Elétrico": 17300, total: 185300 },
  { month: "Jun", "Combustão": 171000, "Híbrido/Elétrico": 18100, total: 189100 },
  { month: "Jul", "Combustão": 175000, "Híbrido/Elétrico": 19400, total: 194400 },
  { month: "Ago", "Combustão": 178000, "Híbrido/Elétrico": 21000, total: 199000 },
  { month: "Set", "Combustão": 169000, "Híbrido/Elétrico": 22200, total: 191200 },
  { month: "Out", "Combustão": 182000, "Híbrido/Elétrico": 24500, total: 206500 },
  { month: "Nov", "Combustão": 184000, "Híbrido/Elétrico": 25100, total: 209100 },
  { month: "Dez", "Combustão": 210000, "Híbrido/Elétrico": 29800, total: 239850 }
];

export const STATE_DISTRIBUTION: StateSales[] = [
  { state: "SP", name: "São Paulo", percentage: 34.2, volume: 782000 },
  { state: "MG", name: "Minas Gerais", percentage: 17.5, volume: 400250 },
  { state: "PR", name: "Paraná", percentage: 8.3, volume: 189800 },
  { state: "RJ", name: "Rio de Janeiro", percentage: 7.9, volume: 180700 },
  { state: "RS", name: "Rio Grande do Sul", percentage: 6.8, volume: 155500 },
  { state: "SC", name: "Santa Catarina", percentage: 5.1, volume: 116600 },
  { state: "BA", name: "Bahia", percentage: 4.2, volume: 96100 }
];

export const GENERAL_STATS = {
  totalSales2024: 2200812,
  totalSales2025: 2346700,
  growthRate: 6.63,
  evShare2024: 5.4,
  evShare2025: 10.3,
  avgCarPrice: "R$ 143.500",
  peakMonth: "Dezembro"
};

export const MARKET_INSIGHTS = [
  {
    title: "A Revolução Silenciosa dos Eletrificados",
    category: "Elétricos e Híbridos",
    text: "O segmento de híbridos e elétricos praticamente dobrou de participação em 2025, impulsionado por marcas asiáticas (BYD e GWM). Estes fabricantes conseguiram estabilizar preços de entrada competitivos para modelos premium de alta eficiência.",
    trend: "em_alta"
  },
  {
    title: "Consolidação Definitiva da Categoria SUV",
    category: "SUVs e Utilitários",
    text: "Quase 47% dos carros de passeio de uso exclusivamente civil vendidos em 2025 pertencem de alguma forma à categoria SUV ou crossovers urbanos. O VW T-Cross e o Hyundai Creta lideram a preferência do consumidor nas capitais brasileiras.",
    trend: "estavel"
  },
  {
    title: "O Domínio Corporativo da Fiat Strada",
    category: "Comerciais Leves",
    text: "A picape compacta Strada continua a liderar de ponta a ponta as vendas nacionais pelo 4º ano seguinte. O alto volume em frotas comerciais, frotistas e setor do agronegócio dá uma margem insuperável em relação aos hatches compactos concorrentes.",
    trend: "em_alta"
  }
];
