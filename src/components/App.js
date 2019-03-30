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
          {recipes.map((item,partsTitle,partsIngredients) => {
            if(!searchString.length){
              return(
                <RecipeItem 
                  title={item.title}
                  ingredients={item.ingredients}
                  href={item.href}
                  thumbnail={item.thumbnail}
                />
                );
            }else if(item.title.includes(searchString) || item.ingredients.includes(searchString)){

              partsTitle = item.title;
              partsTitle = partsTitle.replace(new RegExp(searchString,'g'), '!' + searchString + '!');
              partsTitle = partsTitle.split('!');

              for(var i=0; i < partsTitle.length; i+=1){
                if(partsTitle[i].includes(searchString)){
                  partsTitle[i] = <mark>{partsTitle[i]}</mark>
                }
              }

              partsIngredients = item.ingredients;
              partsIngredients = partsIngredients.replace(new RegExp(searchString,'g'), '!' + searchString + '!');
              partsIngredients = partsIngredients.split('!');

              for(i=0; i < partsIngredients.length; i+=1){
                if(partsIngredients[i].includes(searchString)){
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
