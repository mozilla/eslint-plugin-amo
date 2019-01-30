const assert = require('assert');

const plugin = require('../../lib');

describe('plugin', () => {
  it('exports all rules', () => {
    assert.ok(typeof plugin.rules === 'object');
  });

  it('exports a set of configurations', () => {
    assert.ok(typeof plugin.configs === 'object');
  });

  it('provides a "recommended" configuration', () => {
    assert.ok(typeof plugin.configs.recommended === 'object');
    assert.deepEqual(plugin.configs.recommended.plugins, ['amo']);
    assert.ok(typeof plugin.configs.recommended.rules === 'object');
  });

  it('provides a "typescript" configuration', () => {
    assert.ok(typeof plugin.configs.typescript === 'object');
    assert.deepEqual(plugin.configs.typescript.plugins, ['amo']);
    assert.ok(typeof plugin.configs.recommended.rules === 'object');
  });
});
