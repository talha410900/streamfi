'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';

interface Milestone {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  date?: string;
}

interface ProductionTrackerProps {
  dealId: number;
  dealTitle: string;
  milestones: Milestone[];
}

export function ProductionTracker({ dealTitle, milestones }: ProductionTrackerProps) {
  const completedCount = milestones.filter((m) => m.completed).length;
  const progress = (completedCount / milestones.length) * 100;

  return (
    <Card className="border border-border/50">
      <CardHeader>
        <CardTitle>{dealTitle} - Production Status</CardTitle>
        <CardDescription>Track production milestones</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div>
          <div className="flex justify-between mb-2">
            <p className="text-sm font-medium">Progress</p>
            <p className="text-sm font-semibold">{Math.round(progress)}%</p>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex gap-4 p-3 border border-border/50 rounded-lg hover:bg-card transition-colors">
              <div className="flex-shrink-0 mt-1">
                {milestone.completed ? (
                  <CheckCircle2 className="size-5 text-primary" />
                ) : (
                  <Circle className="size-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${milestone.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {milestone.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{milestone.description}</p>
                {milestone.date && (
                  <p className="text-xs text-muted-foreground mt-2">{milestone.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
