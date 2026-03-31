# @pipeworx/mcp-breweries

MCP server for brewery data -- search and browse via [Open Brewery DB](https://www.openbrewerydb.org/) (free, no auth required).

## Tools

| Tool | Description |
|------|-------------|
| `search_breweries` | Search breweries by name |
| `get_brewery` | Get full details for a brewery by ID |
| `breweries_by_city` | Find breweries in a specific city |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "breweries": {
      "url": "https://gateway.pipeworx.io/breweries/mcp"
    }
  }
}
```

Or run via CLI:

```bash
npx pipeworx use breweries
```

## License

MIT
