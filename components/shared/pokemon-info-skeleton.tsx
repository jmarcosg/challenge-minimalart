import { Skeleton } from '../ui/skeleton';

export function PokemonInfoSkeleton() {
  return (
    <>
      <div className="relative aspect-square w-full max-w-[300px] mx-auto">
        <Skeleton className="object-contain p-4" />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Types</h3>
          <div className="flex gap-2">
            <Skeleton className="w-16 h-8" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Stats</h3>
          <div className="space-y-2">
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Height</h3>
            <Skeleton className="w-16 h-4" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Weight</h3>
            <Skeleton className="w-16 h-4" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Abilities</h3>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="w-24 h-8" />
          </div>
        </div>
      </div>
    </>
  );
}
