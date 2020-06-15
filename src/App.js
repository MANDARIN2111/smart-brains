import React,{ Component } from 'react';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Imagelinkform from './components/Imagelinkform/Imagelinkform';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';

const parameters = {
      "particles": {
          "number": {
              "value": 60
          },
          "size": {
              "value": 4
          }
        }
};

const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user :{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}

class App extends Component
{
  constructor(){
    super();
    this.state = initialState
    } 

  loadUser = (data) =>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      password:data.password,
      entries:data.entries,
      joined:data.joined
    }})
  }

  componentDidMount(){
    fetch('http://localhost:3001')
    .then(resp => resp.json())
    .then(console.log)
  }

  onInputChange =(event) =>{
    this.setState({input:event.target.value})
  }

  getBoxValue = (data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>
  {
    console.log(box);
    this.setState({box:box})
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input});
    fetch('https://whispering-falls-14635.herokuapp.com/imageurl',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          input:this.state.input
      })
    })
    .then(response => response.json())
    .then((response) => {
      if(response){
        fetch('https://whispering-falls-14635.herokuapp.com/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(response =>response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
      }
      this.displayFaceBox(this.getBoxValue(response))
    })
    .catch((err)=>console.log(err))
  }

  onRouteChange =(route) =>
  {
    if(route === 'signout'){
      this.setState(initialState)
    }
    else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }
  
  render() {
    return (
      <div className="App">
        <Particles className='particles'
              params={parameters} 
            />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange ={this.onRouteChange}/>
       { this.state.route === 'home' ?
         <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <Imagelinkform 
           onInputChange ={this.onInputChange}
           onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box = {this.state.box} imageUrl={this.state.imageUrl}/>
         </div>
         :(
            this.state.route ==='signin'
            ?<SignIn onRouteChange ={ this.onRouteChange } loadUser = {this.loadUser} />
              :<Register onRouteChange ={this.onRouteChange} loadUser = {this.loadUser}  />
           ) 
        }
      </div>
    );
  }
}

export default App;