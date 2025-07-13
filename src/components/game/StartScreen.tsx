'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Loader2, Zap } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

type StartScreenProps = {
  onStart: (topic: string) => void;
  loading: boolean;
  topics: string[];
};

const StartScreen = ({ onStart, loading, topics }: StartScreenProps) => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl bg-card shadow-2xl animate-fade-in">
      <div className="relative mb-4">
        <BrainCircuit className="w-24 h-24 text-primary" />
        <Zap className="absolute -bottom-2 -right-2 w-10 h-10 text-accent fill-accent" />
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl">
        TriviaBlitz
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Test your knowledge with five daily questions. Answer fast for a higher
        score!
      </p>

      <div className="mt-8 w-full max-w-sm space-y-4">
        <div className="grid w-full items-center gap-1.5 text-left">
          <Label htmlFor="topic" className="font-semibold text-primary">Choose a Topic</Label>
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger id="topic" className="w-full">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={() => onStart(selectedTopic)}
          disabled={loading || !selectedTopic}
          size="lg"
          className="w-full py-6 text-lg font-bold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Questions...
            </>
          ) : (
            'Start Daily Challenge'
          )}
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
