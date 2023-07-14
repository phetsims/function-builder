// Copyright 2016-2023, University of Colorado Boulder

/**
 * Math symbols used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbols from '../../../scenery-phet/js/MathSymbols.js';
import functionBuilder from '../functionBuilder.js';
import FunctionBuilderStrings from '../FunctionBuilderStrings.js';

const FBSymbols = {
  X: FunctionBuilderStrings.x,
  Y: FunctionBuilderStrings.y,
  DIVIDE: MathSymbols.DIVIDE,
  MINUS: MathSymbols.MINUS,
  PLUS: MathSymbols.PLUS,
  TIMES: MathSymbols.TIMES,
  EQUAL_TO: MathSymbols.EQUAL_TO
};

functionBuilder.register( 'FBSymbols', FBSymbols );

export default FBSymbols;