import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group border-neutral-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 rounded-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
          <div className="text-emerald-600">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-neutral-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-500 leading-relaxed text-sm">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
