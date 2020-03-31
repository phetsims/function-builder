// Copyright 2016-2020, University of Colorado Boulder

/**
 * Math symbols used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbols from '../../../scenery-phet/js/MathSymbols.js';
import functionBuilderStrings from '../functionBuilderStrings.js';
import functionBuilder from '../functionBuilder.js';

const xString = functionBuilderStrings.x;
const yString = functionBuilderStrings.y;

const FBSymbols = {
  X: xString,
  Y: yString,
  DIVIDE: MathSymbols.DIVIDE,
  MINUS: MathSymbols.MINUS,
  PLUS: MathSymbols.PLUS,
  TIMES: MathSymbols.TIMES,
  EQUAL_TO: MathSymbols.EQUAL_TO
};

functionBuilder.register( 'FBSymbols', FBSymbols );

export default FBSymbols;