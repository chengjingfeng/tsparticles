import type { IColor } from "tsparticles/dist/Core/Interfaces/IColor";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IBackgroundMask } from "tsparticles/dist/Options/Interfaces/BackgroundMask/IBackgroundMask";
import type { IBackgroundMaskCover } from "tsparticles/dist/Options/Interfaces/BackgroundMask/IBackgroundMaskCover";
import { EditorNumberInput, EditorGroup, IRgb, IHsl, ColorUtils } from "object-gui";
import { EditorBase } from "../../../EditorBase";

export class BackgroundMaskOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IBackgroundMask;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("backgroundMask", "Background Mask");
        this.options = this.group.data as IBackgroundMask;

        this.addCover();
        this.addProperties();
    }

    private addCover(): void {
        const particles = this.particles;
        const options = this.options.cover as IBackgroundMaskCover;
        const coverColor = options.color as IColor;
        const coverGroup = this.group.addGroup("cover", "Cover");

        let colorStringValue: string | undefined;

        if (typeof coverColor.value === "string") {
            colorStringValue = coverColor.value;
        } else {
            let rgb = coverColor.value as IRgb;
            const hsl = coverColor.value as IHsl;

            if (hsl.h !== undefined) {
                rgb = ColorUtils.hslToRgb(hsl);
            }

            colorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
        }

        coverGroup.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    coverColor.value = value;

                    await particles.refresh();
                }
            },
            false
        );

        const opacityInput = coverGroup.addProperty(
            "opacity",
            "Opacity",
            options.opacity,
            typeof options.opacity,
            async () => {
                await particles.refresh();
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        this.group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });
    }
}