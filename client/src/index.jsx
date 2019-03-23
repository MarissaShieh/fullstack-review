import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({ 
      url: '/repos',
      data: JSON.stringify({term: term}),
      method: 'POST',
      contentType: 'application/json;charset=utf-8',
      success: ()=>{this.sendGET()},
      error: (err)=>{console.log('Failed to post to server')}
    });
  }

  sendGET(){
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: (dbResults)=>this.setState({repos: dbResults}),
      error: (err)=> console.log('Failure to get top 25 from server')
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));