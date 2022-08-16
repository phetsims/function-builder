// Copyright 2020-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import functionBuilder from './functionBuilder.js';

type StringsType = {
  'function-builder': {
    'title': string;
    'titleProperty': TReadOnlyProperty<string>;
  };
  'screen': {
    'patterns': string;
    'patternsProperty': TReadOnlyProperty<string>;
    'numbers': string;
    'numbersProperty': TReadOnlyProperty<string>;
    'equations': string;
    'equationsProperty': TReadOnlyProperty<string>;
    'mystery': string;
    'mysteryProperty': TReadOnlyProperty<string>;
  };
  'simplify': string;
  'simplifyProperty': TReadOnlyProperty<string>;
  'input': string;
  'inputProperty': TReadOnlyProperty<string>;
  'output': string;
  'outputProperty': TReadOnlyProperty<string>;
  'x': string;
  'xProperty': TReadOnlyProperty<string>;
  'y': string;
  'yProperty': TReadOnlyProperty<string>;
  'mysteryA': string;
  'mysteryAProperty': TReadOnlyProperty<string>;
  'mysteryB': string;
  'mysteryBProperty': TReadOnlyProperty<string>;
  'mysteryC': string;
  'mysteryCProperty': TReadOnlyProperty<string>;
  'mysteryCharacter': string;
  'mysteryCharacterProperty': TReadOnlyProperty<string>;
};

const functionBuilderStrings = getStringModule( 'FUNCTION_BUILDER' ) as StringsType;

functionBuilder.register( 'functionBuilderStrings', functionBuilderStrings );

export default functionBuilderStrings;
