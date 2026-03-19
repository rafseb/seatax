#!/usr/bin/env python3
"""PreToolUse hook: blocks Claude from reading/writing sensitive files."""
import json, sys, re

data = json.load(sys.stdin)
text = json.dumps(data.get("tool_input", {}))

PATTERN = re.compile(
    r'\.env[^\s"]*'                          # .env, .env.local, .env.production, etc.
    r'|\.(pem|key|p12|pfx)(?=["\'\\s},]|$)' # certificate/key extensions
    r'|credentials\.json'                    # GCP / AWS credential files
    r'|secrets\.json',                       # generic secrets file
    re.IGNORECASE,
)

if PATTERN.search(text):
    print("BLOCKED: Sensitive file access denied.")
    sys.exit(2)
