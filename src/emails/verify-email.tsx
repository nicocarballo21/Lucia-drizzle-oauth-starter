import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

import { env } from '@/env'
import { applicationName } from '@/app-config'

export const BASE_URL = env.HOST_NAME

export function VerifyEmail({ token }: { token: string }) {
  return (
    <Html>
      <Head />
      <Preview>Verify your Email</Preview>
      <Tailwind>
        <Body className='mx-auto my-auto bg-white font-sans'>
          <Container className='mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]'>
            <Section className='mt-[32px]'>
              <Img
                alt='StarterKit'
                className='mx-auto my-0'
                height='48'
                src={`${BASE_URL}/group.jpeg`}
                width='160'
              />
            </Section>

            <Section className='mb-[32px] mt-[32px] text-center'>
              <Text className='mb-8 text-[14px] font-medium leading-[24px] text-black'>
                Click the following link to verify your email
              </Text>

              <Text className='text-[14px] font-medium leading-[24px] text-black'>
                <Link
                  className='text-[#2754C5] underline'
                  href={`${BASE_URL}/api/login/verify-email?token=${token}`}
                  target='_blank'
                >
                  Verify Email
                </Link>
              </Text>
            </Section>

            <Hr className='mx-0 my-[26px] w-full border border-solid border-[#eaeaea]' />

            <Text className='flex items-center justify-center text-[12px] leading-[24px] text-[#666666]'>
              © 2024 {applicationName}. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
