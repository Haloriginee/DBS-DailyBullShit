import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    showcaseType: string,
    location: string,
    day: number | undefined,
}

export interface ShowcaseCardProps {
  id?: BaseKey | undefined,
  title: string,
  location: string,
  day: string,
  photo: string,
}
