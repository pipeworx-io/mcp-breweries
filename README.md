# mcp-breweries

Breweries MCP — Open Brewery DB API (free, no auth)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `search_breweries` | Search for breweries by name. Returns a list of matching breweries with location and contact details. |
| `get_brewery` | Get full details for a specific brewery by its Open Brewery DB ID. |
| `breweries_by_city` | Find breweries located in a specific city. |

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

Or use the CLI:

```bash
npx pipeworx use breweries
```

## License

MIT
