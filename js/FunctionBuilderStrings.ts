// Copyright 2020-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import LinkableProperty from '../../axon/js/LinkableProperty.js';
import functionBuilder from './functionBuilder.js';

type StringsType = {
  'function-builder': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
  };
  'screen': {
    'patterns': string;
    'patternsStringProperty': LinkableProperty<string>;
    'numbers': string;
    'numbersStringProperty': LinkableProperty<string>;
    'equations': string;
    'equationsStringProperty': LinkableProperty<string>;
    'mystery': string;
    'mysteryStringProperty': LinkableProperty<string>;
  };
  'simplify': string;
  'simplifyStringProperty': LinkableProperty<string>;
  'input': string;
  'inputStringProperty': LinkableProperty<string>;
  'output': string;
  'outputStringProperty': LinkableProperty<string>;
  'x': string;
  'xStringProperty': LinkableProperty<string>;
  'y': string;
  'yStringProperty': LinkableProperty<string>;
  'mysteryA': string;
  'mysteryAStringProperty': LinkableProperty<string>;
  'mysteryB': string;
  'mysteryBStringProperty': LinkableProperty<string>;
  'mysteryC': string;
  'mysteryCStringProperty': LinkableProperty<string>;
  'mysteryCharacter': string;
  'mysteryCharacterStringProperty': LinkableProperty<string>;
};

const FunctionBuilderStrings = getStringModule( 'FUNCTION_BUILDER' ) as StringsType;

functionBuilder.register( 'FunctionBuilderStrings', FunctionBuilderStrings );

export default FunctionBuilderStrings;
