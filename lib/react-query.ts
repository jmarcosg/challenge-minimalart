import { DefaultOptions } from "@tanstack/react-query";

export const queryConfig = {
	queries: {
		// throwOnError: true,
		refetchOnWindowFocus: false,
		retry: false,
		staleTime: 1000 * 60,
	},
} satisfies DefaultOptions;

export type ApiFnReturnType<FnType extends (...args: unknown[]) => Promise<unknown>> =
	Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: unknown[]) => unknown> = Omit<
	ReturnType<T>,
	"queryKey" | "queryFn"
>;
