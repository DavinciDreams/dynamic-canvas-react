/**
 * RFC 6901 JSON Pointer resolution
 * https://www.rfc-editor.org/rfc/rfc6901
 */

/** Unescape a JSON Pointer token (~1 → /, ~0 → ~) */
function unescapeToken(token: string): string {
  return token.replace(/~1/g, '/').replace(/~0/g, '~');
}

/** Escape a string for use as a JSON Pointer token */
export function escapeToken(token: string): string {
  return token.replace(/~/g, '~0').replace(/\//g, '~1');
}

/** Parse a JSON Pointer string into an array of unescaped tokens */
export function parsePointer(pointer: string): string[] {
  if (pointer === '' || pointer === '/') return pointer === '/' ? [''] : [];
  if (!pointer.startsWith('/')) {
    throw new Error(`Invalid JSON Pointer: "${pointer}" (must start with /)`);
  }
  return pointer.slice(1).split('/').map(unescapeToken);
}

/** Resolve a JSON Pointer against a data object. Returns undefined if path doesn't exist. */
export function resolvePointer(data: unknown, pointer: string): unknown {
  if (pointer === '') return data;

  const tokens = parsePointer(pointer);
  let current: unknown = data;

  for (const token of tokens) {
    if (current === null || current === undefined) return undefined;

    if (Array.isArray(current)) {
      const index = token === '-' ? current.length : parseInt(token, 10);
      if (isNaN(index) || index < 0 || index >= current.length) return undefined;
      current = current[index];
    } else if (typeof current === 'object') {
      current = (current as Record<string, unknown>)[token];
    } else {
      return undefined;
    }
  }

  return current;
}

/** Set a value at a JSON Pointer path, creating intermediate objects as needed. Returns a new root object (immutable). */
export function setPointer(data: unknown, pointer: string, value: unknown): unknown {
  if (pointer === '') return value;

  const tokens = parsePointer(pointer);
  const root = structuredClone(data ?? {});
  let current: Record<string, unknown> = root as Record<string, unknown>;

  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i];
    const next = current[token];
    if (next === null || next === undefined || typeof next !== 'object') {
      // Create intermediate: if next token is numeric, create array; otherwise object
      const nextToken = tokens[i + 1];
      const isIndex = /^\d+$/.test(nextToken) || nextToken === '-';
      current[token] = isIndex ? [] : {};
    }
    current = current[token] as Record<string, unknown>;
  }

  const lastToken = tokens[tokens.length - 1];
  if (Array.isArray(current) && lastToken === '-') {
    current.push(value);
  } else {
    current[lastToken] = value;
  }

  return root;
}

/** Append items to an array at a JSON Pointer path. Returns a new root object (immutable). */
export function appendAtPointer(data: unknown, pointer: string, items: unknown[]): unknown {
  const existing = resolvePointer(data, pointer);
  const arr = Array.isArray(existing) ? [...existing, ...items] : items;
  return setPointer(data, pointer, arr);
}
