/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Box } from "@theme-ui/components";
import Divider from "fora-components/Divider";
import AvatarImage from "fora-components/AvatarImage";
import PreviewCard from "fora-components/Card/PreviewCard";
import MetaData from "./MetaData";

const ActivityItem = props => <Box {...props} sx={{ px: ["2", "0"] }} />;

const ContentContainer = props => <Flex {...props} sx={{ mb: "3" }} />;

const Description = props => (
  <Box
    {...props}
    sx={{
      color: "brandGray.400",
      "> *": {
        display: "inline",
        fontSize: "base",
        lineHeight: "standard"
      }
    }}
  />
);

const AuthorName = props => (
  <Text {...props} sx={{ fontWeight: "medium", color: "black" }}></Text>
);

export interface IBountyCreatedProps {
  activityType: "bountyCreated";
  avatarSrc: string | undefined;
  authorName: string | undefined;
  authorAddress: string;
  bountyTitle: string;
  bountyStatus: string;
  timestamp: string;
  bountyExpirationTimestamp: string;
  communityName: string;
  communityId: string;
  submissionCount: number;
}
const BountyCreated: React.FC<IBountyCreatedProps> = ({
  avatarSrc,
  authorName,
  bountyTitle,
  bountyStatus,
  bountyExpirationTimestamp,
  timestamp,
  communityName,
  communityId,
  authorAddress,
  submissionCount
}) => (
  <ActivityItem>
    <ContentContainer>
      <AvatarImage
        address={authorAddress}
        src={avatarSrc}
        resourceType="user"
      />
      <Flex sx={{ flexDirection: "column", ml: "3" }}>
        <Description mb="4">
          <AuthorName>{authorName || "--"}</AuthorName>
          <Text>{` created a bounty`}</Text>
        </Description>
        <PreviewCard
          status={bountyStatus}
          title={bountyTitle}
          expirationTimestamp={bountyExpirationTimestamp}
          submissionCount={submissionCount}
          ethInUSD={435}
          ethAmount={0.56}
          href={"https://www.google.co.uk"}
        />
        <MetaData
          timestamp={timestamp}
          communityName={communityName}
          communityId={communityId}
        />
      </Flex>
    </ContentContainer>
    <Divider />
  </ActivityItem>
);

export default BountyCreated;
