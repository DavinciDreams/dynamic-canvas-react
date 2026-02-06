/**
 * Runtime JSON validation for A2UI messages
 */

import type { A2UIMessage } from './a2ui-envelope';
import type { A2UIComponent } from './component-types';
import { A2UI_COMPONENT_TYPES } from './component-types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function err(msg: string): ValidationResult {
  return { valid: false, errors: [msg] };
}

const OK: ValidationResult = { valid: true, errors: [] };

/** Validate an A2UI envelope message */
export function validateMessage(msg: unknown): ValidationResult {
  if (msg === null || typeof msg !== 'object') {
    return err('Message must be a non-null object');
  }

  const obj = msg as Record<string, unknown>;
  const keys = Object.keys(obj);

  if (keys.length === 0) {
    return err('Message must have exactly one key');
  }

  const type = keys[0];
  const payload = obj[type];

  if (payload === null || typeof payload !== 'object') {
    return err(`Message payload for "${type}" must be an object`);
  }

  const p = payload as Record<string, unknown>;

  switch (type) {
    case 'createSurface':
      if (typeof p.surfaceId !== 'string') return err('createSurface.surfaceId must be a string');
      return OK;

    case 'destroySurface':
      if (typeof p.surfaceId !== 'string') return err('destroySurface.surfaceId must be a string');
      return OK;

    case 'updateDataModel':
      if (typeof p.surfaceId !== 'string') return err('updateDataModel.surfaceId must be a string');
      if (typeof p.path !== 'string') return err('updateDataModel.path must be a string');
      if (!p.path.startsWith('/') && p.path !== '') return err('updateDataModel.path must be a JSON Pointer (start with /)');
      return OK;

    case 'updateComponents':
      if (typeof p.surfaceId !== 'string') return err('updateComponents.surfaceId must be a string');
      if (!Array.isArray(p.components)) return err('updateComponents.components must be an array');
      return validateComponents(p.components as unknown[]);

    case 'removeComponents':
      if (typeof p.surfaceId !== 'string') return err('removeComponents.surfaceId must be a string');
      if (!Array.isArray(p.componentIds)) return err('removeComponents.componentIds must be an array');
      return OK;

    case 'appendData':
      if (typeof p.surfaceId !== 'string') return err('appendData.surfaceId must be a string');
      if (typeof p.path !== 'string') return err('appendData.path must be a string');
      if (!Array.isArray(p.items)) return err('appendData.items must be an array');
      return OK;

    case 'patchDataModel':
      if (typeof p.surfaceId !== 'string') return err('patchDataModel.surfaceId must be a string');
      if (typeof p.patch !== 'object' || p.patch === null) return err('patchDataModel.patch must be an object');
      return OK;

    default:
      return err(`Unknown message type: ${type}`);
  }
}

/** Validate a components array */
function validateComponents(components: unknown[]): ValidationResult {
  const errors: string[] = [];

  for (let i = 0; i < components.length; i++) {
    const c = components[i];
    if (c === null || typeof c !== 'object') {
      errors.push(`components[${i}]: must be an object`);
      continue;
    }
    const comp = c as Record<string, unknown>;
    if (typeof comp.id !== 'string') {
      errors.push(`components[${i}]: id must be a string`);
    }
    if (typeof comp.component !== 'string') {
      errors.push(`components[${i}]: component must be a string`);
    } else if (!(A2UI_COMPONENT_TYPES as readonly string[]).includes(comp.component)) {
      errors.push(`components[${i}]: unknown component type "${comp.component}"`);
    }
  }

  return errors.length > 0 ? { valid: false, errors } : OK;
}

/** Validate a single component */
export function validateComponent(comp: unknown): ValidationResult {
  if (comp === null || typeof comp !== 'object') {
    return err('Component must be a non-null object');
  }
  return validateComponents([comp]);
}

/** Type guard for A2UIMessage */
export function isA2UIMessage(msg: unknown): msg is A2UIMessage {
  return validateMessage(msg).valid;
}

/** Type guard for A2UIComponent */
export function isA2UIComponent(comp: unknown): comp is A2UIComponent {
  return validateComponent(comp).valid;
}
