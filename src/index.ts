interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * Breweries MCP — Open Brewery DB API (free, no auth)
 *
 * Tools:
 * - search_breweries: search breweries by name
 * - get_brewery: details for a specific brewery by ID
 * - breweries_by_city: breweries located in a given city
 */


const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';

const tools: McpToolExport['tools'] = [
  {
    name: 'search_breweries',
    description: 'Search for breweries by name. Returns a list of matching breweries with location and contact details.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Brewery name or partial name to search for' },
        limit: { type: 'number', description: 'Maximum number of results to return (default 10, max 50)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_brewery',
    description: 'Get full details for a specific brewery by its Open Brewery DB ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Open Brewery DB brewery ID (e.g., "b54b16e1-ac3b-4bff-a11f-f7ae4ddc27e1")' },
      },
      required: ['id'],
    },
  },
  {
    name: 'breweries_by_city',
    description: 'Find breweries located in a specific city.',
    inputSchema: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'City name to search breweries in (e.g., "Portland", "Denver")' },
        limit: { type: 'number', description: 'Maximum number of results to return (default 10, max 50)' },
      },
      required: ['city'],
    },
  },
];

interface RawBrewery {
  id: string;
  name: string;
  brewery_type: string | null;
  address_1: string | null;
  address_2: string | null;
  address_3: string | null;
  city: string | null;
  state_province: string | null;
  postal_code: string | null;
  country: string | null;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
}

function formatBrewery(raw: RawBrewery) {
  const addressParts = [raw.address_1, raw.address_2, raw.address_3].filter(Boolean);
  return {
    id: raw.id,
    name: raw.name,
    type: raw.brewery_type ?? '',
    address: addressParts.join(', '),
    city: raw.city ?? '',
    state: raw.state_province ?? '',
    postal_code: raw.postal_code ?? '',
    country: raw.country ?? '',
    coordinates:
      raw.latitude && raw.longitude
        ? { latitude: parseFloat(raw.latitude), longitude: parseFloat(raw.longitude) }
        : null,
    phone: raw.phone ?? '',
    website: raw.website_url ?? '',
  };
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search_breweries': {
      const query = args.query as string;
      const limit = Math.min(50, Math.max(1, (args.limit as number) ?? 10));
      const params = new URLSearchParams({
        by_name: query,
        per_page: String(limit),
      });
      const res = await fetch(`${BASE_URL}?${params}`);
      if (!res.ok) throw new Error(`Open Brewery DB error: ${res.status}`);
      const data = (await res.json()) as RawBrewery[];
      return {
        count: data.length,
        breweries: data.map(formatBrewery),
      };
    }

    case 'get_brewery': {
      const id = args.id as string;
      const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error(`Brewery not found: ${id}`);
        throw new Error(`Open Brewery DB error: ${res.status}`);
      }
      const data = (await res.json()) as RawBrewery;
      return formatBrewery(data);
    }

    case 'breweries_by_city': {
      const city = args.city as string;
      const limit = Math.min(50, Math.max(1, (args.limit as number) ?? 10));
      const params = new URLSearchParams({
        by_city: city,
        per_page: String(limit),
      });
      const res = await fetch(`${BASE_URL}?${params}`);
      if (!res.ok) throw new Error(`Open Brewery DB error: ${res.status}`);
      const data = (await res.json()) as RawBrewery[];
      return {
        city,
        count: data.length,
        breweries: data.map(formatBrewery),
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool } satisfies McpToolExport;
