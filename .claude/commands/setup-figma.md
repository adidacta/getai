# Setup Figma MCP Server

You are helping the user set up the Figma desktop MCP server so that you can access Figma designs locally.

## Task

1. **Check if Figma desktop server is running:**
   - Run: `curl -s http://127.0.0.1:3845/mcp 2>&1 | head -1`
   - If you get a JSON response (even an error), the server is running
   - If you get "Connection refused", the server is not running

2. **If the server is NOT running:**
   - Tell the user to:
     - Open Figma desktop app
     - Open any Design file
     - Switch to Dev Mode (Shift+D)
     - In the inspect panel, find "MCP server" section
     - Click "Enable desktop MCP server"
     - Confirm it shows as running at `http://127.0.0.1:3845/mcp`
   - Then rerun this command

3. **If the server IS running:**
   - Check if it's already configured: `claude mcp list | grep figma-desktop`
   - If NOT configured, add it: `claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp`
   - If already configured, confirm: "Figma MCP server is already set up and ready to use!"

4. **Test the connection:**
   - List all MCP servers: `claude mcp list`
   - Confirm figma-desktop appears in the list

5. **Provide usage instructions:**
   - Tell the user they can now share Figma links like: `@https://www.figma.com/design/...?node-id=...`
   - Or select a frame in Figma and ask you to implement it
   - The server will extract design details automatically

## Important Notes

- The Figma desktop app must be running for the MCP server to work
- The server runs locally at http://127.0.0.1:3845/mcp
- Requires a Dev or Full seat on a paid Figma plan
- Works with any file in the desktop app

## Troubleshooting

If the setup fails:
- Ensure Figma desktop app is updated to latest version
- Confirm the user has a paid Figma plan with Dev Mode access
- Check that no firewall is blocking local port 3845
- Try disabling and re-enabling the MCP server in Figma
