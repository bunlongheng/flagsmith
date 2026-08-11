import { ProjectFlag, Tag } from 'common/types/responses'

export const ONBOARDING_FLAG_NAME = 'show_demo_button'

export const ONBOARDING_TAG = {
  color: '#3cb371',
  description: 'Created during onboarding',
  label: 'Onboarding',
}

// Our own tag, not any tag a customer happens to label "Onboarding": the flag
// we find here is toured, toggled and renamed, so it must be one we created.
export const findOnboardingTag = (tags: Tag[]): Tag | undefined =>
  tags.find(
    (t) =>
      t.label === ONBOARDING_TAG.label &&
      t.description === ONBOARDING_TAG.description,
  )

// A previous run's flag. Tag first: renaming is a delete and recreate, so the
// name alone is not reliable.
export const findOnboardingFlag = (
  flags: ProjectFlag[],
  onboardingTag?: Tag,
): ProjectFlag | undefined =>
  (onboardingTag && flags.find((f) => f.tags?.includes(onboardingTag.id))) ||
  flags.find((f) => f.name === ONBOARDING_FLAG_NAME)

// Only seed into an empty project: features are project-level, so an unwanted
// flag shows up in every environment, production included.
export const shouldSeedOnboardingFlag = (flags: ProjectFlag[]): boolean =>
  !flags.length
