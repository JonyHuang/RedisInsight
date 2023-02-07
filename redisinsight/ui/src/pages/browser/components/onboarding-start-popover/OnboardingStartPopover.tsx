import React from 'react'
import { EuiButton, EuiButtonEmpty, EuiPopover, EuiSpacer, EuiText, EuiTitle } from '@elastic/eui'
import { useDispatch, useSelector } from 'react-redux'
import { appFeatureOnboardingSelector, setOnboardNextStep, skipOnboarding } from 'uiSrc/slices/app/features'

import { sendEventTelemetry, TelemetryEvent } from 'uiSrc/telemetry'
import { connectedInstanceSelector } from 'uiSrc/slices/instances/instances'
import { OnboardingStepName } from 'uiSrc/constants/onboarding'
import styles from './styles.module.scss'

const OnboardingStartPopover = () => {
  const { id: connectedInstanceId = '' } = useSelector(connectedInstanceSelector)
  const { isActive, currentStep } = useSelector(appFeatureOnboardingSelector)
  const dispatch = useDispatch()

  const sendTelemetry = (action: string) => sendEventTelemetry({
    event: TelemetryEvent.ONBOARDING_TOUR_CLICKED,
    eventData: {
      databaseId: connectedInstanceId,
      step: OnboardingStepName.Start,
      action
    }
  })

  const handleSkip = () => {
    dispatch(skipOnboarding())
    sendTelemetry('closed')
  }

  const handleStart = () => {
    dispatch(setOnboardNextStep())
    sendTelemetry('next')
  }

  return (
    <EuiPopover
      button={<></>}
      isOpen={isActive && currentStep === 0}
      ownFocus={false}
      closePopover={() => {}}
      panelClassName={styles.onboardingStartPopover}
      anchorPosition="upCenter"
    >
      <EuiTitle size="xs">
        <h5>Take a quick tour of RedisInsight?</h5>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiText>
        Hi! RedisInsight has many tools that can help you to optimize the development process.
        <br />
        Would you like us to show them to you?
      </EuiText>
      <div className={styles.onboardingActions}>
        <EuiButtonEmpty
          onClick={handleSkip}
          className={styles.skipTourBtn}
          size="xs"
        >
          Skip tour
        </EuiButtonEmpty>
        <EuiButton
          onClick={handleStart}
          color="secondary"
          size="s"
          fill
        >
          Show me around
        </EuiButton>
      </div>
    </EuiPopover>
  )
}

export default OnboardingStartPopover
