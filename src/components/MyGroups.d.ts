import { FC } from 'react';

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  image: string;
  location: string;
  meetingFrequency: string;
  organizer: string;
  role: string;
}

interface MyGroupsProps {
  groups: Group[];
}

declare const MyGroups: FC<MyGroupsProps>;

export default MyGroups; 