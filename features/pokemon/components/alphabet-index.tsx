import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AlphabetIndexProps {
  onSelectLetter: (letter: string) => void;
  selectedLetter: string | null;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function AlphabetIndex({
  onSelectLetter,
  selectedLetter,
}: AlphabetIndexProps) {
  return (
    <ScrollArea className="h-screen w-12 bg-background border-l">
      <div className="flex flex-col items-center space-y-2 py-4">
        {alphabet.map((letter) => (
          <Button
            key={letter}
            variant={selectedLetter === letter ? 'destructive' : 'ghost'}
            className={`w-8 h-8 p-0 ${
              selectedLetter === letter ? 'opacity-100' : 'opacity-30'
            }`}
            onClick={() => onSelectLetter(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
