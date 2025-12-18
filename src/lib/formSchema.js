import { z } from 'zod'

const requiredString = z.string().min(1, 'This field is required')
const optionalString = z.string().optional()

// Section 1: The Business Challenge
export const section1Schema = z.object({
  biggestChallenge: z.array(z.string()).min(1, 'Please select at least one challenge'),
  biggestChallengeOther: z.string().optional(),
  previousAttempts: z.array(z.string()).min(1, 'Please select at least one option'),
  previousAttemptsOther: z.string().optional(),
  whyDidntWork: requiredString,
  whyDidntWorkOther: z.string().optional(),
  revenueLeaving: requiredString,
  urgencyLevel: z.number().min(1).max(10),
}).refine(data => {
  if (data.biggestChallenge.includes('other') && !data.biggestChallengeOther?.trim()) {
    return false
  }
  return true
}, {
  message: 'Please specify other challenge',
  path: ['biggestChallengeOther']
}).refine(data => {
  if (data.previousAttempts.includes('other') && !data.previousAttemptsOther?.trim()) {
    return false
  }
  return true
}, {
  message: 'Please specify other attempt',
  path: ['previousAttemptsOther']
}).refine(data => {
  if (data.whyDidntWork === 'other' && !data.whyDidntWorkOther?.trim()) {
    return false
  }
  return true
}, {
  message: 'Please specify reason',
  path: ['whyDidntWorkOther']
})

// Section 2: The Growth Goal
export const section2Schema = z.object({
  primaryGoal: z.array(z.string()).min(1, 'Please select at least one goal'),
  primaryGoalOther: z.string().optional(),
  financialResult: requiredString,
  otherTransformation: z.array(z.string()).min(1, 'Please select at least one transformation'),
  otherTransformationOther: z.string().optional(),
  mostImpressiveResult: requiredString,
  mostImpressiveResultOther: z.string().optional(),
}).refine(data => {
  if (data.primaryGoal.includes('other') && !data.primaryGoalOther?.trim()) {
    return false
  }
  return true
}, {
  message: 'Please specify other goal',
  path: ['primaryGoalOther']
})

// Section 3: What Made It Work
export const section3Schema = z.object({
  biggestImpact: z.array(z.string()).min(1, 'Please select at least one item'),
  biggestImpactOther: z.string().optional(),
  resultsTimeline: requiredString,
  braggingStatement: requiredString,
})

// Section 4: Why You Chose TLN
export const section4Schema = z.object({
  whatMadeDifferent: z.array(z.string()).min(1, 'Please select at least one item'),
  whatMadeDifferentOther: z.string().optional(),
  convincedReason: requiredString,
})

// Section 5: Your Business Profile
export const section5Schema = z.object({
  industry: requiredString,
  industryOther: z.string().optional(),
  yearsOperating: requiredString,
  teamSize: z.number().min(1, 'Please enter team size'),
}).refine(data => {
  if (data.industry.includes('other') && !data.industryOther?.trim()) {
    return false
  }
  return true
}, {
  message: 'Please specify industry',
  path: ['industryOther']
})

// Section 6: Your Growth Journey
export const section6Schema = z.object({
  investmentTrigger: z.array(z.string()).min(1, 'Please select at least one trigger'),
  investmentTriggerOther: z.string().optional(),
  roleInBusiness: requiredString,
  madeKeyHires: z.boolean(),
  keyHireRoles: z.array(z.string()).optional(),
  keyHireRolesOther: z.string().optional(),
}).refine(data => {
  if (data.madeKeyHires && (!data.keyHireRoles || data.keyHireRoles.length === 0)) {
    return false
  }
  return true
}, {
  message: 'Please select at least one role',
  path: ['keyHireRoles']
})

// Section 7: Current State
export const section7Schema = z.object({
  biggestFocus: requiredString,
  biggestFocusOther: z.string().optional(),
  withoutTLN: requiredString,
})

// Section 8: Network & Community
export const section8Schema = z.object({
  partOfGroups: z.boolean(),
  industryAssociations: z.string().optional(),
  linkedinGroups: z.string().optional(),
  masterminds: z.string().optional(),
  facebookGroups: z.string().optional(),
  businessInfluencers: z.string().optional(),
  industryInfluencers: z.string().optional(),
}).refine(data => {
  if (data.partOfGroups) {
    const hasAtLeastOne = 
      data.industryAssociations?.trim() ||
      data.linkedinGroups?.trim() ||
      data.masterminds?.trim() ||
      data.facebookGroups?.trim()
    return hasAtLeastOne
  }
  return true
}, {
  message: 'Please fill in at least one group type',
  path: ['industryAssociations']
})

export const allSectionsSchema = z.object({
  section1: section1Schema,
  section2: section2Schema,
  section3: section3Schema,
  section4: section4Schema,
  section5: section5Schema,
  section6: section6Schema,
  section7: section7Schema,
  section8: section8Schema,
})
