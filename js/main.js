$(document).ready(function(){

$('#searchUser').on('keyup',function(e){

var username=e.target.value;

//make request to github
$.ajax({

  url:'https://api.github.com/users/'+username,

  data:{
    client_id:'47440101d8e61da5f465',

    client_secret:'5a7612a81f2f29c2b89110a0c0c637b413414485'
  }

  }).done(function(user){
    $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',

        data:{
          client_id:'47440101d8e61da5f465',
          client_secret:'5a7612a81f2f29c2b89110a0c0c637b413414485',
          sort: 'created: asc',
          per_page:5
          }


    }).done(function(repos){

      $.each(repos,function(index,repo){
          $('#repos').append(`
                  <div class="well">
                    <div class="row">
                      <div class="col-md-7">
                        <strong>${repo.name}</strong>: ${repo.description}

                      </div>
                      <div class="col-md-3">
                          <span class="label label-default">Forks: ${repo.forks_count}</span>
                          <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                          <span class="label label-success">Stars: ${repo.stargazers_count}</span>

                      </div>
                      <div class="col-md-2">
                        <a href="${repo.html_url}" class="btn btn-info" target="_blank">Visit Repo page</a>

                      </div>
                    </div>
                  </div>

                  `);
        });
    });

  $('#profile').html(`
      <div class="panel panel-default">

          <div class="panel-heading">

              <h3 class="panel-title"><strong>${user.name}</strong></h3>

          </div>
          <div class="panel-body">

            <div class="row">

              <div class="col-md-3">

                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a  target="_blank" class="btn btn-primary" href="${user.html_url}">View Profile</a>

              </div>
              <div class="col-md-9">

                      <span class="label label-default">Public Repos: ${user.public_repos}</span>
                      <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                      <span class="label label-success">Followers: ${user.followers}</span>
                      <span class="label label-info">Following: ${user.following}</span>

              <br><br>

              <u1 class="list-group">
                <li class="list-group-item"><strong>Company:</strong> ${user.company}</li>
                <li class="list-group-item"><strong>Website/Blog</strong>: <a href="${user.blog}"  target="_blank">${user.blog}</a></li>
                <li class="list-group-item"><strong>Location:</strong> ${user.location}</li>
                <li class="list-group-item"><strong>Member Since:</strong> ${user.created_at}</li>
              </u1>
            </div>
          </div>
        </div>

        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>

  `);

  });



});

});
