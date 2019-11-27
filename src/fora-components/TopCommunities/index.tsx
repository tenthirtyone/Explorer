/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react';
import { Link, Text, Flex } from 'rebass';
import styled from 'lib/emotion-styled';
import css from '@styled-system/css';
import Divider from 'fora-components/Divider';
import AvatarImage from 'fora-components/AvatarImage';

const Container = styled(Flex)(() => css({ width: 270 }));
const Header = styled(Flex)(() => css({ '> :first-child': { mr: 'auto' } }));
const CommunitiesContainer = styled(Flex)(() =>
  css({ '> *:not(:last-child)': { mb: 3 } })
);
const CommunityContainer = styled(Flex)(() =>
  css({
    cursor: 'pointer',
    '> :first-of-type': { mr: 3 }
  })
);

interface ICommunityProps {
  src: string;
  name: string;
  id: string;
  memberCount: number;
  isOption: boolean;
}

export const Community: React.FC<ICommunityProps> = ({
  src,
  name,
  memberCount,
  id,
  isOption
}) => (
  <Link href={isOption ? undefined : `/community/${id}`}>
    <CommunityContainer alignItems="center">
      <AvatarImage resourceType={'community'} src={src} />
      <Flex flexDirection="column">
        <Text color="black" variant="body" sx={{ fontWeight: 'medium' }}>
          {`f • ${name}`}
        </Text>
        <Text variant="text.small" color="gray.400">
          {`${memberCount} members`}
        </Text>
      </Flex>
    </CommunityContainer>
  </Link>
);

interface IProps {
  communities: ICommunityProps[];
}
const TopCommunities: React.FC<IProps> = ({ communities }) => (
  <Container flexDirection="column">
    <Header>
      <Text variant="h3">Top communities</Text>
      <Link>See all</Link>
    </Header>
    <Divider mb={5} />
    <CommunitiesContainer flexDirection="column">
      {communities.map(Community)}
    </CommunitiesContainer>
  </Container>
);

export default TopCommunities;
