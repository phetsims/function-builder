// Copyright 2016-2024, University of Colorado Boulder

/**
 * The end piece of a builder, which provides some pseudo-3D perspective.
 * It consists of an ellipse with a parallelogram slot that a card passes through.
 * This is factored out to facilitate splitting the builder into foreground and background,
 * so that we can provide the illusion of a card passing through the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Matrix3 from '../../../../../dot/js/Matrix3.js';
import Shape from '../../../../../kite/js/Shape.js';
import optionize from '../../../../../phet-core/js/optionize.js';
import Node, { NodeOptions, NodeTranslationOptions } from '../../../../../scenery/js/nodes/Node.js';
import Path from '../../../../../scenery/js/nodes/Path.js';
import TPaint from '../../../../../scenery/js/util/TPaint.js';
import functionBuilder from '../../../functionBuilder.js';

type SelfOptions = {

  // ellipse
  radiusX?: number;
  radiusY?: number;
  fill?: TPaint;
  stroke?: TPaint;
  lineWidth?: number;

  // slot
  slotFill?: TPaint;
  slotStroke?: TPaint;
  slotLineWidth?: number;
};

type BuilderEndNodeOptions = SelfOptions & NodeTranslationOptions;

export default class BuilderEndNode extends Node {

  /**
   * @param orientation - which way the end faces
   * @param [providedOptions]
   */
  public constructor( orientation: 'left' | 'right', providedOptions?: BuilderEndNodeOptions ) {

    const options = optionize<BuilderEndNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      radiusX: 15,
      radiusY: 30,
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      slotFill: 'white',
      slotStroke: 'black',
      slotLineWidth: 2
    }, providedOptions );

    // ellipse
    const ellipseNode = new Path( Shape.ellipse( 0, 0, options.radiusX, options.radiusY, 0 ), {
      fill: options.fill,
      stroke: options.stroke,
      lineWidth: options.lineWidth
    } );

    // constants that determine the shape of the slot
    const SLOT_WIDTH = 0.4 * options.radiusX;
    const SLOT_HEIGHT = 1.5 * options.radiusY;
    const SLOT_Y_OFFSET = 0.025 * SLOT_HEIGHT; // determines perspective of slot

    // shape for a slot that faces left, parallelogram described from upper-left, moving clockwise
    let slotShape = new Shape()
      .moveTo( 0, SLOT_Y_OFFSET )
      .lineTo( SLOT_WIDTH, 0 )
      .lineTo( SLOT_WIDTH, SLOT_HEIGHT )
      .lineTo( 0, SLOT_HEIGHT - SLOT_Y_OFFSET )
      .close();

    // shape for a slot that faces right is a reflection
    if ( orientation === 'right' ) {
      slotShape = slotShape.transformed( Matrix3.scaling( -1, 1 ) );
    }

    // slot node
    const slotNode = new Path( slotShape, {
      fill: options.slotFill,
      stroke: options.slotStroke,
      lineWidth: options.slotLineWidth,
      center: ellipseNode.center
    } );

    options.children = [ ellipseNode, slotNode ];

    super( options );
  }
}

functionBuilder.register( 'BuilderEndNode', BuilderEndNode );