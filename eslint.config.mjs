// Copyright 2024, University of Colorado Boulder

/**
 * ESLint configuration for function-builder.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import simEslintConfig from '../perennial-alias/js/eslint/sim.eslint.config.mjs';

export default [
  ...simEslintConfig,
  {
    languageOptions: {
      globals: {
        bigRat: 'readonly'
      }
    }
  },
  {
    files: [ '**/*.ts' ],
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-check': true,
          'ts-nocheck': true
        }
      ]
    }
  }
];