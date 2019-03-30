import React, { Component } from 'react';
import Navbar from './Navbar'
import RecipeItem from './RecipeItem'
import recipes from '../sample_data/recipes.json'

class App extends Component {
  constructor(props) {
    super(props);

    this.recipes = recipes.results;
    this.state = {
      searchString: '',
      recipes,
    };
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onChangeSearch(event){
    this.setState({searchString: event});
  }

  render() { 
    const recipes = this.state.recipes.results;
    let searchString = this.state.searchString;
    return (
      <div className="App">
        <Navbar onChange={this.onChangeSearch}/>
        <div className="container mt-10">
          <div className="row">
          {recipes.map((item,key) => {
            if(!searchString.length){
              return(
                <RecipeItem 
                  title={item.title}
                  ingredients={item.ingredients}
                  href={item.href}
                  thumbnail={item.thumbnail}
                />
                );
            }else if(item.title.match(new RegExp('(' + searchString + '+)', 'gi')) || item.ingredients.match(new RegExp('(' + searchString + '+)', 'gi'))){

              let partsTitle = item.title;
              let partsIngredients = item.ingredients;

              let reg = new RegExp('(' + searchString + '+)', 'gi');

              partsTitle = partsTitle.split(reg);
              partsIngredients = partsIngredients.split(reg);
              
              for(var i=0; i < partsTitle.length; i+=1){
                console.log(partsTitle);
                if(partsTitle[i].match(reg)){
                  partsTitle[i] = <mark>{partsTitle[i]}</mark>
                }
              }

              for(i=0; i < partsIngredients.length; i+=1){
                if(partsIngredients[i].match(reg)){
                  partsIngredients[i] = <mark>{partsIngredients[i]}</mark>
                }
              }

              return(
                <RecipeItem 
                  title={partsTitle}
                  ingredients={partsIngredients}
                  href={item.href}
                  thumbnail={item.thumbnail}
                />
              );
            }else if(!item.title.match(new RegExp('(' + searchString + '+)', 'gi')) && !item.ingredients.match(new RegExp('(' + searchString + '+)', 'gi')) && recipes.length === key + 1){
              return <h1>No Results to show</h1>;
            }else{
              return null;
            }
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
