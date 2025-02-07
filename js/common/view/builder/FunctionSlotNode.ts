// Copyright 2016-2024, University of Colorado Boulder

/**
 * A 'slot' for a function in a builder.
 * It has the same shape as a function, but a dashed outline and no fill.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import { NodeTranslationOptions } from '../../../../../scenery/js/nodes/Node.js';
import functionBuilder from '../../../functionBuilder.js';
import FunctionBackgroundNode, { FunctionBackgroundNodeOptions } from '../functions/FunctionBackgroundNode.js';

type SelfOptions = EmptySelfOptions;

type FunctionSlotNodeOptions = SelfOptions & NodeTranslationOptions & FunctionBackgroundNodeOptions;

export default class FunctionSlotNode extends FunctionBackgroundNode {

  public constructor( providedOptions?: FunctionSlotNodeOptions ) {

    const options = optionize<FunctionSlotNodeOptions, SelfOptions, FunctionBackgroundNodeOptions>()( {

      // FunctionBackgroundNodeOptions
      fill: null,
      stroke: 'white',
      lineDash: [ 4, 4 ]
    }, providedOptions );

    super( options );
  }
}

functionBuilder.register( 'FunctionSlotNode', FunctionSlotNode );