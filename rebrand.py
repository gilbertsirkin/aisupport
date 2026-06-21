#!/usr/bin/env python3
"""
Run this inside the CrypGo template root folder.
It replaces all CrypGo branding with Wertchain across every component file.
"""
import os, re

REPLACEMENTS = [
    # Brand name variations
    ('CrypGo',           'Wertchain'),
    ('Crypgo',           'Wertchain'),
    ('CRYPGO',           'WERTCHAIN'),
    ('crypgo',           'wertchain'),
    # Old taglines / descriptions — replace with Wertchain copy
    ('Crypto Investment Platform',         'Institutional Ledger Investment Platform'),
    ('crypto investment platform',         'institutional ledger investment platform'),
    ('Buy, sell and trade crypto',         'Invest with mathematical certainty'),
    ('buy, sell and trade crypto',         'invest with mathematical certainty'),
    ('cryptocurrency exchange',            'fixed-yield investment platform'),
    ('Cryptocurrency Exchange',            'Fixed-Yield Investment Platform'),
    # Title tags
    ('title: \'CrypGo\'',                 "title: 'Wertchain | Institutional Ledger Investment Platform'"),
    ('title: "CrypGo"',                   'title: "Wertchain | Institutional Ledger Investment Platform"'),
    ('Sign Up | Property',                'Create Account | Wertchain'),
    ('Sign In | Property',                'Sign In | Wertchain'),
]

EXTENSIONS = {'.tsx', '.ts', '.js', '.jsx', '.json', '.md'}
SKIP_DIRS  = {'node_modules', '.next', '.git', 'dist', '.cache'}

changed_files = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for fname in files:
        ext = os.path.splitext(fname)[1]
        if ext not in EXTENSIONS:
            continue
        path = os.path.join(root, fname)
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception:
            continue

        original = content
        for old, new in REPLACEMENTS:
            content = content.replace(old, new)

        if content != original:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            changed_files.append(path)
            print(f'UPDATED: {path}')

print(f'\n✅ Done. {len(changed_files)} files updated.')
if not changed_files:
    print('No files matched — check that you are running from the project root.')
