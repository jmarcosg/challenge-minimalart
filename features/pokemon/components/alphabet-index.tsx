import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface AlphabetIndexProps {
  onSelectLetter: (letter: string) => void;
  selectedLetter: string | null;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function AlphabetIndex({
  onSelectLetter,
  selectedLetter,
}: AlphabetIndexProps) {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <ScrollArea className="h-screen w-12 bg-background border-l border-gray-800/50">
      <div className="flex flex-col items-center space-y-2 py-4 bg-red-500/30">
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
