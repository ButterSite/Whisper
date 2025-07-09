
import { useState} from "react"
import { FriendList } from "./FriendsList";
import { SearchingUsers } from "./SearchingUsers";
import { NavigationContainer, NavigationList, NavIcon } from "../styles";

export const NavigationBar = ({ setRecipient, recipient }) => {
  const [currentSection, setCurrentSection] = useState('friends');

  const renderContent = () => {
    switch (currentSection) {
      case 'friends':
        return <FriendList recipient={recipient} setRecipient={setRecipient} />;
      case 'userSearching':
        return <SearchingUsers setRecipient={setRecipient} />;
      default:
        return null;
    }
  };

  const handleClick = (section) => {
    setCurrentSection(section);
  };

  return (
    <NavigationContainer>
      <NavigationList>
        <li>
          <NavIcon
            onClick={() => handleClick('friends')}
            $isSelected={currentSection === 'friends'}
            data-testid="friends-icon"
          >
            chat_bubble
          </NavIcon>
        </li>
        <li>
          <NavIcon
            onClick={() => handleClick('userSearching')}
            $isSelected={currentSection === 'userSearching'}
            data-testid="search-icon"
          >
            search
          </NavIcon>
        </li>
      </NavigationList>
      {renderContent()}
    </NavigationContainer>
  );
};