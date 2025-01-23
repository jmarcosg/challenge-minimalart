import Image from 'next/image';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-destructive text-destructive-foreground">
      <Image
        src="/pokedex.png"
        alt="Pokédex logo"
        width={64}
        height={64}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
    </header>
  );
}
