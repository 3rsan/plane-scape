import './styles.scss';
import Header from './../../components/header';
import SearchBar from './../../components/search-bar';
import FlightList from '../../components/flight-list';

function Home() {
  return (
    <div className="App">
      <div className="container">
        <Header></Header>
        <SearchBar></SearchBar>
        <FlightList></FlightList>
      </div>
    </div>
  );
}

export default Home;
