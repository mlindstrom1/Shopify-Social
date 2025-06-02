import { FC } from 'react'

interface MainContentProps {
  isNotificationsOpen?: boolean;
  onNotificationsOpen?: () => void;
}

declare const MainContent: FC<MainContentProps>

export default MainContent 