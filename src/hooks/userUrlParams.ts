// src/hooks/useUrlParams.ts
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const ParamsSchema = z.object({
  consumo: z.string().optional(),
  immessa: z.string().optional(),
  data_trigger: z.string().optional(),
  potenza_trigger : z.string().optional(),
  potenza_attuale: z.string().optional(),
  durata_trigger: z.string().optional()
});

type Params = z.infer<typeof ParamsSchema>;

const useUrlParams = (): Params => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return ParamsSchema.parse(params);
};

export default useUrlParams;