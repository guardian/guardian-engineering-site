import * as React from 'react'
import Carousel from 'react-elastic-carousel'
import IndexLayout from '../layouts'
import Page from '../components/Page'
import { ContentCard, ContentLeft, ContentRight } from '../components/ContentBox'
import ContentSection from '../components/ContentSection'
import { Headline } from '../components/Headline'
import { BodyContainer } from '../components/HomePage/BodyContainer'
import { Image } from '../components/Image'
import { Standfirst } from '../components/Standfirst'
import { events } from '../components/DIEvents/events'
import { DISecondaryHeadline } from '../components/DiversityInclusion/SecondaryHeadline'
import { InnerContentBox, StyledContentBox, PersonIcon } from '../components/DiversityInclusion/ContentBox'
import { ContentHeadline } from '../components/ContentHeadline'
import { BodyText } from '../components/BodyText'
import { SecondaryHeadline } from '../components/SecondaryHeadline'
import { ContentBoxText, ContentBoxTitle, InnerContainer, StyledTextContainer } from '../components/DiversityInclusion/TextContainer'

const DiversityPage = () => (
  <IndexLayout>
    <Page>
      <BodyContainer>
        <ContentSection>
          <ContentLeft>
            <Headline>Diversity & Inclusion</Headline>
            <Standfirst>
              We value and respect all differences in all people (seen and unseen) at the Guardian. Here are some of the ways in which we
              help to promote a diverse and inclusive culture.
            </Standfirst>
          </ContentLeft>

          <ContentRight className="contentRight">
            <Image className="diImage" filename="images/home-about-gnm.jpg" />
          </ContentRight>
        </ContentSection>

        <ContentSection borderBottom={false}>
          <SecondaryHeadline>Recruitment</SecondaryHeadline>
          <StyledContentBox>
            <InnerContentBox>
              <PersonIcon />
              <ContentHeadline>Job advertisement and description screening</ContentHeadline>
              <BodyText>
                We use an augmented writing tool which uses a combination of natural language processing and data mining to screen our job
                postings for unconscious bias, reveal gendered language and help our job ads to appeal to a more diverse range of
                candidates.
              </BodyText>
            </InnerContentBox>
            <InnerContentBox>
              <PersonIcon />
              <ContentHeadline>Blind CV reviews</ContentHeadline>
              <BodyText>
                We redact candidate's names and educational institutions from CVs before they are reviewed by members of the Engineering
                team to avoid unconscious bias in the selection process.
              </BodyText>
            </InnerContentBox>
            <InnerContentBox>
              <PersonIcon />
              <ContentHeadline>CV screening</ContentHeadline>
              <BodyText>
                Three members of the Engineering team independently review redacted CVs before meeting to discuss their decisions together.
                We encourage rotation of these groups to promote a broad and diverse range of reviewers.
              </BodyText>
            </InnerContentBox>
          </StyledContentBox>
        </ContentSection>

        <ContentSection borderBottom>
          <ContentLeft>
            <DISecondaryHeadline>Benefits</DISecondaryHeadline>
          </ContentLeft>
          <StyledTextContainer>
            <InnerContainer>
              <ContentBoxTitle>Flexible working</ContentBoxTitle>
              <ContentBoxText>
                Flexible working can create a range of employment opportunities to suit both changing operational needs and the needs of
                individuals. It can also increase employment opportunities for anyone with caring responsibilities who are unable to work
                full time. We recognise the importance of flexible working as part of its wider commitment to diversity and equality in the
                workplace.
              </ContentBoxText>
            </InnerContainer>
            <InnerContainer>
              <ContentBoxTitle>Shared parental leave</ContentBoxTitle>
              <ContentBoxText>
                Shared parental leave is a period of leave of up to 50 weeks that can be shared between parents after their child is born up
                until the child’s first birthday. It provides parents with more choice around how they balance their caregiving
                responsibilities and can help to improve diversity and inclusion in the workplace.
              </ContentBoxText>
            </InnerContainer>
          </StyledTextContainer>
        </ContentSection>

        <ContentSection>
          <ContentLeft>
            <DISecondaryHeadline>Events</DISecondaryHeadline>
          </ContentLeft>
        </ContentSection>

        <Carousel>
          {events.map(event => (
            <div key={event.title}>
              <ContentSection>
                <ContentLeft>
                  <Image filename={event.imgSrc} />
                </ContentLeft>
                <ContentRight>
                  <ContentCard>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                  </ContentCard>
                </ContentRight>
              </ContentSection>
            </div>
          ))}
        </Carousel>
      </BodyContainer>
    </Page>
  </IndexLayout>
)

export default DiversityPage
