angular.module('flapperNews')
    .factory('posts', [
        '$http',
        function($http) {
            var o = {
                posts: []
            };

            o.getAll = function() {
                return $http.get('/posts.json').then(function(response) {
                    angular.copy(response.data, o.posts);
                }, function(error) {
                    console.log(error);
                });
            };

            o.create = function(post) {
                return $http.post('/posts.json', post).then(function(response) {
                    o.posts.push(response.data);
                }, function(error) {
                    console.log(error);
                });
            };

            o.upvote = function(post) {
                return $http.put('/posts/' + post.id + '/upvote.json')
                    .then(function(response) {
                        post.upvotes += 1;
                    }, function(error) {
                        console.log(error);
                    });
            };

            o.get = function(id) {
                return $http.get('/posts/' + id + '.json').then(function(res) {
                    return res.data;
                });
            };

            o.addComment = function(id, comment) {
                return $http.post('/posts/' + id + '/comments.json', comment);
            };

            o.upvoteComment = function(post, comment) {
                return $http.put('/posts/' + post.id + '/comments/' + comment.id + '/upvote.json')
                    .tren(function(response) {
                        comment.upvotes += 1;
                    });
            };

            return o;
        }
    ]);
