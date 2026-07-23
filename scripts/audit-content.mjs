import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../src/testData.ts', import.meta.url), 'utf8');
const runnable = source
  .replace(/^const testData = /, 'globalThis.testData = ')
  .replace(/\nexport default testData;\s*$/, '');
const context = {};
vm.createContext(context);
vm.runInContext(runnable, context);
const data = context.testData;

const expected = {
  5: {
    translationCount: 11,
    wr2: [3, 5, 7, 11],
    wr3: ['2030', 'substitute', 'paper', 'nature', 'Council'],
    wr5: ['T', 'T', 'T', 'F'],
    ar2: ['substitute', 'spark', 'debate', 'transform', 'distribution', 'counterpart'],
  },
  6: {
    translationCount: 16,
    wr2: [2, 5, 6, 15],
    wr3: ["Union's", 'growth', 'nuclear', 'half', '5%'],
    wr5: ['F', 'T', 'T', 'F'],
    ar2: ['overtake', 'coal', 'electricity', 'eliminate', 'relegate', 'caution'],
  },
  7: {
    translationCount: 15,
    wr2: [2, 3, 13, 15],
    wr3: ['51st', 'pride', 'reject', 'trade', 'stark'],
    wr5: ['T', 'F', 'T', 'F'],
    ar2: ['border', 'pushback', 'neighbor', 'poll', 'beaver', 'merger'],
  },
  8: {
    translationCount: 16,
    wr2: [1, 3, 13, 16],
    wr3: ['engineer', '120', 'modern', 'presence', 'proof'],
    wr5: ['F', 'F', 'T', 'T'],
    ar2: ['adventure', 'regret', 'champagne', 'shower', 'journalist', 'expansion'],
  },
};

const failures = [];
const same = (actual, wanted) => JSON.stringify(actual) === JSON.stringify(wanted);
const sorted = (items) => [...items].sort((a, b) => a.localeCompare(b));

if (!same(Object.keys(data), ['5', '6', '7', '8'])) {
  failures.push(`UNIT keys: ${Object.keys(data).join(', ')}`);
}

for (const [unit, wanted] of Object.entries(expected)) {
  const entry = data[unit];
  const blanks = [...entry.wr3.text.matchAll(/\[([^\]]+)\]/g)].map((match) => match[1]);
  const checks = [
    ['While reading 2', entry.wr2.map((item) => item.a), wanted.wr2],
    ['While reading 3', blanks, wanted.wr3],
    ['While reading 5', entry.wr5.map((item) => item.a), wanted.wr5],
    ['After reading 2', entry.ar2.map((item) => item.word), wanted.ar2],
  ];
  for (const [label, actual, expectedValue] of checks) {
    if (!same(actual, expectedValue)) {
      failures.push(`UNIT ${unit} ${label}: ${JSON.stringify(actual)}`);
    }
  }
  if (entry.ar1.length !== 4) failures.push(`UNIT ${unit} After reading 1 count`);
  if (entry.ar2.length !== 6) failures.push(`UNIT ${unit} After reading 2 count`);
  if (entry.translation.length !== wanted.translationCount) {
    failures.push(`UNIT ${unit} translation count: ${entry.translation.length}`);
  }
  if (entry.original.length !== wanted.translationCount) {
    failures.push(`UNIT ${unit} original count: ${entry.original.length}`);
  }
  if (entry.original.length !== entry.translation.length) {
    failures.push(`UNIT ${unit} original/translation pair mismatch`);
  }
  if (entry.original.some((paragraph) => !paragraph.trim())) {
    failures.push(`UNIT ${unit} empty original paragraph`);
  }
  if (entry.translation.some((paragraph) => !paragraph.trim())) {
    failures.push(`UNIT ${unit} empty translation paragraph`);
  }
  for (const item of entry.wr2) {
    if (!item.options.includes(item.a)) failures.push(`UNIT ${unit} WR2 answer missing`);
  }
  for (const item of entry.wr5) {
    if (!item.jp || !item.reason) failures.push(`UNIT ${unit} WR5 explanation missing`);
  }
  for (const [index, item] of entry.ar1.entries()) {
    if (!same(sorted(item.words), sorted(item.correct))) {
      failures.push(`UNIT ${unit} AR1-${index + 1} word mismatch`);
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Content audit passed: 4 units, 58 English/Japanese paragraph pairs, 16 WR2, 20 cloze blanks, 16 T/F, 16 ordering, 24 vocabulary entries.');
