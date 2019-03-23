import React from 'react';

var RepoListEntry = function (props) {
  return (
    <div>
      <div>Owner: {props.repo.owner.login}</div>
      <a href={props.repo.html_url}>Repo: {props.repo.name}</a>
      <div>Description: {props.repo.description}</div>
      <div>Times forked: {props.repo.forks}</div>
      <div>--------</div>
    </div>
  )

}

export default RepoListEntry;