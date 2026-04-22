# mcp-breweries

Breweries MCP — Open Brewery DB API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `search_breweries` | Search for breweries by name. Returns location, phone, website, and contact details for matching results. |
| `get_brewery` | Get full details for a brewery by ID. Returns address, hours, type, and contact info. Use search_breweries to find brewery IDs. |
| `breweries_by_city` | Find all breweries in a city (e.g., "Portland", "Denver"). Returns location, type, and contact details for each. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "breweries": {
      "url": "https://gateway.pipeworx.io/breweries/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Breweries data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
