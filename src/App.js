import { useEffect, useState, Fragment } from "react";
import axios from 'axios';

import './App.css';
import './index.css'
import Card from "./Card";

function App() {
  const CLIENT_ID = "7e3b596e2dc648e3bfbfe27b3638590b"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  // const getToken = () => {
  //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
  //     let token = urlParams.get('access_token');
  // }

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    // getToken()
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    // console.log("serch key", searchKey);


    try {
      if(e.target.value !== '')
      {
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: e.target.value,
          type: "artist"
        }
      })
      setSearchKey('')
      setArtists(data.artists.items)
      }
      
      

    } 
    catch (error) {
      let errormsg = error.response.data.error.message;
      setSearchKey(errormsg);
    }




    // if (status === 200) {
    //   setArtists(data.artists.items)
    // }
    // else {
    //   alert("Not valid artist")
    // }
  }


  // const helperSearch = (e) => {
  //   console.log("target value", e.target.value);
  //   setSearchKey(e.target.value);
  //   if (searchKey !== '') {
  //     searchArtists(e);
  //   }
  // }



  const renderArtists = () => {
    // console.log(artists)
    return artists.map((artist, index) => (

      <Fragment key={index}>
        <Card
          img_src={artist.images.length > 0 ? artist.images[0].url : "https://i.scdn.co/image/ab6761610000e5eb609177b911352232113b7fcc"}
          artist_name={artist.name}
        />
        {/* <p>{artist.name}</p> */}
      </Fragment>
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Artist Search</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
          : <button className="btn" onClick={logout}>Logout</button>}

        {token ?
          <form >
            <input type="text" placeholder="Enter Artist" className="form__field" onChange={(e) => { searchArtists(e) }} />
            <button type={"submit"} className="btn" >Search</button>
          </form>

          : <h2>Please login</h2>
        }

        {!searchKey ? <div className="Container">
          {renderArtists()}
        </div> 
        :
        <h2>{searchKey}</h2>
        }  

{/* 
        <div className="Container">
          {renderArtists()}
        </div> */}


      </header>
    </div>
  );
}
export default App;



// onChange={(e) => { helperSearch(e) }}