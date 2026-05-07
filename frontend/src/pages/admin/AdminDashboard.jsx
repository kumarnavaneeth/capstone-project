import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Plane, Building2, Users, Activity, ArrowRight } from "lucide-react";

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8" /> Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage flight schedules, airline partners, and system performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Flights" value="128" icon={<Plane className="h-4 w-4" />} trend="+12%" />
        <StatCard title="Active Airlines" value="12" icon={<Building2 className="h-4 w-4" />} trend="+2" />
        <StatCard title="Total Users" value="1,240" icon={<Users className="h-4 w-4" />} trend="+84" />
        <StatCard title="System Health" value="Optimal" icon={<Activity className="h-4 w-4" />} trend="99.9%" color="text-green-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminActionCard
          title="Manage Flights"
          description="Add new flight schedules, update timings, or cancel existing flights."
          icon={<Plane className="h-10 w-10 text-primary" />}
          link="/admin/add-flights"
          actionText="Add Flight"
        />
        <AdminActionCard
          title="Airline Partners"
          description="Register new airline partners, manage their status, and view performance."
          icon={<Building2 className="h-10 w-10 text-primary" />}
          link="/admin/register-airline"
          actionText="Register Airline"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, color = "text-primary" }) {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="p-2 rounded-lg bg-muted">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">
          {trend}
        </div>
      </div>
    </div>
  );
}

function AdminActionCard({ title, description, icon, link, actionText }) {
  return (
    <div className="group bg-card border rounded-3xl p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div className="mb-6 p-4 rounded-2xl bg-primary/5 w-fit">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        {description}
      </p>
      <Link 
        to={link} 
        className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-95"
      >
        {actionText} <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}

export default AdminDashboard;
