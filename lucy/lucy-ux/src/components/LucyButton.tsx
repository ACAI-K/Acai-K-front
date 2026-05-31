
import type { JSX } from "solid-js";
import { A } from "@solidjs/router";

type ButtonColors = "lucy-primary" | "lucy-secondary" | "lucy-support" | "lucy-accent" | "lucy-dark" | "lucy-light" | "lucy-error" | "lucy-warning" | "lucy-success" | "lucy-disabled";
type ButtonSizes = "sm" | "md" | "lg" | "full";
type ButtonIconSide = "left" | "right";

interface ButtonProps {
  ButtonForeground: ButtonColors;
  ButtonBackground: ButtonColors;
  ButtonSize: ButtonSizes;
  ButtonIcon?: JSX.Element;
  ButtonIconSide?: ButtonIconSide;
  ButtonText: string;
  ButtonLink: string;
  class?: string;
}

function getBackgroundColor(color: ButtonColors): string {
  const colorMap: Record<ButtonColors, string> = {
    "lucy-primary": "bg-lucy-primary hover:text-lucy-primary/90",
    "lucy-secondary": "bg-lucy-secondary hover:text-lucy-secondary/90",
    "lucy-support": "bg-lucy-support hover:text-lucy-support/90",
    "lucy-accent": "bg-lucy-accent hover:text-lucy-accent/90",
    "lucy-dark": "bg-lucy-dark hover:text-lucy-dark/90",
    "lucy-light": "bg-lucy-light hover:text-lucy-light/90",
    "lucy-error": "bg-lucy-error hover:text-lucy-error/90",
    "lucy-warning": "bg-lucy-warning hover:text-lucy-warning/90",
    "lucy-success": "bg-lucy-success hover:text-lucy-success/90",
    "lucy-disabled": "bg-lucy-disabled hover:text-lucy-disabled/90",
  };
  return colorMap[color];
}

function getForegroundColor(color: ButtonColors): string {
  const colorMap: Record<ButtonColors, string> = {
    "lucy-primary": "text-lucy-primary hover:bg-lucy-primary/90",
    "lucy-secondary": "text-lucy-secondary hover:bg-lucy-secondary/90",
    "lucy-support": "text-lucy-support hover:bg-lucy-support/90",
    "lucy-accent": "text-lucy-accent hover:bg-lucy-accent/90",
    "lucy-dark": "text-lucy-dark hover:bg-lucy-dark/90",
    "lucy-light": "text-lucy-light hover:bg-lucy-light/90",
    "lucy-error": "text-lucy-error hover:bg-lucy-error/90",
    "lucy-warning": "text-lucy-warning hover:bg-lucy-warning/90",
    "lucy-success": "text-lucy-success hover:bg-lucy-success/90",
    "lucy-disabled": "text-lucy-disabled hover:bg-lucy-disabled/90",
  };
  return colorMap[color];
}

function getSizeClass(size: ButtonSizes): string {
  const sizeMap: Record<ButtonSizes, string> = {
    "sm": "px-6 py-2 gap-1 text-sm rounded-br-2xl rounded-tl-2xl",
    "md": "px-8 py-3 gap-2 text-base rounded-br-4xl rounded-tl-4xl",
    "lg": "px-10 py-4 gap-4 text-lg rounded-br-full rounded-tl-full",
    "full": "w-full px-16 py-8 flex justify-center text-4xl rounded-br-full rounded-tl-full",
  };
  return sizeMap[size];
}



export function LucyButton (props: ButtonProps) {
  return (
    <A href={props.ButtonLink} class={`flex justify-center ${getBackgroundColor(props.ButtonBackground)} ${getForegroundColor(props.ButtonForeground)} ${getSizeClass(props.ButtonSize)} font-fira font-bold transition-colors shadow-xl shadow-lucy-dark/40 ${props.class}`}>
      {props.ButtonIcon && props.ButtonIconSide === "left" && <span class="w-4 h-full">{props.ButtonIcon}</span>}
      {props.ButtonText}
      {props.ButtonIcon && props.ButtonIconSide === "right" && <span class="w-4 h-full">{props.ButtonIcon}</span>}
    </A>
  );
}