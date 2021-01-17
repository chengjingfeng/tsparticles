import { SquareDrawer } from "tsparticles-core/ShapeDrawers/SquareDrawer";
import { TextDrawer } from "tsparticles-core/ShapeDrawers/TextDrawer";
import { Bouncer } from "tsparticles-core/Interactions/External/Bouncer";
import { Bubbler } from "tsparticles-core/Interactions/External/Bubbler";
import { Connector } from "tsparticles-core/Interactions/External/Connector";
import { Grabber } from "tsparticles-core/Interactions/External/Grabber";
import { Collider } from "tsparticles-core/Interactions/Particles/Collider";
import { Infecter } from "tsparticles-core/Interactions/Particles/Infecter";
import { Linker } from "tsparticles-core/Interactions/Particles/Linker";
import { LifeUpdater } from "tsparticles-core/Updaters/LifeUpdater";
import { OpacityUpdater } from "tsparticles-core/Updaters/OpacityUpdater";
import { SizeUpdater } from "tsparticles-core/Updaters/SizeUpdater";
import { AngleUpdater } from "tsparticles-core/Updaters/AngleUpdater";
import { ColorUpdater } from "tsparticles-core/Updaters/ColorUpdater";
import { StrokeColorUpdater } from "tsparticles-core/Updaters/StrokeColorUpdater";
import { OutOfCanvasUpdater } from "tsparticles-core/Updaters/OutOfCanvasUpdater";
import { Main, ShapeType } from "tsparticles-core";
import { loadInteraction as loadExternalAttractInteraction } from "tsparticles-interaction-external-attract";
import { loadInteraction as loadExternalRepulseInteraction } from "tsparticles-interaction-external-repulse";
import { loadInteraction as loadParticlesAttractInteraction } from "tsparticles-interaction-particles-attract";
import { loadInteraction as loadParticlesRepulseInteraction } from "tsparticles-interaction-particles-repulse";
import { loadShape as loadCircleShape } from "tsparticles-shape-circle";
import { loadShape as loadImageShape } from "tsparticles-shape-image";
import { loadShape as loadLineShape } from "tsparticles-shape-line";
import { loadShape as loadPolygonShape } from "tsparticles-shape-polygon";
import { loadShape as loadStarShape } from "tsparticles-shape-star";

export function loadSlim(tsParticles: Main): void {
    const squareDrawer = new SquareDrawer();
    const textDrawer = new TextDrawer();

    tsParticles.addParticleUpdater((container) => new LifeUpdater(container));
    tsParticles.addParticleUpdater((container) => new OpacityUpdater(container));
    tsParticles.addParticleUpdater((container) => new SizeUpdater(container));
    tsParticles.addParticleUpdater((container) => new AngleUpdater(container));
    tsParticles.addParticleUpdater((container) => new ColorUpdater(container));
    tsParticles.addParticleUpdater((container) => new StrokeColorUpdater(container));
    tsParticles.addParticleUpdater((container) => new OutOfCanvasUpdater(container));
    loadExternalAttractInteraction(tsParticles);
    tsParticles.addInteractor((container) => new Bouncer(container));
    tsParticles.addInteractor((container) => new Bubbler(container));
    tsParticles.addInteractor((container) => new Connector(container));
    tsParticles.addInteractor((container) => new Grabber(container));
    loadExternalRepulseInteraction(tsParticles);
    loadParticlesAttractInteraction(tsParticles);
    tsParticles.addInteractor((container) => new Collider(container));
    tsParticles.addInteractor((container) => new Infecter(container));
    loadParticlesRepulseInteraction(tsParticles);
    tsParticles.addInteractor((container) => new Linker(container));

    loadCircleShape(tsParticles);
    loadLineShape(tsParticles);
    tsParticles.addShape(ShapeType.edge, squareDrawer);
    tsParticles.addShape(ShapeType.square, squareDrawer);
    loadStarShape(tsParticles);
    loadPolygonShape(tsParticles);
    tsParticles.addShape(ShapeType.char, textDrawer);
    tsParticles.addShape(ShapeType.character, textDrawer);
    loadImageShape(tsParticles);
}
