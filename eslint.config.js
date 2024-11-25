import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';


/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ languageOptions: { globals: globals.browser } },

	pluginJs.configs.recommended,
	...tseslint.configs.recommended,

	{
		plugins: { '@stylistic': stylistic },
		rules: {
			// This rule enforces at least one newline at the end of
			// non-empty files.
			'@stylistic/eol-last': ['error', 'always'],

			// This rule enforces a consistent indentation style.
			'@stylistic/indent': ['error', 'tab'],

			'@stylistic/max-len': ['error', { code: 120, comments: 80, ignoreUrls: true }],

			'@stylistic/padding-line-between-statements': ['error',
				{ blankLine: 'always', prev: '*', next: 'return' }
			],

			// This rule enforces the consistent use of single quotes.
			'@stylistic/quotes': ['error', 'single'],

			// This rule enforces consistent use of semicolons.
			'@stylistic/semi': ['error', 'always']
		}
	}
];
