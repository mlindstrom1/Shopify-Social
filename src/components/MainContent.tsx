import { Box } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotificationsPanel from './NotificationsPanel'
import CreateEventForm from './CreateEventForm'
import EventDetails from './EventDetails'
import ExploreGroups from './ExploreGroups'
import GroupDetails from './GroupDetails'
import CreateGroup from './CreateGroup'
import ActivityFeed from './ActivityFeed'
import ExploreEvents from './ExploreEvents'
import { upcomingEvents, myEvents } from './events'
import MyEvents from './MyEvents'
import SectionContent from './SectionContent'
import MyGroups from './MyGroups'
import ProfileSettings from './ProfileSettings'
import NotificationSettings from './NotificationSettings'
import PrivacySettings from './PrivacySettings'
import HelpButton from './HelpButton'

interface MainContentProps {
  isNotificationsOpen: boolean;
  onNotificationsOpen: () => void;
}

const locations = ["All Locations", "Toronto, ON", "Virtual Event"]
const dates = ["All Dates", "Today", "This Week", "This Month"]

const MainContent = ({ isNotificationsOpen, onNotificationsOpen }: MainContentProps) => {
  return (
    <Box position="relative" height="100%" overflow="auto">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<SectionContent path="/home" />} />
        <Route path="/events">
          <Route path="explore-events" element={<SectionContent path="/events"><ExploreEvents events={upcomingEvents} /></SectionContent>} />
          <Route path="my-events" element={<SectionContent path="/events"><MyEvents events={myEvents} locations={locations} dates={dates} /></SectionContent>} />
          <Route path="create-event" element={<SectionContent path="/events"><CreateEventForm /></SectionContent>} />
          <Route path=":id" element={<EventDetails />} />
        </Route>
        <Route path="/groups">
          <Route path="explore-groups" element={<SectionContent path="/groups"><ExploreGroups /></SectionContent>} />
          <Route path="my-groups" element={<SectionContent path="/groups"><MyGroups groups={[]} /></SectionContent>} />
          <Route path="create-group" element={<SectionContent path="/groups"><CreateGroup /></SectionContent>} />
          <Route path=":id" element={<GroupDetails />} />
        </Route>
        <Route path="/activity-feed">
          <Route index element={<Navigate to="/activity-feed/all" replace />} />
          <Route path="all" element={<SectionContent path="/activity-feed"><ActivityFeed filter="all" /></SectionContent>} />
          <Route path="groups" element={<SectionContent path="/activity-feed"><ActivityFeed filter="groups" /></SectionContent>} />
          <Route path="events" element={<SectionContent path="/activity-feed"><ActivityFeed filter="events" /></SectionContent>} />
        </Route>
        <Route path="/settings">
          <Route path="general" element={<SectionContent path="/settings"><ProfileSettings /></SectionContent>} />
          <Route path="security-privacy" element={<SectionContent path="/settings"><PrivacySettings /></SectionContent>} />
          <Route path="notifications" element={<SectionContent path="/settings"><NotificationSettings /></SectionContent>} />
        </Route>
      </Routes>

      <NotificationsPanel isOpen={isNotificationsOpen} onClose={onNotificationsOpen} />
      <HelpButton />
    </Box>
  )
}

export default MainContent