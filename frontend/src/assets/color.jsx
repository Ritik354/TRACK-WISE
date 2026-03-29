// constants/financeConstants.js
// constants/financeConstants.js
import {
  Utensils,
  Home,
  Car,
  ShoppingCart,
  Gift,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart2,
  ArrowUp,
  FileText,
  Briefcase,
  CreditCard,
  ShoppingBag,
  Film,
  Wifi,
  Heart,
} from "lucide-react";

export const GAUGE_COLORS = {
  Income: {
    gradientStart: "#10b981",
    gradientEnd: "#059669",
    text: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  Spent: {
    gradientStart: "#4f46e5",
    gradientEnd: "#4338ca",
    text: "text-indigo-600",
    bg: "bg-indigo-100",
  },
  Savings: {
    gradientStart: "#14b8a6",
    gradientEnd: "#0d9488",
    text: "text-teal-600",
    bg: "bg-teal-100",
  },
};

export const COLORS = [
  "#10b981",
  "#059669",
  "#14b8a6",
  "#0d9488",
  "#4f46e5",
  "#6366f1",
];

export const INCOME_COLORS = [
  "#10b981",
  "#34d399",
  "#6ee7b7",
  "#a7f3d0",
  "#d1fae5",
];

export const CATEGORY_ICONS_Inc = {
  Salary: <TrendingUp className="w-4 h-4" />,
  Freelance: <BarChart2 className="w-4 h-4" />,
  Investment: <ArrowUp className="w-4 h-4" />,
  Bonus: <FileText className="w-4 h-4" />,
  Other: <DollarSign className="w-4 h-4" />,
};

export const CATEGORY_ICONS = {
  Food: <Utensils className="w-4 h-4" />,
  Housing: <Home className="w-4 h-4" />,
  Transport: <Car className="w-4 h-4" />,
  Shopping: <ShoppingCart className="w-4 h-4" />,
  Entertainment: <Gift className="w-4 h-4" />,
  Utilities: <Home className="w-4 h-4" />,
  Healthcare: <Gift className="w-4 h-4" />,
  Salary: <TrendingUp className="w-4 h-4" />,
  Freelance: <TrendingDown className="w-4 h-4" />,
  Other: <DollarSign className="w-4 h-4" />,
};

// Enhanced category icons with more specific icons for income categories
export const INCOME_CATEGORY_ICONS = {
  Salary: <Briefcase className="w-5 h-5 text-emerald-600" />,
  Freelance: <CreditCard className="w-5 h-5 text-emerald-600" />,
  Investment: <TrendingUp className="w-5 h-5 text-emerald-600" />,
  Gift: <Gift className="w-5 h-5 text-emerald-600" />,
  Other: <DollarSign className="w-5 h-5 text-emerald-600" />,
};

export const EXPENSE_CATEGORY_ICONS = {
  Food: <Utensils className="w-5 h-5 text-indigo-500" />,
  Housing: <Home className="w-5 h-5 text-indigo-500" />,
  Transport: <Car className="w-5 h-5 text-indigo-500" />,
  Shopping: <ShoppingBag className="w-5 h-5 text-indigo-500" />,
  Entertainment: <Film className="w-5 h-5 text-indigo-500" />,
  Utilities: <Wifi className="w-5 h-5 text-indigo-500" />,
  Healthcare: <Heart className="w-5 h-5 text-indigo-500" />,
  Other: <ShoppingCart className="w-5 h-5 text-indigo-500" />,
};

export const colorClasses = {
  income: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    border: "border-emerald-200",
    ring: "ring-emerald-500",
    button: "bg-emerald-500 hover:bg-emerald-600 text-white",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  expense: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    ring: "ring-indigo-500",
    button: "bg-indigo-500 hover:bg-indigo-600 text-white",
    iconBg: "bg-indigo-100 text-indigo-600",
  },
};
