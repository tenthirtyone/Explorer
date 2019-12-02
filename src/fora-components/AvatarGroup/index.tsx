/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { css } from "@styled-system/css";
import { Link } from "@theme-ui/components";
import AvatarImage, { AvatarImageProps } from 'fora-components/AvatarImage'
import emotionStyled from "lib/emotion-styled";

const AvatarGroupLink = emotionStyled(Link)(() => css({ 
  display: 'flex',
  alignItems: 'center',
  '> *:nth-child(2)': { 
    transform: 'translateX(-30%)'
   },
   '> *:nth-child(3)': { 
    transform: 'translateX(-60%)'
   },
   '> *:nth-child(4)': { 
    transform: 'translateX(-90%)'
   },
   '> *:nth-child(5)': { 
    transform: 'translateX(-120%)'
   },
   '> *:nth-child(6)': { 
    transform: 'translateX(-80%)'
   },
 }));

export type AvatarGroupProps = {
  href: string,
  avatars: AvatarImageProps[]
};
const AvatarGroup: React.FC<AvatarGroupProps> = props => {
  const {
    href,
    avatars,
  } = props;

  return (
    <AvatarGroupLink href={href}>
      {Array.isArray(avatars) && avatars.slice(0, 5).map(AvatarImage)}
      <Link sx={{ display: "inline-block" }} variant='text.link'>{`+ ${avatars.length - 5} more`}</Link>
    </AvatarGroupLink>
  );
};

export default AvatarGroup;
