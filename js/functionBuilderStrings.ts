// Copyright 2020-2021, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import functionBuilder from './functionBuilder.js';

type StringsType = {
  'function-builder': {
    'title': string
  },
  'screen': {
    'patterns': string,
    'numbers': string,
    'equations': string,
    'mystery': string
  },
  'simplify': string,
  'input': string,
  'output': string,
  'x': string,
  'y': string,
  'mysteryA': string,
  'mysteryB': string,
  'mysteryC': string,
  'mysteryCharacter': string
};

const functionBuilderStrings = getStringModule( 'FUNCTION_BUILDER' ) as StringsType;

functionBuilder.register( 'functionBuilderStrings', functionBuilderStrings );

export default functionBuilderStrings;
