import React, { ElementType } from 'react'
import { ExtraIcon } from './extra-icon'

export function OnboardingTitle({
  alt,
  fromColor,
  toColor,
  title,
  Icon
}: {
  alt: string
  fromColor: string
  toColor: string
  title: string
  Icon: ElementType
}) {
  return (
    <div className="flex flex-col text-center md:text-left md:flex-row gap-3 items-center">
      <ExtraIcon Icon={Icon} fromColor={fromColor} toColor={toColor} />
      <div>
        <h5 className="uppercase font-mono text-xs text-slate-500">{alt}</h5>

        <h2 className="font-mono text-3xl font-bold tracking-tight">{title}</h2>
      </div>
    </div>
  )
}
