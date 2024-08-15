import './styles.scss';
import AirplaneIcon from '../icons/airplane-icon';
import TagIcon from '../icons/tag-icon';
import GlobeIcon from '../icons/globe-icon';

const Header = () => {
  return (
    <header>
      <div className="logo-wrapper">
        <div className="logo">
          <AirplaneIcon size={16} color="white" />
        </div>
      </div>

      <div className="company-name">PLANE SCAPE</div>
      <div className="header-content">
        <ul>
          <li>
            <TagIcon size={16} color="#4a0096" />
            Deals
          </li>
          <li>
            <GlobeIcon size={16} color="#4a0096" />
            Discover
          </li>
        </ul>

        <div className="user">
          <div className="user-icon"></div>
          <div className="user-name">Joane Smith</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
