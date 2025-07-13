'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { LeaderboardEntry } from '@/lib/types';
import { Trophy } from 'lucide-react';

const MOCK_LEADERBOARD_DATA: Omit<LeaderboardEntry, 'isCurrentUser'>[] = [
  { id: 1, name: 'PlayerOne', score: 1250 },
  { id: 2, name: 'TriviaMaster', score: 1180 },
  { id: 3, name: 'QuizWizard', score: 1120 },
  { id: 4, name: 'Brainiac', score: 1050 },
  { id: 5, name: 'SmartyPants', score: 980 },
];

type LeaderboardProps = {
  userScore: number;
};

const Leaderboard = ({ userScore }: LeaderboardProps) => {
  const leaderboardWithUser: LeaderboardEntry[] = [
    ...MOCK_LEADERBOARD_DATA,
    { id: 99, name: 'You', score: userScore, isCurrentUser: true },
  ].sort((a, b) => b.score - a.score);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 0:
        return 'text-yellow-500';
      case 1:
        return 'text-gray-400';
      case 2:
        return 'text-yellow-700';
      default:
        return 'text-primary';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Trophy className="w-6 h-6" />
          Daily Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardWithUser.map((entry, index) => (
              <TableRow key={entry.id} className={entry.isCurrentUser ? 'bg-accent/20' : ''}>
                <TableCell className="font-bold">
                  <div className={`flex items-center gap-2 ${getRankColor(index)}`}>
                    {index < 3 ? <Trophy className="w-5 h-5" /> : null}
                    <span>{index + 1}</span>
                  </div>
                </TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell className="text-right font-medium">
                  {entry.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
